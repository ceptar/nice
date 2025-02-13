import * as React from 'react';
import { data, json, LoaderFunctionArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from '@apollo/client';
import { createApolloClient } from '~/src/vendure/apolloClient';
import { QueryClient } from '@tanstack/react-query';
import { GET_COLLECTIONS, GET_COLLECTION_PRODUCTS } from '~/src/vendure/queries/queries';
import { request } from '../../../src/vendure/client';
import type { MetaFunction } from '@remix-run/react';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { FeaturedProductsSection } from '~/src/components/featured-products-section/featured-products-section';
import { LabelWithArrow } from '~/src/components/label-with-arrow/label-with-arrow';
import { BackgroundParallax, FadeIn, FloatIn } from '~/src/components/visual-effects';
import { SearchInput } from '~/src/components/search-input/search-input';

export const loader: LoaderFunction = async ({ request }) => {
    const client = createApolloClient();
    const collections = await client.query({
        query: GET_COLLECTIONS,
        options: { take: 100 },
    });

    const collectionProducts = await client.query({
        query: GET_COLLECTION_PRODUCTS,
        variables: {
            options: {
                collection: { slug: 'sc2-featured-items' },
            },
            skip: 0,
            take: 4,
            slug: 'sc2-featured-items',
        },
    });

    const collectionProductsZwo = await client.query({
        query: GET_COLLECTION_PRODUCTS,
        variables: {
            options: {
                collection: { slug: 'sc1-new-in' },
            },
            skip: 0,
            take: 4,
            slug: 'sc1-new-in',
        },
    });

    return json({ collections, collectionProducts, collectionProductsZwo });
};

export default function HomePage() {
    const { collections } = useLoaderData<typeof loader>();
    const colHomeEins = collections?.data?.collections?.items.find(
        (collection) => collection.slug === 'sc1-new-in',
    );
    const colHomeZwei = collections?.data?.collections?.items.find(
        (collection) => collection.slug === 'ca-beach',
    );
    const colHomeDrei = collections?.data?.collections?.items.find(
        (collection) => collection.slug === 'ca-hot-pink-ocean-berry',
    );
    const { collectionProducts } = useLoaderData<typeof loader>();
    const featuredProducts = collectionProducts?.data?.search?.items;
    console.log('collectionProducts', collectionProducts.data.search.items);

    const { collectionProductsZwo } = useLoaderData<typeof loader>();
    const featuredProductsZwo = collectionProductsZwo?.data?.search?.items;
    console.log('collectionProductsZwo', collectionProductsZwo.data.search.items);

    return (
        <div>
            <div className="heroBanner">
                <div></div>
                <img src="./fthdrg.webp" className="heroBannerImage" alt="" />
                <div className="heroBannerOverlay">
                    <h1 className="heroBannerTitle">Life's</h1>
                    <div className="heroBannerSubtitle">too</div>
                    <h1 className="heroBannerTitle">short</h1>
                    <div className="heroBannerSubtitle">to wear boring</div>
                    <h1 className="heroBannerTitle">jewelry</h1>

                    <CategoryLink categorySlug="all-products">
                        <LabelWithArrow>Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </div>
            </div>

            <div className="textBannerSection">
                <FadeIn className="textBanner" duration={1.8}>
                    <div className="textBannerSubtitle">Products of the highest standards</div>
                    <div className="textBannerTitle">
                        Essential home collections for sustainable living
                    </div>
                    <CategoryLink categorySlug="aa-all-products">
                        <LabelWithArrow>Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </FadeIn>
            </div>

            <div className="cardsSection">
                <CategoryLink categorySlug={colHomeEins?.slug} className="linkCard">
                    <img
                        className="linkCardBackground"
                        src={colHomeEins?.featuredAsset?.preview}
                        alt=""
                    />
                    <div className="linkCardTitle">{colHomeEins?.name}</div>
                </CategoryLink>
                <CategoryLink categorySlug={colHomeZwei?.slug} className="linkCard">
                    <img
                        className="linkCardBackground"
                        src={colHomeZwei?.featuredAsset?.preview}
                        alt=""
                    />
                    <div className="linkCardTitle">{colHomeZwei?.name}</div>
                </CategoryLink>
                <CategoryLink categorySlug={colHomeDrei?.slug} className="linkCard">
                    <img
                        className="linkCardBackground"
                        src={colHomeDrei?.featuredAsset?.preview}
                        alt=""
                    />
                    <div className="linkCardTitle">{colHomeDrei?.name}</div>
                </CategoryLink>
            </div>

            <FeaturedProductsSection
                featuredProducts={featuredProducts}
                className="alternateBackground"
                categorySlug="sc2-featured-items"
                title="Featured Items"
                description="Shine bright like a diamond."
                productCount={4}
            />

            <BackgroundParallax
                className="floatingCardBackground"
                backgroundImageUrl="./heropara.webp"
                parallaxStrength={0.75}
            >
                <FloatIn direction="up" duration={1.2} distance={120}>
                    <div className="floatingCard">
                        <div className="floatingCardHeader">Happy Holidays</div>
                        <div className="floatingCardContent">
                            <h2 className="floatingCardTitle">The holidays best sellers</h2>
                            <div className="floatingCardDescription">
                                Home essentials for
                                <br /> sustainable living
                            </div>
                        </div>
                        <CategoryLink categorySlug="all-products">
                            <LabelWithArrow>Buy a gift</LabelWithArrow>
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
