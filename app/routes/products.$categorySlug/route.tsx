import * as React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useLoaderData, useSubmit, Form, json } from '@remix-run/react';
import { useRootLoader } from '~/src/vendure/utils/use-root-loader';
import { LoaderFunction } from '@remix-run/node';
import { sdk } from '~/src/vendure/graphqlWrapper';
import type { SearchQuery } from '~/src/vendure/generated/graphql';
import { getCollectionProducts } from '~/src/vendure/providers/products/collectionProducts';
import FacetFilterDrawer from '~/src/components/facet-filter/FacetFilterDrawer';
import { Link } from '@remix-run/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    CarouselDots,
} from '~/src/components/product-grid-carousel/carousel';
import ProductGrid from '~/src/components/product-grid/product-grid-zwo';
import { ProductCard, ProductCardSkeleton } from '~/src/components/product-card/product-card';
import { ProductLink } from '~/src/components/product-link/product-link';

import { Price } from '~/src/components/products/Price';
import { CurrencyCode } from '~/src/vendure/generated/graphql';

export const loader: LoaderFunction = async ({ params, request }) => {
    console.log('collectionSlug', params.categorySlug);
        const categorySlug = params.categorySlug;
    const url = new URL(request.url);
    const term = url.searchParams.get('term') || '';
const filterIds = url.searchParams.get('filterIds')?.split(',').filter(Boolean) || [];
    // Get collection products with all assets
    const { collection } = await sdk.collection({ slug: params.categorySlug });
    console.log('collection', collection);
    const productsData = await getCollectionProducts(
        categorySlug,
        0,
        100,
        {
            facetValueFilters: filterIds.map(id => ({ id, operator: 'AND' }))
        }
    );    console.log('productsData', productsData);

    return json({ 
        collection, 
        search: productsData.search,
        filterIds 
    });
};

export default function ProductsPage() {
    const { collection, search, term, filterIds } = useLoaderData<typeof loader>();
    const submit = useSubmit();
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handleFilterChange = (newFilterIds: string[]) => {
        submit({ filterIds: newFilterIds.join(','), term }, { method: 'get' });
    };

    return (
          <div className="mb-discoPadding" data-oid="vzsoift">
            <div>
                <FacetFilterDrawer
                    results={search.facetValues}
                    filterIds={filterIds}
                    updateFilterIds={handleFilterChange}
                    data-oid="1hdhmcf"
                />
            </div>

            <div className="grid grid-cols-1 h-[40vh] bg-primary relative border-b border-border items-end">
                <div className="absolute inset-0">
                    {collection?.featuredAsset?.source ? (
                        <img
                            src={collection?.featuredAsset?.source}
                            className="object-cover relative h-full w-full opacity-90"
                            alt=""
                            data-oid="-i3pz2e"
                        />
                    ) : null}
                </div>

                <div className="uppercase text-background font-semibold text-[max(24px,3vw)] leading-[1.1] relative p-8">
                    {collection.name}
                </div>
            </div>

            <div className="relative h-full mt-2" data-oid="c4:aubz">
                <ProductGrid featuredProducts={search.items} />
            </div>
        </div>
    );
}