import { Link, type MetaFunction } from '@remix-run/react';
import classNames from 'classnames';
import { type ReactNode } from 'react';
import { CartItem } from '~/src/components/cart/cart-item/cart-item';
import { LockIcon } from '~/src/components/icons';
import { Spinner } from '~/src/components/spinner/spinner';
import { toast } from '~/src/components/toast/toast';
import { findLineItemPriceBreakdown, useCart, useCheckout } from '~/src/wix/cart';
import { getErrorMessage } from '~/src/wix/utils';

import styles from './route.module.scss';

export default function CartPage() {
    const {
        cart,
        cartTotals,
        isCartTotalsUpdating,
        updatingCartItemIds,
        removeItem,
        updateItemQuantity,
    } = useCart();

    const handleError = (error: unknown) => toast.error(getErrorMessage(error));

    const { checkout, isCheckoutInProgress } = useCheckout({
        successUrl: '/thank-you',
        cancelUrl: '/products/all-products',
        onError: handleError,
    });

    if (cart.isLoading) {
        return (
            <CartFallback data-oid="p-.8nol">
                <Spinner size={50} data-oid=".le2x6u" />
            </CartFallback>
        );
    }

    if (cart.error) {
        return <CartFallback data-oid="ldrpvxw">{getErrorMessage(cart.error)}</CartFallback>;
    }

    if (!cart.data || cart.data.lineItems.length === 0) {
        return (
            <CartFallback data-oid="8.e_nod">
                <div className={styles.cartFallbackTitle} data-oid="9.3yew0">
                    Cart is empty
                </div>
                <Link to="/" className={styles.continueBrowsingLink} data-oid="od21xrq">
                    Continue Browsing
                </Link>
            </CartFallback>
        );
    }

    return (
        <div className={styles.page} data-oid="-o85q9q">
            <div className={styles.cart} data-oid="zx7ymr2">
                <h1 className={styles.cartHeader} data-oid="0vdnkkg">
                    My cart
                </h1>
                <div className={styles.cartItems} data-oid="l8b4ljk">
                    {cart.data.lineItems.map((item) => (
                        <CartItem
                            key={item._id}
                            item={item}
                            isUpdating={updatingCartItemIds.includes(item._id!)}
                            priceBreakdown={findLineItemPriceBreakdown(item, cartTotals)}
                            onRemove={() => removeItem(item._id!).catch(handleError)}
                            onQuantityChange={(quantity: number) =>
                                updateItemQuantity({ id: item._id!, quantity }).catch(handleError)
                            }
                            data-oid="ifdtqs-"
                        />
                    ))}
                </div>
            </div>
            <div className={styles.summary} data-oid="fesc6xw">
                <h1 className={styles.summaryHeader} data-oid="46tyygw">
                    Order summary
                </h1>
                <div
                    className={classNames(styles.summaryContent, {
                        [styles.loading]: isCartTotalsUpdating,
                    })}
                    data-oid="omw_uv1"
                >
                    <div className={styles.summaryRow} data-oid="7tn1qh6">
                        <span data-oid="htq9wnj">Subtotal</span>
                        <span data-oid="6xs5944">
                            {cartTotals?.priceSummary?.subtotal?.formattedConvertedAmount}
                        </span>
                    </div>
                    {cartTotals?.shippingInfo?.region && (
                        <div className={styles.summaryRow} data-oid="skv2tf3">
                            <span data-oid="70ffz7y">Delivery</span>
                            <span data-oid="974xlp9">
                                {Number(cartTotals?.priceSummary?.shipping?.amount) === 0
                                    ? 'FREE'
                                    : cartTotals?.priceSummary?.shipping?.formattedConvertedAmount}
                            </span>
                        </div>
                    )}
                    <div
                        className={classNames(styles.summaryRow, styles.summaryTotal)}
                        data-oid="h_cyqe5"
                    >
                        <span data-oid="vmmfm3e">Total</span>
                        <span data-oid="zu2uxvr">
                            {cartTotals?.priceSummary?.total?.formattedConvertedAmount}
                        </span>
                    </div>
                    {isCartTotalsUpdating && (
                        <div className={styles.spinner} data-oid="mvfu6oz">
                            <Spinner size={50} data-oid="ztm3dcb" />
                        </div>
                    )}
                </div>

                <button
                    className={classNames('button', styles.checkoutButton)}
                    onClick={checkout}
                    disabled={isCheckoutInProgress || isCartTotalsUpdating}
                    data-oid="6h58edr"
                >
                    {isCheckoutInProgress ? <Spinner size="1lh" data-oid="l41ptuy" /> : 'Checkout'}
                </button>

                <div className={styles.secureCheckout} data-oid="n8:vuap">
                    <LockIcon width={11} data-oid="rxgmu.c" />
                    <span data-oid="osd154o">Secure Checkout</span>
                </div>
            </div>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Cart | ReClaim' },
        {
            name: 'description',
            content: 'Essential home products for sustainable living',
        },
        {
            property: 'robots',
            content: 'noindex, nofollow',
        },
    ];
};

const CartFallback = ({ children }: { children: ReactNode }) => (
    <div className={styles.page} data-oid="7jk4jc7">
        <div className={styles.cart} data-oid=".7q26so">
            <h1 className={styles.cartHeader} data-oid="yxo_lig">
                My cart
            </h1>
            <div className={styles.cartFallback} data-oid=":_vw91q">
                {children}
            </div>
        </div>
    </div>
);
