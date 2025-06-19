import React from 'react';
import { ProductCard, ProductCardSkeleton } from '~/src/components/product-card/product-card';
import { ProductLink } from '~/src/components/product-link/product-link';

export interface FeaturedProductsGridProps {
    featuredProducts?: Array<{
        productId: string;
        slug: string;
        productName: string;
        productAsset?: { preview: string };
        priceWithTax: number;
        currencyCode: string;
    }>;
    productCount?: number;
    className?: string;
}

export const FeaturedProductsGrid: React.FC<FeaturedProductsGridProps> = ({
    featuredProducts,
    productCount,
    className,
}) => {

    const productsToShow = featuredProducts
  ? featuredProducts.slice(0, productCount)
  : [];

    return (
    <div
        className={`grid grid-cols-2 gap-8 w-full px-8  ${
            productCount === 4
                ? 'md:grid-cols-4'
                : productCount === 6
                ? 'md:grid-cols-3'
                : 'md:grid-cols-2'
        } ${className || ''}`}
    >
 {productsToShow.length > 0
      ? productsToShow.map((product) => (
                      <ProductLink
                          key={product.productId}
                          productSlug={product.slug!}
                          data-oid="1dgt013"
                      >
                          <ProductCard
                              name={product.productName!}
                              imageUrl={product.productAsset?.preview}
                              price={product.priceWithTax}
                              currencyCode={product.currencyCode}
                              data-oid=".69b_9o"
                          />
                      </ProductLink>
                  ))
      : null}
    {Array.from({ length: Math.max(0, productCount - productsToShow.length) }).map((_, i) => (
      <ProductCardSkeleton key={`skeleton-${i}`} data-oid="j0t6w98" />
    ))}
        </div>
    );
};
