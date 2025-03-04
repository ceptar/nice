import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { useRootLoader } from '~/src/vendure/utils/use-root-loader';
import { getCollectionProducts } from '~/src/vendure/providers/products/collectionProducts';
import type { MetaFunction } from '@remix-run/react';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { FeaturedProductsSection } from '~/src/components/featured-products-section/featured-products-section';
import { LabelWithArrow } from '~/src/components/label-with-arrow/label-with-arrow';
import { BackgroundParallax, FadeIn, FloatIn } from '~/src/components/visual-effects';

export async function loader({ request }: LoaderFunctionArgs) {
    const collectionProducts = await getCollectionProducts('sc2-featured-items', 0, 100);
    const collectionProductsZwo = await getCollectionProducts('sc1-new-in', 0, 100);
    console.log('featuredProducts', collectionProducts);

    return { collectionProducts, collectionProductsZwo };
}

export default function HomePage() {
    const RootLoaderData = useRootLoader();
    const colHomeEins = RootLoaderData.collections?.find(
        (collection: { slug: string }) => collection.slug === 'sc1-new-in',
    );
    const colHomeZwei = RootLoaderData.collections?.find(
        (collection: { slug: string }) => collection.slug === 'ca-beach',
    );
    const colHomeDrei = RootLoaderData.collections?.find(
        (collection: { slug: string }) => collection.slug === 'ca-hot-pink-ocean-berry',
    );
    const { collectionProducts } = useLoaderData<typeof loader>();
    const featuredProducts = collectionProducts?.search?.items;
    const { collectionProductsZwo } = useLoaderData<typeof loader>();
    const featuredProductsZwo = collectionProductsZwo?.search?.items;

    return (
        <div data-oid="245gf6u">
            <div className="heroBannerImageFrame" data-oid="418uqe9">
                <img src="./fthdrg.webp" className="heroBannerImage" alt="" data-oid="-i3pz2e" />
            </div>
            <div className="heroBanner" data-oid="ybswhrl">
                <div className="heroBannerOverlay" data-oid="ud1mqmo">
                    <h1 className="heroBannerTitle" data-oid="m.ih20:">
                        Life's
                    </h1>
                    <div className="heroBannerSubtitle" data-oid="tsyiit3">
                        too
                    </div>
                    <h1 className="heroBannerTitle" data-oid="ugmflb1">
                        short
                    </h1>
                    <div className="heroBannerSubtitle" data-oid="p.oaymc">
                        to wear boring
                    </div>
                    <h1 className="heroBannerTitle" data-oid="xoe18hh">
                        jewelry
                    </h1>

                    <CategoryLink categorySlug="aa-all" data-oid="einwjr0">
                        <LabelWithArrow data-oid="_ns2d22">Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </div>
            </div>

            <div className="textBannerSection" data-oid="hqay.qu">
                <FadeIn className="textBanner" duration={1.8} data-oid="q6k4z92">
                    <div className="textBannerSubtitle" data-oid="c:z:zej">
                        Products of the highest standards
                    </div>
                    <div className="textBannerTitle" data-oid="xq_xyhz">
                        Essential home collections for sustainable living
                    </div>
                    <CategoryLink categorySlug="aa-all-products" data-oid="8gzudre">
                        <LabelWithArrow data-oid="4fjs1_:">Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </FadeIn>
            </div>

            <div className="cardsSection" data-oid="fvh5j5t">
                <CategoryLink
                    categorySlug={colHomeEins?.slug ?? ''}
                    className="linkCard"
                    data-oid="p9mvl11"
                >
                    <img
                        className="linkCardBackground"
                        src={colHomeEins?.featuredAsset?.preview}
                        alt=""
                        data-oid="qfu:e5t"
                    />

                    <div className="linkCardTitle" data-oid="qkta38q">
                        {colHomeEins?.name}
                    </div>
                </CategoryLink>
                <CategoryLink
                    categorySlug={colHomeZwei?.slug ?? ''}
                    className="linkCard"
                    data-oid="t_wzukz"
                >
                    <img
                        className="linkCardBackground"
                        src={colHomeZwei?.featuredAsset?.preview}
                        alt=""
                        data-oid="x:zx4zg"
                    />

                    <div className="linkCardTitle" data-oid="51o.0ft">
                        {colHomeZwei?.name}
                    </div>
                </CategoryLink>
                <CategoryLink
                    categorySlug={colHomeDrei?.slug ?? ''}
                    className="linkCard"
                    data-oid="yx.d49n"
                >
                    <img
                        className="linkCardBackground"
                        src={colHomeDrei?.featuredAsset?.preview}
                        alt=""
                        data-oid="zt3f1f-"
                    />

                    <div className="linkCardTitle" data-oid="gbtqo6f">
                        {colHomeDrei?.name}
                    </div>
                </CategoryLink>
            </div>

            <FeaturedProductsSection
                featuredProducts={featuredProducts}
                className="alternateBackground"
                categorySlug="sc2-featured-items"
                title="Featured Items"
                description="Shine bright like a diamond."
                productCount={4}
                data-oid="2v2ssua"
            />

            <BackgroundParallax
                className="floatingCardBackground"
                backgroundImageUrl="./heropara.webp"
                parallaxStrength={1}
                data-oid="r6:6fdc"
            >
                <FloatIn direction="up" duration={1.2} distance={120} data-oid="792li00">
                    <div className="floatingCard" data-oid="1wfaej8">
                        <div className="floatingCardHeader" data-oid="ot7ky.y">
                            Happy Holidays
                        </div>
                        <div className="floatingCardContent" data-oid="c59ipfl">
                            <h2 className="floatingCardTitle" data-oid="tpwjw5-">
                                The holidays best sellers
                            </h2>
                            <div className="floatingCardDescription" data-oid="uprv8vb">
                                Home essentials for
                                <br data-oid="8onz70l" /> sustainable living
                            </div>
                        </div>
                        <CategoryLink categorySlug="all-products" data-oid="6_bckur">
                            <LabelWithArrow data-oid="fo-n4o2">Buy a gift</LabelWithArrow>
                        </CategoryLink>
                    </div>
                </FloatIn>
            </BackgroundParallax>

            <FeaturedProductsSection
                featuredProducts={featuredProductsZwo}
                categorySlug="sc1-new-in"
                title="New In"
                description="Are You an explorer?"
                productCount={4}
                data-oid="933ppe_"
            />
        </div>
    );
}

export const meta: MetaFunction = () => {
    const title = 'ReClaim: Home Goods Store';
    const description = 'Essential home products for sustainable living';

    return [
        { title },
        {
            name: 'description',
            content: description,
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            property: 'og:image',
            content: '/social-media-image.jpg',
        },
    ];
};
