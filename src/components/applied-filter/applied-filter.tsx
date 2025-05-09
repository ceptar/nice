import { getClickableElementAttributes } from '~/src/wix/utils';
import { CrossIcon } from '../icons';

import styles from './applied-filter.module.scss';

interface AppliedFilterProps {
    children: React.ReactNode;
    onClick: () => void;
}

export const AppliedFilter = ({ children, onClick }: AppliedFilterProps) => {
    return (
        <div className={styles.root} {...getClickableElementAttributes(onClick)} data-oid="i:i7vn8">
            {children}
            <CrossIcon width={12} height={12} data-oid="kii.i.j" />
        </div>
    );
};
