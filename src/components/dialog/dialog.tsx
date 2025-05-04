import classNames from 'classnames';
import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { CrossIcon } from '../icons';

import styles from './dialog.module.scss';

export interface DialogProps extends React.PropsWithChildren {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    showCloseButton?: boolean;
    trigger?: React.ReactElement;
    contentProps?: RadixDialog.DialogContentProps;
}

export const Dialog = ({
    trigger,
    open,
    showCloseButton = true,
    onOpenChange,
    children,
    contentProps = {},
}: DialogProps) => (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange} data-oid="k1jqcko">
        {trigger && (
            <RadixDialog.Trigger asChild data-oid=":rhs_-t">
                {trigger}
            </RadixDialog.Trigger>
        )}
        <RadixDialog.Portal data-oid="g:_s:l4">
            <RadixDialog.Overlay className={styles.overlay} data-oid="98w7uyn" />
            <RadixDialog.Content
                {...contentProps}
                className={classNames(styles.content, contentProps.className)}
                data-oid="9mhl8q3"
            >
                {children}
                {showCloseButton && (
                    <RadixDialog.Close asChild data-oid="7vdh.23">
                        <button
                            className={classNames('iconButton', styles.closeButton)}
                            aria-label="Close dialog"
                            data-oid="8c3wrvp"
                        >
                            <CrossIcon width={24} height={24} data-oid="hx1s071" />
                        </button>
                    </RadixDialog.Close>
                )}
            </RadixDialog.Content>
        </RadixDialog.Portal>
    </RadixDialog.Root>
);

export type DialogTitleProps = RadixDialog.DialogTitleProps;

export const DialogTitle = React.forwardRef<HTMLDivElement, DialogTitleProps>(
    ({ className, ...restProps }: DialogTitleProps, ref) => (
        <RadixDialog.Title
            ref={ref}
            className={classNames(styles.title, className)}
            {...restProps}
            data-oid="jteqc1f"
        />
    ),
);
DialogTitle.displayName = 'DialogTitle';

export type DialogDescriptionProps = RadixDialog.DialogDescriptionProps;

export const DialogDescription = React.forwardRef<HTMLDivElement, DialogDescriptionProps>(
    ({ className, ...restProps }: DialogDescriptionProps, ref) => (
        <RadixDialog.Title
            ref={ref}
            className={classNames(styles.description, className)}
            {...restProps}
            data-oid="lj37ij."
        />
    ),
);
DialogDescription.displayName = 'DialogDescription';
