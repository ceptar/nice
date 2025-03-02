import { orders } from '@wix/ecom';
import type { SerializeFrom } from '@remix-run/node';
import { media } from '@wix/sdk';
import styles from './order-item.module.scss';
import { ImagePlaceholderIcon } from '~/src/components/icons';

interface OrderItemProps {
    item: SerializeFrom<orders.OrderLineItem>;
}

export const OrderItem = ({ item }: OrderItemProps) => {
    const productName = item.productName?.translated ?? item.productName?.original ?? '';
    const image = item.image ? media.getImageUrl(item.image) : undefined;

    return (
        <div className={styles.root} data-oid="6vulg1i">
            <div className={styles.imageWrapper} data-oid="rl55t3q">
                {image ? (
                    <img
                        className={styles.image}
                        src={image.url}
                        alt={image.altText ?? productName}
                        data-oid=".yh07-."
                    />
                ) : (
                    <ImagePlaceholderIcon
                        className={styles.imagePlaceholderIcon}
                        data-oid="n1v-ptm"
                    />
                )}
            </div>

            <div className={styles.main} data-oid="4jogiea">
                <div data-oid="nrywszl">
                    <div data-oid="px2:uzs">{productName}</div>
                    <div className={styles.productDetails} data-oid="varqxcy">
                        <div data-oid="axxhrn-">Price: {item.price?.formattedAmount}</div>
                        {item.descriptionLines?.map(({ name, colorInfo, plainText }, index) => {
                            const displayName = name?.translated ?? name?.original;
                            const colorName = colorInfo?.translated ?? colorInfo?.original;
                            const value = plainText?.translated ?? plainText?.original;
                            return (
                                <div key={index} data-oid="27954u3">
                                    {displayName}: {colorName ?? value}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.orderInfo} data-oid="..9icwx">
                    <div data-oid="3xwnk7q">Qty: {item.quantity}</div>
                    <div data-oid="tlm3gsi">{item.totalPriceBeforeTax?.formattedAmount}</div>
                </div>
            </div>
        </div>
    );
};
