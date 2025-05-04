import styles from './product-card.module.scss';
import { ImagePlaceholderIcon } from '../icons';
import { Price } from '~/src/components/products/Price';
import { CurrencyCode } from '~/src/vendure/generated/graphql';
import DiscoDevider from '../icons/disco-devider';

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
            <div className="relative flex w-full aspect-[0.75] md:aspect-[5/8] overflow-hidden" data-oid="i8glkvr">
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className="object-cover w-full h-full block" data-oid="h3owbp-" />
                ) : (
                    <ImagePlaceholderIcon
                        className={styles.imagePlaceholderIcon}
                        data-oid="1l1.1tp"
                    />
                )}
                {/* <div className="z-[20] absolute w-full mx-auto bottom-0 left-0" data-oid="q295t0s">
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
                </div> */}

                {/* 
          {ribbon && <span className={styles.ribbon}>{ribbon}</span>} 
          */}
            </div>
            <div className=" h-[26px] text-[12px] uppercase font-[500] w-full flex" data-oid="242qt:2">
                <div className="flex flex-row justify-between items-center gap-0 overflow-hidden w-full h-full">
                    <div className=" justify-center  pl-2  p-0 m-0  flex flex-col h-full flex-grow bg-black text-background" data-oid="ukyqt4k">
                        {name}
                    </div>
             
 
                <DiscoDevider className="min-h-full object-cover p-[-2px] m-[-2px] overflow-hidden"/>
                 <div className="flex flex-col justify-center  p-0 m-0  flex-grow h-full bg-black text-background text-end pr-2">
                    <Price
                        priceWithTax={price}
                        currencyCode={currencyCode as CurrencyCode}
                        data-oid="v5g2m6:"
                    />
                    </div>
                </div>
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
