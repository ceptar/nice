import styles from './label-with-arrow.module.scss';
import { ArrowRightIcon } from '~/src/components/icons';
import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

export const LabelWithArrow: FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div {...props} className={classNames(styles.root, className)} data-oid="2qbw645">
            <div className={styles.label} aria-hidden data-oid="sqmoxcn">
                {children}
            </div>
            <div className={styles.label} data-oid=":5wnlng">
                {children}
            </div>
            {/* <ArrowRightIcon className={styles.icon} data-oid="en242_8" /> */}
        </div>
    );
};
