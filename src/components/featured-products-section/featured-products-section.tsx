import { FadeIn, Reveal } from '~/src/components/visual-effects';
import { FeaturedProductsGrid } from '~/src/components/featured-products-grid/featured-products-grid';

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
        productCount,
        categorySlug,
        className,
    } = props;

    return (
        <div className="pt-discoPadding" data-oid="esyne6h">
            <FadeIn className="mb-[calc(var(--discoPadding)/2)]" duration={1.8} data-oid="f92np_p">
                <div className="grid grid-cols-2 items-center gap-5 w-full mb-0">
                    <div className="col-span-1">
                        <h3 className="textBannerTitle pl-5 text-[calc(1.5vw+2.5vh)]" data-oid=":.e:sv6">
                            {title}
                        </h3>
                    </div>
                    <div
                        className="text-[max(15px,1.45vw)] whitespace-nowrap content-end text-right col-span-1 pr-5 w-5/6 text-[20px]"
                        data-oid="qt.p1oe"
                    >
                        {description}
                    </div>
                </div>
            </FadeIn>
            <Reveal direction="down" duration={1.4} data-oid="u.2ltl4">
                <FeaturedProductsGrid
                    featuredProducts={featuredProducts}
                    productCount={productCount}
                />
            </Reveal>
        </div>
    );
};