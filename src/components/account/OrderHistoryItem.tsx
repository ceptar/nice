import { useState } from 'react';
import { Button } from '~/app/components/Button';
import { Price } from '~/app/components/products/Price';
import { ActiveCustomerOrderListQuery } from '~/generated/graphql';
import { OrderStateBadge } from '~/app/components/account/OrderStateBadge';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';
// import { useTranslation } from 'react-i18next';

type OrderHistoryItemProps = {
    order?: NonNullable<ActiveCustomerOrderListQuery['activeCustomer']>['orders']['items'][number];
    isInitiallyExpanded?: boolean;
    areDetailsInitiallyExpanded?: boolean;
    className?: string;
};

export default function OrderHistoryItem({
    order,
    isInitiallyExpanded = false,
    areDetailsInitiallyExpanded = false,
    className,
}: OrderHistoryItemProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(isInitiallyExpanded);
    const [areDetailsExpanded, setAreDetailsExpanded] = useState<boolean>(
        areDetailsInitiallyExpanded,
    );
    const [isLineCalcExpanded, setIsLineCalcExpanded] = useState<boolean>(false);
    // const { t } = useTranslation();

    return (
        <div className={`border  overflow-hidden ${className}`} data-oid="__mt_9e">
            {/* Upper Summary */}
            <div
                className="p-4 lg:p-6
            flex flex-row justify-between items-center
            bg-gray-50 border-b
        "
                data-oid="t4.73sc"
            >
                {/* Infos */}
                <div
                    className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 text-sm"
                    data-oid="bm24as7"
                >
                    {/* Info - Date */}
                    <div data-oid="7yfcww6">
                        <span className="block " data-oid="1oy69._">
                            {'order.placedAt'}
                        </span>
                        <span
                            className="text-gray-500"
                            title={new Date(order?.orderPlacedAt).toLocaleString()}
                            data-oid="-ytaie_"
                        >
                            {order?.orderPlacedAt
                                ? new Date(order.orderPlacedAt).toLocaleDateString(undefined, {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric',
                                  })
                                : '--'}
                        </span>
                    </div>
                    {/* Info - Total sum */}
                    <div data-oid="9aek6v7">
                        <span className="block " data-oid="sudoka:">
                            {'order.totalSum'}
                        </span>
                        <span className="text-gray-500" data-oid="xz8z2ok">
                            <Price
                                currencyCode={order?.currencyCode}
                                priceWithTax={order?.totalWithTax}
                                data-oid="v3hn__t"
                            ></Price>
                        </span>
                    </div>
                    {/* Info - Order number */}
                    <div data-oid="nej2x3t">
                        <span className="block " data-oid="7rbstoa">
                            {'order.number'}
                        </span>
                        <span className="text-gray-500" data-oid="6db834r">
                            {order?.code || '--'}
                        </span>
                    </div>
                </div>

                {/* Status + Actions */}
                <div
                    className="gap-4 lg:gap-6 flex flex-col items-end self-stretch justify-between md:flex-row md:items-center self-start"
                    data-oid=".dl9zol"
                >
                    <OrderStateBadge state={order?.state} data-oid="2op36la" />
                    <div className="flex" role="group" data-oid="l0c3mhd">
                        <Button
                            title={'order.actionsMessage'}
                            className="bg-white text-sm rounded-r-none border-r-0"
                            data-oid="8dis:4j"
                        >
                            <span className="text-xs hidden" data-oid="fpd92eq">
                                {'order.actions'}
                            </span>
                            <EllipsisVerticalIcon className="w-5 h-5" data-oid="4y:8s1y" />
                        </Button>
                        <Button
                            className="bg-white text-sm rounded-l-none"
                            onClick={() => setIsExpanded(!isExpanded)}
                            title={'order.expand'}
                            data-oid="hr33l_l"
                        >
                            <ChevronRightIcon
                                className={`w-5 h-5 transition-transform duration-100 ${
                                    isExpanded && 'rotate-90'
                                }`}
                                data-oid="1wbuh--"
                            />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Collapsable details */}
            {isExpanded && (
                <div className="flex flex-col" data-oid="uly7xqm">
                    {order?.lines.map((line, key) => (
                        <div
                            key={key}
                            className="p-4 lg:p-6 border-b flex flex-row gap-8 justify-between group"
                            data-oid="pl8.54e"
                        >
                            {/* Product */}
                            <div
                                className="inline-flex justify-center items-center justify gap-4"
                                data-oid="alfzzte"
                            >
                                <Link
                                    to={`/products/${line.productVariant.product.slug}`}
                                    className="hover:opacity-50 transition-opacity"
                                    data-oid="2s8iyqp"
                                >
                                    <img
                                        src={line.featuredAsset?.source}
                                        className="w-24 h-24 object-cover "
                                        data-oid="nmaabk4"
                                    ></img>
                                </Link>
                                <span className="flex flex-1 flex-col gap-0" data-oid="2yervqc">
                                    {/* Product name */}
                                    <Link
                                        to={`/products/${line.productVariant.product.slug}`}
                                        className="text-black text-sm font-semibold line-clamp-3 md:line-clamp-2 max-w-md hover:text-black/50"
                                        title={line.productVariant.name}
                                        data-oid="mxu:2dx"
                                    >
                                        {line.productVariant.name}
                                    </Link>
                                    {/* Price and quantity */}
                                    <button
                                        className="inline-flex gap-2 items-center w-fit text-gray-500 text-sm mt-1"
                                        onClick={() => setIsLineCalcExpanded(!isLineCalcExpanded)}
                                        data-oid="oia_tb."
                                    >
                                        {isLineCalcExpanded && (
                                            <>
                                                <span title={'common.quantity'} data-oid="4v.gwha">
                                                    {line.quantity}
                                                </span>
                                                <span
                                                    className="text-gray-300 select-none"
                                                    data-oid="818tsq-"
                                                >
                                                    ×
                                                </span>
                                                <span title="Price per unit" data-oid="kw.azp2">
                                                    <Price
                                                        currencyCode={
                                                            line.productVariant.currencyCode
                                                        }
                                                        priceWithTax={
                                                            line.discountedUnitPriceWithTax
                                                        }
                                                        data-oid=".0p6-v4"
                                                    ></Price>
                                                </span>
                                                <span
                                                    className="text-gray-300 select-none"
                                                    data-oid="voeizik"
                                                >
                                                    Ξ
                                                </span>
                                            </>
                                        )}
                                        <span title="Subtotal" data-oid="hj-.bbb">
                                            <Price
                                                currencyCode={line.productVariant.currencyCode}
                                                priceWithTax={line.discountedLinePriceWithTax}
                                                data-oid="lhn_k7s"
                                            ></Price>
                                        </span>
                                    </button>
                                    {/* Shipment status */}
                                    <span
                                        className="text-gray-500 text-xs mt-2 tracking-wide"
                                        data-oid="rur_16b"
                                    >
                                        {line.fulfillmentLines?.reduce(
                                            (acc, fLine) => acc + fLine.quantity,
                                            0,
                                        ) === 0
                                            ? t('order.notShipped')
                                            : `${line.fulfillmentLines?.reduce(
                                                  (acc, fLine) => acc + fLine.quantity,
                                                  0,
                                              )} ${'common.or'} ${line.quantity} ${'order.items.fulfilled'}`}
                                        {line.fulfillmentLines
                                            ?.filter((fLine) => fLine.quantity > 0)
                                            .map((fLine, key) => (
                                                <span
                                                    key={key}
                                                    className="block first:mt-2"
                                                    title={new Date(
                                                        fLine.fulfillment.updatedAt,
                                                    ).toLocaleString()}
                                                    data-oid="ew9usop"
                                                >
                                                    {fLine.fulfillment.state}:{' '}
                                                    {new Intl.DateTimeFormat(undefined, {
                                                        dateStyle: 'medium',
                                                    }).format(
                                                        new Date(fLine.fulfillment.updatedAt),
                                                    )}
                                                </span>
                                            ))}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Per order actions */}
                    <div
                        className="p-2 lg:py-3 lg:px-6 gap-2 lg:gap-6 grid grid-cols-2 sm:flex justify-end items-center"
                        data-oid="j:fe87l"
                    >
                        {order?.fulfillments?.map((f, i) => (
                            <Button
                                key={i}
                                onClickCapture={() => alert(`${'trackAlert'} "${f.trackingCode}"`)}
                                className="text-xs"
                                data-oid="cqwtofp"
                            >
                                {/* Only show package number if there are more than one: Looks cleaner */}
                                {'order.trackPackage'}{' '}
                                {order.fulfillments?.length == 1 ? '' : `#${i + 1}`}
                            </Button>
                        ))}
                        <Button
                            onClick={() => setAreDetailsExpanded(!areDetailsExpanded)}
                            className="col-start-2"
                            data-oid="_vx4ls1"
                        >
                            <span className="text-xs" data-oid="gzlvm-_">
                                {'order.detailedOverview'}
                            </span>
                            <ChevronRightIcon
                                className={`w-5 h-5 transition-transform duration-100 ${
                                    areDetailsExpanded && 'rotate-90'
                                }`}
                                data-oid="nz4g1ea"
                            />
                        </Button>
                    </div>

                    {/* More details - Could be expanded with shipping adresses, payment option, etc. */}
                    {areDetailsExpanded && (
                        <div
                            className="p-2 lg:p-3 grid grid-cols-2 gap-1 text-sm max-w-sm self-center md:self-end"
                            data-oid="9ep8z7k"
                        >
                            <h6 className=" col-span-full" data-oid="9nld3p:">
                                {'order.summary'}
                            </h6>
                            <span data-oid="lsyjgx1">{'order.items.subtotal'}</span>
                            <span className="text-end" data-oid="hf5:nyw">
                                <Price
                                    currencyCode={order?.currencyCode}
                                    priceWithTax={order?.subTotalWithTax}
                                    data-oid="x88hbko"
                                ></Price>
                            </span>

                            <span data-oid="viz-.q8">{'order.shippingAndHandling'}</span>
                            <span className="text-end" data-oid="fj.bv7x">
                                <Price
                                    currencyCode={order?.currencyCode}
                                    priceWithTax={order?.shippingLines.reduce(
                                        (acc, s) => acc + s.priceWithTax,
                                        0,
                                    )}
                                    data-oid="4-iruci"
                                ></Price>
                            </span>

                            <span data-oid="sds9ye5">{'order.totalWithoutTax'}</span>
                            <span className="text-end" data-oid="iwd9ge1">
                                <Price
                                    currencyCode={order?.currencyCode}
                                    priceWithTax={order?.taxSummary.reduce(
                                        (acc, t) => acc + t.taxBase,
                                        0,
                                    )}
                                    data-oid="97y9z5x"
                                ></Price>
                            </span>

                            <span data-oid="evo76n8">{'order.estimatedTax'}</span>
                            <span className="text-end" data-oid="q.8x_:f">
                                <Price
                                    currencyCode={order?.currencyCode}
                                    priceWithTax={order?.taxSummary.reduce(
                                        (acc, t) => acc + t.taxTotal,
                                        0,
                                    )}
                                    data-oid="u-q-dge"
                                ></Price>
                            </span>

                            <span data-oid="rdgl35g">{'order.total'}</span>
                            {order?.totalWithTax && order.discounts ? (
                                <span className="text-end" data-oid="0.-34-z">
                                    <Price
                                        currencyCode={order?.currencyCode}
                                        priceWithTax={
                                            order.totalWithTax -
                                            order?.discounts.reduce(
                                                (acc, curr) => acc + curr.amountWithTax,
                                                0,
                                            )
                                        }
                                        data-oid="87eq9::"
                                    ></Price>
                                </span>
                            ) : (
                                <span className="text-end" data-oid="0ycroa.">
                                    --
                                </span>
                            )}

                            <span data-oid="27y1h0-">{'order.appliedCoupons'}</span>
                            <span className="text-end" data-oid="tgii679">
                                <Price
                                    currencyCode={order?.currencyCode}
                                    priceWithTax={order?.discounts.reduce(
                                        (acc, curr) => acc + curr.amountWithTax,
                                        0,
                                    )}
                                    data-oid="s2b7iir"
                                ></Price>
                            </span>

                            <span className="" data-oid="u41cge_">
                                {'order.grandTotal'}
                            </span>
                            <span className=" text-end" data-oid="7gx:pf7">
                                <Price
                                    currencyCode={order?.currencyCode}
                                    priceWithTax={order?.totalWithTax}
                                    data-oid="ab2s.t-"
                                ></Price>
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
