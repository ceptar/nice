import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/src/components/ui/sheet';
import { Price } from '~/src/components/products/Price';
import { CartLoaderData } from '~/app/routes/api.active-order/route';
import { CurrencyCode } from '~/src/vendure/generated/graphql';
import { Link, useLocation } from '@remix-run/react';
import { CartContents } from './CartContents';

export default function CartTray({
    open,
    onClose,
    activeOrder,
    adjustOrderLine,
    removeItem,
}: {
    open: boolean;
    onClose: (closed: boolean) => void;
    activeOrder: CartLoaderData['activeOrder'];
    adjustOrderLine?: (lineId: string, quantity: number) => void;
    removeItem?: (lineId: string) => void;
}) {
    const currencyCode = activeOrder?.currencyCode || CurrencyCode.Usd;
    const location = useLocation();
    const editable = true;

    return (
        <Sheet open={open} onOpenChange={onClose} data-oid="x8y:t8v">
            <SheetTrigger asChild data-oid="gs.i0q5"></SheetTrigger>

            <SheetContent className="overflow-y-scroll no-scrollbar pt-0" data-oid="lt34yy5">
                <SheetHeader data-oid=":-3gp:r">
                    <SheetTitle data-oid="jl0sj8m"></SheetTitle>
                    <SheetDescription data-oid="p:ko_.t"></SheetDescription>
                </SheetHeader>
                <div
                    className="flex justify-between items-center px-2 py-2 mb-4 border-b-[1px] border-gray-500"
                    data-oid="j9sp_km"
                >
                    <h2 className="text-md text-gray-900" data-oid="_2nt9kt">
                        Cart
                    </h2>
                </div>

                <div className="pb-4" data-oid="9fp1om1">
                    {activeOrder?.totalQuantity ? (
                        <CartContents
                            orderLines={activeOrder?.lines ?? []}
                            currencyCode={currencyCode!}
                            editable={editable}
                            removeItem={removeItem}
                            adjustOrderLine={adjustOrderLine}
                            data-oid="szvbl-2"
                        ></CartContents>
                    ) : (
                        <div
                            className="flex items-center justify-center h-48 text-xl text-gray-500"
                            data-oid="94bvd3a"
                        >
                            Your cart is empty
                        </div>
                    )}
                </div>

                {activeOrder?.totalQuantity && editable && (
                    <div className="border-t-[1px] border-gray-500 py-6" data-oid="6q0c3mg">
                        <div
                            className="flex justify-between text-base font-medium text-gray-900"
                            data-oid="r6ddkhb"
                        >
                            <p data-oid="v4-z5vm">Subtotal</p>
                            <p data-oid="a622nza">
                                {currencyCode && (
                                    <Price
                                        priceWithTax={activeOrder?.subTotalWithTax ?? 0}
                                        currencyCode={currencyCode}
                                        data-oid="afgfzbk"
                                    />
                                )}
                            </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500" data-oid="hrwk4ua">
                            Shipping will be calculated at checkout.
                        </p>
                        <div className="mt-6" data-oid="xe9t:4:">
                            <Link
                                to="/checkout"
                                onClick={() => onClose(false)}
                                className="rounded-md text-sm flex justify-center items-center px-6 py-3 border border-gray-500 shadow-sm hover:opacity-70"
                                data-oid="2wc9t1z"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
                <div className="cart--checkoutform" data-oid="x459ac1"></div>
                <SheetFooter data-oid="3-blqfm">
                    <SheetClose asChild data-oid="zhowdt3"></SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
