import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import styles from './dropdown-menu.module.scss';

export interface DropdownMenuProps extends React.PropsWithChildren {
    trigger: React.ReactElement;
    contentProps?: RadixDropdownMenu.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>;
}

export const DropdownMenu = ({ trigger, children, contentProps = {} }: DropdownMenuProps) => (
    <RadixDropdownMenu.Root data-oid="zbxei6k">
        <RadixDropdownMenu.Trigger asChild className={styles.trigger} data-oid="0ex_hf5">
            {trigger}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal data-oid="e_yczxa">
            <RadixDropdownMenu.Content
                // Avoid Chrome adding :focus-visible outline to the trigger on close.
                onCloseAutoFocus={(e) => e.preventDefault()}
                {...{ collisionPadding: 20, ...contentProps }}
                className={classNames(styles.content, contentProps.className)}
                data-oid="5xn1ide"
            >
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
);

export type DropdownMenuItemProps = RadixDropdownMenu.DropdownMenuItemProps;

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
    ({ className, ...restProps }: DropdownMenuItemProps, ref) => (
        <RadixDropdownMenu.Item
            ref={ref}
            className={classNames(styles.item, className)}
            {...restProps}
            data-oid=":dpdjaj"
        />
    ),
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export type DropdownMenuSeparatorProps = RadixDropdownMenu.DropdownMenuSeparatorProps;

export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
    ({ className, ...restProps }: DropdownMenuSeparatorProps, ref) => {
        return (
            <RadixDropdownMenu.Separator
                ref={ref}
                className={classNames(styles.separator, className)}
                {...restProps}
                data-oid="k2q..at"
            />
        );
    },
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
