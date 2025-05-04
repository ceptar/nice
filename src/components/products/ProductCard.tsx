import type { SearchQuery } from '~/src/vendure/generated/graphql';
import { Link } from '@remix-run/react';
import { Price } from './Price';

export type ProductCardProps = SearchQuery['search']['items'][number];

export function ProductCard({
    productAsset,
    productName,
    slug,
    priceWithTax,
    currencyCode,
}: ProductCardProps) {
    return (
        <div className="break-inside-avoid flex flex-col h-full" data-oid="4_rcm.i">
            <Link
                className="flex-nowrap transition-all duration-300 ease-out hover:opacity-70"
                prefetch="intent"
                to={`/products/${slug}`}
                data-oid="l1:41t_"
            >
                <img
                    className="object-cover aspect-[5/8] object-center"
                    alt=""
                    src={productAsset?.preview + '?w=full'}
                    data-oid="bzz9lc1"
                ></img>
                <div className="relative w-full mx-auto bottom-0 left-0" data-oid="77omvud">
                    <div
                        className="text-center absolute bottom-0 left-0 w-fit h-fit bg-discogray text-white text-md p-1 font-light"
                        data-oid="eas1yr0"
                    >
                        <Price
                            priceWithTax={priceWithTax}
                            currencyCode={currencyCode}
                            data-oid="hkxrhs3"
                        />
                    </div>
                </div>
                <div
                    className="text-xl p-1 text-discogray uppercase tracking-wider font-light whitespace-nowrap overflow-hidden"
                    data-oid="rebvl6t"
                >
                    {productName}
                </div>

                <div className="text-lg p-1 font-bold text-discogray" data-oid="ftcz7-e"></div>
            </Link>
        </div>
    );
}
