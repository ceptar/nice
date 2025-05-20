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

                <div
                    className="z-[20] text-[12px] absolute top-0 left-0 right-0"
                    data-oid="q295t0s"
                >
                    <div className="relative flex flex-row">
                    <div
                        className="relative rounded-br-xl flex flex-col pl-2 pr-4 py-0.5 bg-background justify-between font-[600]"
                        data-oid="f20uh9h"
                    >
                        <div
                            className="flex line-clamp-2 overflow-hidden break-words uppercase font-[600]"
                            data-oid="ukyqt4k"
                        >
                            {name}
                        </div>
                                               
                    </div>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0C5.37258 0 0 5.37258 0 12V0H12Z" fill="white"/>
</svg>

</div>
                </div>

                <div className="z-[20] absolute bottom-0 left-0 right-0 " data-oid="q295t0s">
<div className="relative flex flex-row-reverse">
                    <div
                        className="pr-2 py-1 pl-4 text-[12px] rounded-tl-xl text-foreground  bg-background flex flex-col-reverse text-right font-[600] justify-self-end items-end align-bottom"
                        data-oid="ukyqt4k"
                    >

                        <Price
                            priceWithTax={price}
                            currencyCode={currencyCode as CurrencyCode}
                            data-oid="v5g2m6:"
                        />

                    </div>
                                            <div className="rotate-180">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0C5.37258 0 0 5.37258 0 12V0H12Z" fill="white"/>
</svg>
</div>
                </div>

         </div>
            </div>

           
   
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
