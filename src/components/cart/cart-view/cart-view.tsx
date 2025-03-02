import classNames from 'classnames';
import { ReactNode } from 'react';
import { CrossIcon, LockIcon } from '~/src/components/icons';
import { Spinner } from '~/src/components/spinner/spinner';
import { getCartItemCount, findLineItemPriceBreakdown } from '~/src/wix/cart';
import { type Cart, type CartTotals } from '~/src/wix/ecom';
import { CartItem } from '../cart-item/cart-item';

import styles from './cart-view.module.scss';

export interface CartViewProps {
    cart?: Cart;
    cartTotals?: CartTotals;
    updatingCartItemIds?: string[];
    error?: string;
    isLoading: boolean;
    isUpdating?: boolean;
    isCheckoutInProgress: boolean;
    onClose: () => void;
    onCheckout: () => void;
    onViewCart: () => void;
    onItemQuantityChange: (args: { id: string; quantity: number }) => void;
    onItemRemove: (id: string) => void;
}

export const CartView = ({
    cart,
    cartTotals,
    updatingCartItemIds = [],
    error,
    isLoading,
    isUpdating = false,
    isCheckoutInProgress,
    onClose,
    onCheckout,
    onViewCart,
    onItemQuantityChange,
    onItemRemove,
}: CartViewProps) => {
    if (isLoading) {
        return (
            <CartFallback data-oid="owu5-xt">
                <Spinner size={50} data-oid="pidrlt6" />
            </CartFallback>
        );
    }

    if (error) {
        return <CartFallback data-oid="nebvmiq">{error}</CartFallback>;
    }

    const itemCount = cart ? getCartItemCount(cart) : 0;

    return (
        <div className={styles.cart} data-oid="ajdtay_">
            <div className={styles.header} data-oid="030gatd">
                <span className="heading6" data-oid="g_ghik:">
                    Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
                <button
                    className={classNames(styles.closeButton, 'iconButton')}
                    onClick={onClose}
                    data-oid="zdph38c"
                >
                    <CrossIcon data-oid="b_rasbs" />
                </button>
            </div>

            {!cart || cart.lineItems.length === 0 ? (
                <CartFallback data-oid="sc0_85n">Your cart is empty.</CartFallback>
            ) : (
                <>
                    <div className={styles.cartItems} data-oid="v5l05:o">
                        {cart.lineItems.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                isUpdating={updatingCartItemIds.includes(item._id!)}
                                priceBreakdown={findLineItemPriceBreakdown(item, cartTotals)}
                                onQuantityChange={(quantity: number) =>
                                    onItemQuantityChange({ id: item._id!, quantity })
                                }
                                onRemove={() => onItemRemove(item._id!)}
                                data-oid="3j6hofh"
                            />
                        ))}
                    </div>

                    <div className={styles.footer} data-oid="wbz_8.v">
                        {cart.subtotal && (
                            <>
                                <div className={styles.subtotal} data-oid="koex23d">
                                    <span data-oid="7xchkrd">Subtotal</span>
                                    <span data-oid="n2968p4">
                                        {cart.subtotal.formattedConvertedAmount}
                                    </span>
                                </div>
                                <div className={styles.subtotalNote} data-oid="q33g5sw">
                                    Taxes and shipping are calculated at checkout.
                                </div>
                            </>
                        )}

                        <button
                            className={classNames(
                                'button',
                                'mutedPrimaryButton',
                                styles.checkoutButton,
                            )}
                            onClick={onCheckout}
                            disabled={isCheckoutInProgress || isUpdating}
                            data-oid="i1hlkt-"
                        >
                            {isCheckoutInProgress ? (
                                <Spinner size="1lh" data-oid="4s2koed" />
                            ) : (
                                'Checkout'
                            )}
                        </button>
                        <button
                            className={classNames('button', styles.viewCartButton)}
                            onClick={onViewCart}
                            data-oid="16bga2m"
                        >
                            View Cart
                        </button>

                        <div className={styles.secureCheckout} data-oid=":x2445d">
                            <LockIcon width={11} data-oid="9xtrrf8" />
                            <span data-oid="8ef68im">Secure Checkout</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const CartFallback = ({ children }: { children: ReactNode }) => (
    <div className={styles.cartFallback} data-oid="sl4rnv5">
        {children}
    </div>
);
