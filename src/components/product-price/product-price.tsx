import classNames from 'classnames';
import styles from './product-price.module.scss';

interface ProductPriceProps {
    price?: string;
    discountedPrice?: string;
    className?: string;
}

export const ProductPrice = ({ price, discountedPrice, className }: ProductPriceProps) => {
    const hasDiscount = discountedPrice && price !== discountedPrice;
    return (
        <div className={classNames(styles.root, className)} data-oid=":y2iga:">
            {hasDiscount && (
                <span className={styles.beforeDiscount} data-oid="tx:1n7w">
                    {price}
                </span>
            )}
            <span data-oid="ttrfilq">{hasDiscount ? discountedPrice : price}</span>
        </div>
    );
};
