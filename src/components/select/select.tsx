import * as RadixSelect from '@radix-ui/react-select';
import classNames from 'classnames';
import { DropdownIcon } from '../icons';

import styles from './select.module.scss';

export interface SelectProps<V extends string> {
    value: V;
    onValueChange: (value: V) => void;
    placeholder?: string;
    children: React.ReactNode;
    className?: string;
    dropdownClassName?: string;
    /**
     * Allows to customize the selected value.
     * By default the selected item's text will be rendered.
     */
    renderValue?: (value: V) => React.ReactNode;
    hasError?: boolean;
}

export const Select = <V extends string>({
    value,
    onValueChange,
    placeholder,
    children,
    className,
    dropdownClassName,
    renderValue,
    hasError,
}: SelectProps<V>) => (
    <RadixSelect.Root value={value} onValueChange={onValueChange} data-oid="hpog8wq">
        <RadixSelect.Trigger
            className={classNames(styles.trigger, { [styles.hasError]: hasError }, className)}
            data-oid="j5b7yeb"
        >
            <RadixSelect.Value placeholder={placeholder} data-oid="ymd:1us">
                {renderValue?.(value)}
            </RadixSelect.Value>
            <RadixSelect.Icon className={styles.triggerIcon} data-oid="kr7n8-7">
                <DropdownIcon width={12} data-oid="zyb884o" />
            </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal data-oid="c_::io0">
            <RadixSelect.Content
                className={classNames(styles.content, dropdownClassName)}
                position="popper"
                data-oid="komqga4"
            >
                <RadixSelect.Viewport data-oid="jlpdd81">{children}</RadixSelect.Viewport>
            </RadixSelect.Content>
        </RadixSelect.Portal>
    </RadixSelect.Root>
);

export interface SelectItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export const SelectItem = ({ value, children, className }: SelectItemProps) => {
    return (
        <RadixSelect.Item
            className={classNames(styles.item, className)}
            value={value}
            data-oid="_z:9b8l"
        >
            <RadixSelect.ItemText data-oid="cvo-0pu">{children}</RadixSelect.ItemText>
        </RadixSelect.Item>
    );
};
