import { Price } from '~/src/components/products/Price';
import { OrderDetailFragment } from '~/src/vendure/generated/graphql';

export function CartTotals({ order }: { order?: OrderDetailFragment | null }) {
    return (
        <dl className="border-t mt-6 border-gray-200 py-6 space-y-6" data-oid="2ehfe88">
            <div className="flex items-center justify-between" data-oid="wmab6gj">
                <dt className="text-sm" data-oid="lc1q2_:">
                    Subtotal
                </dt>
                <dd className="text-sm font-medium text-gray-900" data-oid="u6qliq4">
                    <Price
                        priceWithTax={order?.subTotalWithTax}
                        currencyCode={order?.currencyCode}
                        data-oid="3y.puh6"
                    ></Price>
                </dd>
            </div>
            <div className="flex items-center justify-between" data-oid="-hgww6a">
                <dt className="text-sm" data-oid="o:uxqw-">
                    Shipping
                </dt>
                <dd className="text-sm font-medium text-gray-900" data-oid="o6gq_-k">
                    <Price
                        priceWithTax={order?.shippingWithTax ?? 0}
                        currencyCode={order?.currencyCode}
                        data-oid="d:1er24"
                    ></Price>
                </dd>
            </div>
            <div
                className="flex items-center justify-between border-t border-gray-200 pt-6"
                data-oid="gtgg2eo"
            >
                <dt className="text-base font-medium" data-oid="q218qiu">
                    Total
                </dt>
                <dd className="text-base font-medium text-gray-900" data-oid=".izjtex">
                    <Price
                        priceWithTax={order?.totalWithTax}
                        currencyCode={order?.currencyCode}
                        data-oid="wuemyk:"
                    ></Price>
                </dd>
            </div>
        </dl>
    );
}
