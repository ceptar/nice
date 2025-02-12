import * as React from 'react';
import { data, json, LoaderFunctionArgs } from '@remix-run/node';
import { gql } from 'graphql-request';
import { useLoaderData } from '@remix-run/react';
import { QueryClient } from '@tanstack/react-query';
import { GET_COLLECTIONS, GET_COLLECTION_PRODUCTS } from '~/src/vendure/queries/queries';
import { request } from '../../../src/vendure/client';
import type { MetaFunction } from '@remix-run/react';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { FeaturedProductsSection } from '~/src/components/featured-products-section/featured-products-section';
import { LabelWithArrow } from '~/src/components/label-with-arrow/label-with-arrow';
import { BackgroundParallax, FadeIn, FloatIn } from '~/src/components/visual-effects';
import { SearchInput } from '~/src/components/search-input/search-input';

export async function loader() {
    const collections = await request(GET_COLLECTIONS, {
        options: { take: 100 },
    });
    const collectionProducts = await request(GET_COLLECTION_PRODUCTS, {
        options: {
            collection: { slug: 'sc2-featured-items' },
        },
        skip: 0,
        take: 100,
        slug: 'sc2-featured-items',
    });

    console.log(collections, collectionProducts);
    return json({ collections, collectionProducts });
}

export default function HomePage() {
    const collections = useLoaderData().collections;
    const products = useLoaderData().collectionProducts;
    const colHomeEins = collections?.collections?.items.find(
        (collection) => collection.slug === 'sc1-new-in',
    );
    const colHomeZwei = collections?.collections?.items.find(
        (collection) => collection.slug === 'ca-beach',
    );
    const colHomeDrei = collections?.collections?.items.find(
        (collection) => collection.slug === 'ca-hot-pink-ocean-berry',
    );

    console.log('colHomeEins', colHomeEins);
    return (
        <div>
            <div className="heroBanner">
                <div>
                    {/* {collections?.collections.items.map((collection, index) => (
                        <div key={index}>
                            <CategoryLink categorySlug={collection.slug}>
                                {collection.name}
                            </CategoryLink>
                        </div>
                    ))} */}
                </div>
                <img
                    src="https://static.wixstatic.com/media/32aab9_2c3c65e142434906992aedb17db53566~mv2.jpg"
                    className="heroBannerImage"
                    alt=""
                />
                <div className="heroBannerOverlay">
                    <div className="heroBannerSubtitle">ReClaim</div>
                    <h1 className="heroBannerTitle">Reuse. Repurpose. Relove.</h1>
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
                className="alternateBackground"
                categorySlug="new-in"
                title="New In"
                description="Embrace a sustainable lifestyle with our newest drop-ins."
                productCount={4}
            />

            <BackgroundParallax
                className="floatingCardBackground"
                backgroundImageUrl="https://static.wixstatic.com/media/c837a6_cae4dbe5a7ee4637b7d55d9bd5bd755d~mv2.png/v1/fill/w_1178,h_974,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/c837a6_cae4dbe5a7ee4637b7d55d9bd5bd755d~mv2.png"
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
                categorySlug="best-sellers"
                title="Best Sellers"
                description="When quality is eco-friendly. Explore our top picks."
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
