import * as React from 'react';
import { useLoaderData, useSubmit, Form } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import { sdk } from '~/src/vendure/graphqlWrapper';
import FacetFilterDrawer from '~/src/components/facet-filter/FacetFilterDrawer';
import { Link } from '@remix-run/react';
import { ProductCard, ProductCardSkeleton } from '~/src/components/product-card/product-card';
import { ProductLink } from '~/src/components/product-link/product-link';

import { Price } from '~/src/components/products/Price';
import { CurrencyCode } from '~/src/vendure/generated/graphql';

export const loader: LoaderFunction = async ({ params, request }) => {
    console.log('collectionSlug', params.categorySlug);
    const url = new URL(request.url);
    const term = url.searchParams.get('term') || '';
    const filterIds = url.searchParams.get('filterIds')?.split(',') || [];
    const categorySlug = params.categorySlug;

    const { collection } = await sdk.collection({ slug: categorySlug });
    const { search } = await sdk.search({
        input: {
            term,
            collectionSlug: params.categorySlug,
            groupByProduct: true,
            facetValueFilters: filterIds.map((id) => ({ and: id })),
        },
    });

    return { collection, search, term, filterIds };
};

export default function ProductsPage() {
    const { collection, search, term, filterIds } = useLoaderData<typeof loader>();
    const submit = useSubmit();
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handleFilterChange = (newFilterIds: string[]) => {
        submit({ filterIds: newFilterIds.join(','), term }, { method: 'get' });
    };

    return (
        <div className="" data-oid="vzsoift">
            <FacetFilterDrawer
                results={search.facetValues}
                filterIds={filterIds}
                updateFilterIds={handleFilterChange}
                data-oid="1hdhmcf"
            />

            <div className="grid grid-cols-1 h-[25vh] relative items-end">
                <div className="absolute inset-0 "></div>
                <div className="uppercase font-semibold text-[max(24px,3vw)] leading-[1.1] relative p-8">
                    {collection.name}
                </div>
            </div>

            <div className="relative h-full pt-1 mb-discoPadding" data-oid="c4:aubz">
                <div
                    className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    data-oid="84wdeqv"
                >
                    {search.items.map(
                        ({
                            productName,
                            productId,
                            slug,
                            priceWithTax,
                            currencyCode,
                            productAsset,
                        }) => (
                            // <div
                            //     className="break-inside-avoid object-cover w-full mb-4"
                            //     key={slug}
                            //     data-oid="x-55_m2"
                            // >
                            <ProductLink key={productId} productSlug={slug!} data-oid="1dgt013">
                                <ProductCard
                                    name={productName!}
                                    imageUrl={productAsset?.preview}
                                    price={priceWithTax}
                                    currencyCode={currencyCode}
                                    //   discountedPrice={product.priceData?.formatted?.discountedPrice}
                                    //   ribbon={product.ribbon ?? undefined}
                                    data-oid=".69b_9o"
                                />
                            </ProductLink>
                            //     </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
