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
        <div className="" data-oid="vzsoift">
            <div>
        <FacetFilterDrawer
          results={search.facetValues}
          filterIds={currentFilterIds}
          updateFilterIds={handleFilterChange}
        />
            </div>
             {/* <div className={`relative ${isLoading ? 'opacity-50' : ''}`}></div> */}
            <div className=" flex flex-col w-full h-[50vh] bg-[var(--ui1)] relative justify-end">
                    {collection?.featuredAsset?.preview ? (
                        <img
                            src={collection?.featuredAsset?.preview}
                            className="object-cover object-center flex relative h-full w-full opacity-90"
                            alt=""
                            data-oid="-i3pz2e"
                        />
                    ) : null}

                <div className="absolute left-0 bottom-0 uppercase text-background font-semibold text-[max(24px,3vw)] leading-[1.1] p-5">
                    {collection.name}
                </div>
            </div>

            <div className="relative h-full my-discoPadding" data-oid="c4:aubz">
<div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full p-5">
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
                      className="object-cover  rounded-t-lg   w-full h-full"
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
          
          <Link
            to={`/products/${product.slug}`}
            className=" bg-white text-foreground"
          >
                        <div className="grid grid-cols-2 py-4 text-foreground w-full px-2 border-x-[1px] border-b-[1px] border-border/0.5 rounded-b-lg" data-oid="2g7b.xk">
                <div className="col-span-1  text-sm font-medium">
<Price
                                      priceWithTax={product.priceWithTax}
                                      currencyCode={product.currencyCode as CurrencyCode}
                                      data-oid="v5g2m6:"
                                  />
                </div>
                                <div className="col-span-1  text-right text-sm font-medium">{product.category}</div>

                <div className="col-span-2 pt-0.5 text-foreground w-full overflow-hidden break-words text-sm uppercase">
            {product.productName}
              </div>
                </div>
          </Link>
                 </div>
      
        
      ))}
    </div>            </div>
    </div>
       
    );
}