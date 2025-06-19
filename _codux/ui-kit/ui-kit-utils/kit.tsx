import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './kit.module.scss';

interface KitProps {
    category: string;
    title: string;
    children?: ReactNode;
    className?: string;
}

export const Kit = ({ category, title, children, className }: KitProps) => {
    return (
        <div className={classNames(styles.container, className)} data-oid="vz2sejb">
            <div className={styles.header} data-oid="iz65ky5">
                <b data-oid="oivz.j_">UI Kit</b> | {category}
            </div>
            <h3 className={styles.title} data-oid="u6olukv">
                {title}
            </h3>
            {children}
        </div>
    );
};

interface SectionProps {
    title?: string;
    children?: ReactNode;
    className?: string;
}

const Section = ({ title, children, className }: SectionProps) => (
    <div className={classNames(styles.section, className)} data-oid="ks-xjox">
        {title && (
            <div className={styles.sectionTitle} data-oid="l2y.kmq">
                {title}
            </div>
        )}
        {children}
    </div>
);

interface ItemProps {
    children?: ReactNode;
    className?: string;
}

const Item = ({ children, className }: ItemProps) => (
    <div className={classNames(styles.item, className)} data-oid="t0w8mdq">
        {children}
    </div>
);

const Description = ({ children }: { children?: ReactNode }) => (
    <div className={styles.itemDescription} data-oid="rfv0wli">
        {children}
    </div>
);

Kit.Section = Section;
Kit.Item = Item;
Kit.Description = Description;
