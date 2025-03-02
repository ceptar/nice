import { useEffect, useMemo, useState } from 'react';
import { cart } from '@wix/ecom';
import { media } from '@wix/sdk';
import { QuantityInput } from '~/src/components/quantity-input/quantity-input';
import { TrashIcon, ImagePlaceholderIcon, ErrorIcon } from '~/src/components/icons';
import { Spinner } from '~/src/components/spinner/spinner';
import { ProductPrice } from '~/src/components/product-price/product-price';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { CartItemOptions } from '../cart-item-options/cart-item-options';

import styles from './cart-item.module.scss';

export interface CartItemProps {
    item: cart.LineItem;
    priceBreakdown?: cart.LineItemPricesData;
    isUpdating?: boolean;
    onRemove: () => void;
    onQuantityChange: (newQuantity: number) => void;
}

export const CartItem = ({
    item,
    priceBreakdown,
    isUpdating = false,
    onRemove,
    onQuantityChange,
}: CartItemProps) => {
    const productName = item.productName?.translated ?? '';

    const [quantity, setQuantity] = useState(item.quantity!);

    useEffect(() => {
        if (!isUpdating) {
            setQuantity(item.quantity!);
        }
    }, [item.quantity, isUpdating]);

    const updateItemQuantityDebounced = useMemo(
        () => debounce(onQuantityChange, 300),
        [onQuantityChange],
    );

    const handleQuantityChange = (value: number) => {
        setQuantity(value);
        if (value > 0) {
            updateItemQuantityDebounced(value);
        }
    };

    const image = item.image ? media.getImageUrl(item.image) : undefined;

    const isUnavailable = item.availability?.status === cart.ItemAvailabilityStatus.NOT_AVAILABLE;

    return (
        <div
            className={classNames(styles.root, { [styles.loading]: isUpdating })}
            data-oid="v4ojrvp"
        >
            <div className={styles.itemContent} data-oid="v9_9795">
                {image ? (
                    <div className={styles.imageWrapper} data-oid="vrfsa84">
                        <img
                            src={image.url}
                            alt={image.altText ?? productName}
                            data-oid="1bjnqj_"
                        />
                    </div>
                ) : (
                    <div className={styles.imagePlaceholder} data-oid="mls70ui">
                        <ImagePlaceholderIcon
                            className={styles.imagePlaceholderIcon}
                            data-oid="cd3n_68"
                        />
                    </div>
                )}

                <div className={styles.productInfo} data-oid="9v1fuq1">
                    <div className={styles.productNameAndPrice} data-oid="c_r_i3o">
                        <div className={styles.productName} data-oid="g0vp3uj">
                            {productName}
                        </div>

                        {item.fullPrice?.formattedConvertedAmount && (
                            <ProductPrice
                                price={item.fullPrice?.formattedConvertedAmount}
                                discountedPrice={item.price?.formattedConvertedAmount}
                                data-oid="p7q1e.u"
                            />
                        )}

                        {item.descriptionLines && item.descriptionLines.length > 0 && (
                            <CartItemOptions
                                className={styles.options}
                                options={item.descriptionLines}
                                visibleOptionsCount={1}
                                data-oid=":jae70_"
                            />
                        )}
                    </div>

                    <div className={styles.quantity} data-oid="d1:lzey">
                        <QuantityInput
                            value={quantity}
                            onChange={handleQuantityChange}
                            className={classNames(styles.quantityInput, {
                                [styles.quantityInputDisabled]: isUnavailable,
                            })}
                            disabled={isUnavailable}
                            data-oid="_65f6h8"
                        />
                    </div>
                    <div className={styles.priceBreakdown} data-oid="06--_1u">
                        {priceBreakdown?.lineItemPrice?.formattedConvertedAmount}
                    </div>
                    <button
                        className={classNames(styles.removeButton, 'iconButton')}
                        onClick={onRemove}
                        data-oid="opjo_27"
                    >
                        <TrashIcon data-oid="i0ihsuf" />
                    </button>
                </div>
            </div>

            {isUnavailable && (
                <div className={styles.unavailableIndication} data-oid="4lsm1rh">
                    <ErrorIcon className={styles.unavailableIcon} data-oid="367_1qz" />
                    <span data-oid="g0d-ekz">Sorry, this item is no longer available.</span>
                </div>
            )}

            {isUpdating && (
                <div className={styles.spinner} data-oid="s_e2083">
                    <Spinner size={50} data-oid="z7srbu7" />
                </div>
            )}
        </div>
    );
};
