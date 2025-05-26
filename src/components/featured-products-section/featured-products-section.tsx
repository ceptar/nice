import classNames from 'classnames';
import { ProductCard, ProductCardSkeleton } from '~/src/components/product-card/product-card';
import { ProductLink } from '~/src/components/product-link/product-link';
import { FadeIn, Reveal } from '~/src/components/visual-effects';
import styles from './featured-products-section.module.scss';

interface FeaturedProductsSectionProps {
    featuredProducts?: any[];
    categorySlug: string;
    title?: string;
    description?: JSX.Element | string;
    productCount?: number;
    className?: string;
}

export const FeaturedProductsSection = (props: FeaturedProductsSectionProps) => {
    const {
        featuredProducts,
        title,
        description,
        productCount = 4,
        categorySlug,
        className,
    } = props;
    // const { data: category } = useCategoryDetails(categorySlug);
    // const { data: products } = useProducts({ categorySlug, limit: productCount });

    return (
        <div className="pt-discoPadding" data-oid="esyne6h">
            <FadeIn className="mb-[calc(var(--discoPadding)/2)]"  duration={1.8} data-oid="f92np_p">
                <div className="grid grid-cols-2 gap-0 w-full">
                                    <div className="col-span-1 justify-end">

                <h3 className="textBannerTitle pl-8 text-right" data-oid=":.e:sv6">
                    {title}
                </h3>
 </div>
                            </div>
                <div className="textBannerSubtitle text-center" data-oid="qt.p1oe">
                    {description}
                </div>
            </FadeIn>
            <Reveal className={styles.products} direction="down" duration={1.4} data-oid="u.2ltl4">
                {featuredProducts
                    ? featuredProducts.map((product) => (
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
                                  //   discountedPrice={product.priceData?.formatted?.discountedPrice}
                                  //   ribbon={product.ribbon ?? undefined}
                                  data-oid=".69b_9o"

                              />
                          </ProductLink>
                      ))
                    : Array.from({ length: productCount }).map((_, i) => (
                          <ProductCardSkeleton key={i} data-oid="j0t6w98" />
                      ))}
            </Reveal>
        </div>
    );
};
