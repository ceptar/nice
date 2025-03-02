import classNames from 'classnames';
import { orders } from '@wix/ecom';
import type { SerializeFrom } from '@remix-run/node';
import { OrderItem } from './order-item/order-item';
import styles from './order-summary.module.scss';

export interface OrderSummaryProps {
    className?: string;
    order: SerializeFrom<orders.Order & orders.OrderNonNullableFields>;
}

export const OrderSummary = ({ order, className }: OrderSummaryProps) => {
    const { lineItems, priceSummary, shippingInfo, billingInfo, buyerNote } = order;

    const deliveryContact = shippingInfo?.logistics?.shippingDestination?.contactDetails;
    const deliveryAddress = shippingInfo?.logistics?.shippingDestination?.address;
    const deliveryTime = shippingInfo?.logistics?.deliveryTime;

    const billingContact = billingInfo?.contactDetails;
    const billingAddress = billingInfo?.address;

    return (
        <div className={classNames(styles.root, className)} data-oid="7.a7bd_">
            <div className={styles.section} data-oid="8fp06yo">
                <div className={styles.orderItems} data-oid="2r3g3vv">
                    {lineItems.map((item) => (
                        <OrderItem key={item._id} item={item} data-oid="5.3gvfh" />
                    ))}
                </div>

                <hr className={styles.divider} data-oid="30gcq-2" />

                <div className={styles.summary} data-oid="xk:hbj1">
                    {buyerNote && (
                        <div data-oid="-umauhp">
                            <div data-oid="i64ge3g">Note</div>
                            <div className={styles.note} data-oid="::7qx4k">
                                {buyerNote}
                            </div>
                        </div>
                    )}

                    <div className={styles.priceSummary} data-oid="ddhg3mn">
                        <div className={styles.priceDetails} data-oid="_xjkr50">
                            <div className={styles.priceRow} data-oid="_0x9l4:">
                                <div data-oid="hvkd4z_">Subtotal</div>
                                <div data-oid="mrzam2p">
                                    {priceSummary?.subtotal?.formattedAmount}
                                </div>
                            </div>

                            <div className={styles.priceRow} data-oid="5njst48">
                                <div data-oid=":jzzigz">Delivery</div>
                                <div data-oid="ng0xn6j">
                                    {Number(priceSummary?.shipping?.amount) === 0
                                        ? 'Free'
                                        : priceSummary?.shipping?.formattedAmount}
                                </div>
                            </div>

                            <div className={styles.priceRow} data-oid="_11fa8k">
                                <div data-oid="7x4:r0f">Sales Tax</div>
                                <div data-oid="usk:k_g">{priceSummary?.tax?.formattedAmount}</div>
                            </div>
                        </div>

                        <hr className={styles.divider} data-oid="34p6260" />

                        <div
                            className={classNames(styles.priceRow, styles.totalPrice)}
                            data-oid="w.jpzj9"
                        >
                            <div data-oid="op.0xo3">Total</div>
                            <div data-oid="8f29orp">{priceSummary?.total?.formattedAmount}</div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className={classNames(styles.divider, styles.dashed)} data-oid="6-7d18o" />

            <div className={classNames(styles.section, styles.addressSection)} data-oid="_5pgewx">
                <div data-oid="cgwuc9a">
                    <div data-oid="k3n0vy7">Delivery address</div>
                    <ul className={styles.addressData} data-oid="kbbn8w8">
                        {deliveryContact && (
                            <li data-oid="84x-x0o">{contactToString(deliveryContact)}</li>
                        )}
                        {deliveryAddress && (
                            <li data-oid="i4dfq1u">{addressToString(deliveryAddress)}</li>
                        )}
                        {deliveryContact?.phone && (
                            <li data-oid="6r3n0er">{deliveryContact?.phone}</li>
                        )}
                        {deliveryTime && (
                            <li className={styles.deliveryTime} data-oid="jplkur_">
                                {deliveryTime}
                            </li>
                        )}
                    </ul>
                </div>

                <div data-oid="o.q-dxt">
                    <div data-oid="tsvxv2m">Billing address</div>
                    <ul className={styles.addressData} data-oid="f15yz-b">
                        {billingContact && (
                            <li data-oid="7em5olp">{contactToString(billingContact)}</li>
                        )}
                        {billingAddress && (
                            <li data-oid="o6wfwwo">{addressToString(billingAddress)}</li>
                        )}
                        {billingContact?.phone && (
                            <li data-oid="x75f3fv">{billingContact.phone}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

function addressToString(address: orders.Address) {
    return [
        address.addressLine1,
        address.addressLine2,
        address.city,
        address.postalCode,
        address.country,
    ]
        .filter(Boolean)
        .join(', ');
}

function contactToString(contact: orders.FullAddressContactDetails) {
    return [contact.firstName, contact.lastName].filter(Boolean).join(' ');
}
