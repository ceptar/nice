import { ProductLink } from '~/src/components/product-link/product-link';
import { Price } from '~/src/components/products/Price';
import { CurrencyCode } from '~/src/vendure/generated/graphql';

interface Price {
  priceWithTax: number;
  currencyCode: string;
}

interface Product {
  productId: string;
  slug: string;
  productName: string;
  productAsset?: {
    preview: string;
  };
  category?: string;
    priceWithTax: number;
  currencyCode: string;
}

interface UnsplashGridProps {
  products: Product[];
}

export const UnsplashGrid = ({ products }: UnsplashGridProps) => {
  // Helper function to create product image element
  const ProductElement = ({ product, className = "" }: { product: Product; className?: string }) => (
    <ProductLink key={product.productId} productSlug={product.slug}>
      <div className={`relative group overflow-hidden rounded-lg h-full ${className}`}>
        <img
          src={product.productAsset?.preview}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white  bg-foreground/60">
          <h3 className="text-sm uppercase">{product.productName}</h3>
<div className="font-medium text-sm">
                    <Price
                        priceWithTax={product.priceWithTax}
                        currencyCode={product.currencyCode as CurrencyCode}
                        data-oid="v5g2m6:"
                    />
                    </div>
        </div>
      </div>
    </ProductLink>
  );

  // Create groups of 4 products
  const productGroups = products.reduce<Product[][]>((acc, product, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(product);
    return acc;
  }, []);

  return (
    <div className="mx-auto p-4">
      {productGroups.map((group, groupIndex) => (
        <div 
          key={groupIndex}
          className="grid grid-cols-2 gap-2 auto-rows-[minmax(100px,auto)] mb-8"
        >
          {/* First product - large */}
          {group[0] && (
            <div className="md:row-span-2 w-full h-auto">
              <ProductElement product={group[0]} className="min-h-[200px]" />
            </div>
          )}

          {/* Second and third products - medium */}
          <div className="flex flex-wrap md:flex-nowrap gap-2">
            {group[1] && <ProductElement product={group[1]} className="flex-1 min-h-[100px]" />}
            {group[2] && <ProductElement product={group[2]} className="flex-1 min-h-[100px]" />}
          </div>

          {/* Fourth product - wide */}
          {group[3] && (
            <div className="col-span-2 md:col-auto">
              <ProductElement product={group[3]} className="min-h-[150px]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UnsplashGrid;