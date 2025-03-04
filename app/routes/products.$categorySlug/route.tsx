import * as React from 'react';
import { useLoaderData, useSubmit, Form } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import { sdk } from '~/src/vendure/graphqlWrapper';
import FacetFilterDrawer from '~/src/components/facet-filter/FacetFilterDrawer';
import { Link } from '@remix-run/react';
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
        <div className="w-full mt-[112px]" data-oid="wjv3av1">
            <div className="" data-oid="vzsoift">
                <FacetFilterDrawer
                    results={search.facetValues}
                    filterIds={filterIds}
                    updateFilterIds={handleFilterChange}
                    data-oid="1hdhmcf"
                />
            </div>

            <div
                className="py-8 relative h-[5rem] z-20 flex justify-start items-center mr-auto ml-auto w-full"
                data-oid="xc4.0gw"
            >
                <h2
                    id="category-heading"
                    className="items-center justify-start flex leading-10"
                    data-oid="moeqbj2"
                >
                    <span className="text-[calc(1.5vw+2.5vh)]" data-oid="q6f1d34">
                        {collection.name}
                    </span>
                </h2>
            </div>

            <div className="relative h-full my-4 py-4" data-oid="c4:aubz">
                <div
                    className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    data-oid="84wdeqv"
                >
                    {search.items.map(
                        ({ productName, slug, priceWithTax, currencyCode, productAsset }) => (
                            <div
                                className="break-inside-avoid object-cover w-full mb-4"
                                key={slug}
                                data-oid="x-55_m2"
                            >
                                <Link
                                    to={`/product-details/${slug}`}
                                    prefetch="intent"
                                    data-oid="bmfxszz"
                                >
                                    <img
                                        className="object-cover aspect-[5/8]"
                                        alt={productName}
                                        src={productAsset?.preview + '?w=full'}
                                        data-oid="5fn_4i:"
                                    ></img>
                                    <div
                                        className="relative w-full mx-auto bottom-0 left-0"
                                        data-oid="2tzao8a"
                                    >
                                        <div
                                            className="text-center bg-neutral-800 absolute bottom-0 left-0 w-fit h-fit text-white p-1 "
                                            data-oid="abcysf6"
                                        >
                                            <Price
                                                priceWithTax={priceWithTax}
                                                currencyCode={currencyCode as CurrencyCode}
                                                data-oid="0jc.4_o"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="py-2 pl-1 whitespace-nowrap overflow-hidden"
                                        data-oid="5p-o.9x"
                                    >
                                        {productName}
                                    </div>
                                </Link>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
