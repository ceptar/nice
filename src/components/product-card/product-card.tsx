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
    category?: string;
}

export const ProductCard = ({
    name,
    imageUrl,
    price,
    currencyCode,
    category,
}: ProductCardProps) => {
    return (
        <div className="flex flex-col h-full w-full" data-oid="ltru-u0">
            <div className="flex flex-row h-full w-full " data-oid="o-vh9p_">
                {/* Row 1: Image */}
                <div
                    className="w-full relative overflow-hidden"
                    data-oid="i8glkvr"
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full object-cover rounded-t-lg aspect-[4/6] "
                            data-oid="h3owbp-"
                        />
                    ) : (
                        <ImagePlaceholderIcon className="w-full object-cover" data-oid="1l1.1tp" />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 py-4 text-foreground w-full px-2 border-x-[1px] border-b-[1px] border-border/0.5 rounded-b-lg" data-oid="2g7b.xk">
                <div className="col-span-1  text-sm font-medium">
                    <Price
                        priceWithTax={price}
                        currencyCode={currencyCode as CurrencyCode}
                        data-oid="v5g2m6:"
                    />
                </div>
                <div className="col-span-1  text-right text-sm font-medium">{category}</div>

                <div className="col-span-2 pt-0.5 text-foreground w-full overflow-hidden break-words text-sm uppercase">
                    {name}
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
