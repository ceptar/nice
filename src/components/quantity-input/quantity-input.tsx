import { useState } from 'react';
import classNames from 'classnames';
import { MinusIcon, PlusIcon } from '../icons';
import styles from './quantity-input.module.scss';

type QuantityInputProps = {
    value: number;
    onChange: (value: number) => void;
    id?: string;
    className?: string;
    disabled?: boolean;
};

export const QuantityInput = ({
    value,
    onChange,
    id,
    className,
    disabled = false,
}: QuantityInputProps) => {
    const [internalValue, setInternalValue] = useState<string | undefined>();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const strValue = event.target.value.replace(/\D/g, '');
        const numValue = Number(strValue);
        setInternalValue(strValue);
        if (numValue) onChange(numValue);
    };

    const handleBlur = () => setInternalValue(undefined);
    const increment = () => onChange(Math.max(1, Math.floor(value + 1)));
    const decrement = () => onChange(Math.max(1, Math.ceil(value - 1)));

    return (
        <div
            className={classNames(styles.root, { [styles.disabled]: disabled }, className)}
            data-oid="ret5a9u"
        >
            <button
                className={classNames(styles.button, 'iconButton')}
                onClick={decrement}
                disabled={value <= 1 || disabled}
                data-oid="2k-:6gj"
            >
                <MinusIcon className={styles.icon} data-oid="df_542k" />
            </button>
            <input
                id={id}
                type="text"
                inputMode="numeric"
                className={classNames(styles.input, 'transparentInput', className)}
                value={internalValue ?? value}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                data-oid=":e72z5k"
            />

            <button
                className={classNames(styles.button, 'iconButton')}
                onClick={increment}
                disabled={disabled}
                data-oid="ehowpo4"
            >
                <PlusIcon className={styles.icon} data-oid="2-czpej" />
            </button>
        </div>
    );
};
