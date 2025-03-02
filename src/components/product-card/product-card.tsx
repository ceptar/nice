import styles from './product-card.module.scss';
import { ImagePlaceholderIcon } from '../icons';
import { Price } from '~/src/components/products/Price';
import { CurrencyCode } from '~/src/vendure/generated/graphql';

interface ProductCardProps {
    name: string;
    /** @format media-url */
    imageUrl?: string;
    /**
     * Product price formatted with the currency.
     */
    price?: number;
    /**
     * Discounted product price formatted with the currency.
     * It is displayed if it's not equal to the main price.
     */
    // discountedPrice?: string;
    // ribbon?: string;
    // inventoryStatus?: products.InventoryStatus;
    currencyCode?: string;
}

export const ProductCard = ({
    name,
    imageUrl,
    price,
    currencyCode,
    // discountedPrice,
    // ribbon,
    // inventoryStatus,
}: ProductCardProps) => {
    return (
        <div className={styles.productCard} data-oid="o-vh9p_">
            <div className={styles.imageWrapper} data-oid="i8glkvr">
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className={styles.image} data-oid="h3owbp-" />
                ) : (
                    <ImagePlaceholderIcon
                        className={styles.imagePlaceholderIcon}
                        data-oid="1l1.1tp"
                    />
                )}
                <div className="z-[20] absolute w-full mx-auto bottom-0 left-0" data-oid="q295t0s">
                    <div
                        className="text-center bg-neutral-800 bottom-0 left-0 w-fit h-fit text-white p-1 "
                        data-oid="f20uh9h"
                    >
                        <Price
                            priceWithTax={price}
                            currencyCode={currencyCode as CurrencyCode}
                            data-oid="v5g2m6:"
                        />
                    </div>
                </div>

                {/* 
          {ribbon && <span className={styles.ribbon}>{ribbon}</span>} 
          */}
            </div>

            <div className={styles.name} data-oid="ukyqt4k">
                {name}
            </div>

            {/* 
        {inventoryStatus === products.InventoryStatus.OUT_OF_STOCK ? (
        <div className={styles.outOfStock}>Out of stock</div>
        ) : ( 
        */}
            {/*
        <ProductPrice
        className={styles.price}
        price={price}
        currencyCode=
        // discountedPrice={discountedPrice}
        /> 
        */}
        </div>
    );
};

export const ProductCardSkeleton = () => (
    <div className={styles.skeleton} data-oid="ltru-u0">
        <div className={styles.imageWrapper} data-oid="sjje7bv" />
        <div className={styles.name} data-oid="242qt:2">
            &nbsp;
        </div>
        <div className={styles.price} data-oid="8efhmdd">
            &nbsp;
        </div>
    </div>
);
