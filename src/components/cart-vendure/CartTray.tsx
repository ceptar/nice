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
import { Button } from '../ui/button';
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
                    className="flex justify-between items-center px-2 py-2 mb-4 border-b-[2px] border-[#954eff3b]"
                    data-oid="j9sp_km"
                >
                    <h2 className="text-md " data-oid="_2nt9kt">
                        Cart
                    </h2>
                </div>

                <div className="pb-4" data-oid="9fp1om1">
                    {activeOrder?.totalQuantity ? (
                          <>
                        <CartContents
                            orderLines={activeOrder?.lines ?? []}
                            currencyCode={currencyCode!}
                            editable={editable}
                            removeItem={removeItem}
                            adjustOrderLine={adjustOrderLine}
                            data-oid="szvbl-2"
                        ></CartContents>
                    {/* Only show totals if we have items */}
                    <div className="border-t-[2px] mt-4 border-[#954eff3b] py-6">
                            <div className="flex justify-between text-base font-semibold">
                                <p>Subtotal</p>
                                <p>
                                    {currencyCode && (
                                        <Price
                                            priceWithTax={activeOrder?.subTotalWithTax ?? 0}
                                            currencyCode={currencyCode}
                                        />
                                    )}
                                </p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-400">
                                Shipping will be calculated at checkout.
                            </p>
                            <div className="mt-6">
                                <Button className="bg-[#954eff3b] text-primary w-full">
                                <Link
                                    to="/checkout"
                                    onClick={() => onClose(false)}
                                    
                                >
                                    Checkout
                                </Link>
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-48 text-xl text-gray-500">
                        Your cart is empty
                    </div>
                )}
            </div>

            <SheetFooter>
                <SheetClose asChild>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
);
}