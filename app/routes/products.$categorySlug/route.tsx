import * as React from 'react';
import { useState } from 'react';
import { useLoaderData, useSubmit, useNavigation, json } from '@remix-run/react';
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts';
import { LoaderFunction } from '@remix-run/node';
import { sdk } from '~/src/vendure/graphqlWrapper';
import { getCollectionProducts } from '~/src/vendure/providers/products/collectionProducts';
import FacetFilterDrawer from '~/src/components/facet-filter/FacetFilterDrawer';
import type { SearchQuery } from '~/src/vendure/generated/graphql';
import { Price } from '~/src/components/products/Price';
import { CurrencyCode } from '~/src/vendure/generated/graphql';
import { Link } from '@remix-run/react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from '~/src/components/product-grid-carousel/carousel';

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const filterIds = url.searchParams.get('filterIds')?.split(',').filter(Boolean) || [];

  // Ensure categorySlug is defined
  if (!params.categorySlug) {
    throw new Response("Category slug is required", { status: 400 });
  }

  // Fetch data in parallel
  const productsData = await getCollectionProducts({
        slug: params.categorySlug,
        facetValueFilters: filterIds.map(id => ({ and: id })),
        take: 100,
        skip: 0, 
      });

  return {
    collection: productsData.collection,
    products: productsData,
    search: productsData.search,
    filterIds
  };
  
  // {
  //   headers: {
  //     'Cache-Control': 'public, max-age=300' // Add caching
  //   }

 // });
};
export default function ProductsPage() {
  const { collection, products, search, filterIds } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  // Use debounced value for filterIds
  const [currentFilterIds, setCurrentFilterIds] = useState(filterIds || []);
  const [debouncedFilterIds] = useDebounceValue(currentFilterIds, 300);

  // Use debounced callback for filter changes
  const handleFilterChange = useDebounceCallback(
    (newFilterIds: string[]) => {
      setCurrentFilterIds(newFilterIds);
      submit(
        { filterIds: newFilterIds.join(',')},
        { method: 'get' }
      );
    },
    300
  );

    return (
        <div className="mb-discoPadding" data-oid="vzsoift">
            <div>
        <FacetFilterDrawer
          results={search.facetValues}
          filterIds={currentFilterIds}
          updateFilterIds={handleFilterChange}
        />
            </div>
             {/* <div className={`relative ${isLoading ? 'opacity-50' : ''}`}></div> */}
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
<div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
      {products.search?.items?.map((product, index) => (
        <div key={product.productId} className="w-full">
          <Carousel className="w-full rounded-none">
            <CarouselContent>
              {product.assets.map((asset, assetIndex) => (
                <CarouselItem key={`${product.productId}-${assetIndex}`}>
                  <div className="relative aspect-[4/6] w-full">
                    <Link to={`/product-details/${product.slug}`} prefetch="intent">
                    <img
                      src={asset.preview}
                      referrerPolicy="no-referrer-when-downgrade" // This is a workaround for a bug in Remix
                      crossOrigin="anonymous"
                      alt={`${product.productName} - Image ${assetIndex + 1}`}
                      className="object-cover w-full h-full"
                    />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute w-full bottom-0 justify-evenly">
              <div className="flex flex-col"></div>
            <CarouselDots />
            <div className="flex flex-col"></div>
            </div>
          </Carousel>
          
                      <div className="flex flex-col p-1 text-foreground h-fit w-full bg-white">
          <Link
            to={`/products/${product.slug}`}
            className=" bg-white text-foreground"
          >
            <div className="overflow-hidden break-words text-xs font-semibold uppercase">
            {product.productName}
              </div>
                              <div className="flex flex-row  w-full h-full text-sm uppercase font-regular">
                                  <Price
                                      priceWithTax={product.priceWithTax}
                                      currencyCode={product.currencyCode as CurrencyCode}
                                      data-oid="v5g2m6:"
                                  />
                              </div>
          </Link>
                 </div>
        </div>
      ))}
    </div>            </div>
        </div>
    );
}