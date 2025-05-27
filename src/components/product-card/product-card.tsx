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
}: ProductCardProps) => {
    return (
        <div className="relative flex flex-col h-full w-full" data-oid="ltru-u0">
        <div className="flex h-full w-full" data-oid="o-vh9p_">
            {/* Row 1: Image */}
            <div className="w-full h-full relative overflow-hidden  border-b border-border" data-oid="i8glkvr">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={name} 
                        className="w-full object-cover aspect-[4/6] h-full"
                        data-oid="h3owbp-" 
                    />
                ) : (
                    <ImagePlaceholderIcon
                        className="w-full h-full object-cover"
                        data-oid="1l1.1tp"
                    />
                )}
            </div>
             </div>

            <div className="flex flex-col p-1 text-foreground h-fit w-full bg-white">
                <div className="flex flex-row px-1 placeholder:w-full h-full ">
                    <div className="overflow-hidden break-words text-xs font-semibold uppercase">
                        {name}
                    </div>
                </div>

                <div className="flex flex-row px-1 w-full h-full text-sm uppercase font-regular">
                    <Price
                        priceWithTax={price}
                        currencyCode={currencyCode as CurrencyCode}
                        data-oid="v5g2m6:"
                    />
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
