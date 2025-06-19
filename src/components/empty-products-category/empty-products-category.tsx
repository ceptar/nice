import styles from './empty-products-category.module.scss';

interface EmptyProductsCategoryProps {
    title: string;
    subtitle: string;
    actionButton?: React.ReactNode;
}

export const EmptyProductsCategory = ({
    title,
    subtitle,
    actionButton,
}: EmptyProductsCategoryProps) => {
    return (
        <div className={styles.root} data-oid="00gbngj">
            <h1 className={styles.title} data-oid="e_ee8ey">
                {title}
            </h1>
            <div className="paragraph2" data-oid="9jhksas">
                {subtitle}
            </div>
            {actionButton}
        </div>
    );
};
