import React from 'react';
import type { SearchQuery } from '~/src/vendure/generated/graphql';
import { Price } from '~/src/components/products/Price';
import { CurrencyCode } from '~/src/vendure/generated/graphql';

import { Link } from '@remix-run/react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from '~/src/components/product-grid-carousel/carousel';

export default function ProductGrid({ featuredProducts: products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
      {products.map((product, index) => (
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
    </div>
  );
}
