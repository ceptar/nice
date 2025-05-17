import { LoaderFunctionArgs, data } from '@remix-run/node';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { useRootLoader } from '~/src/vendure/utils/use-root-loader';
import { getCollectionProducts } from '~/src/vendure/providers/products/collectionProducts';

import type { MetaFunction } from '@remix-run/react';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { FeaturedProductsSection } from '~/src/components/featured-products-section/featured-products-section';
import { LabelWithArrow } from '~/src/components/label-with-arrow/label-with-arrow';
import { BackgroundParallax, FadeIn, FloatIn } from '~/src/components/visual-effects';
import { Button } from '~/src/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '~/src/components/ui/carousel';
import { ProductLink } from '~/src/components/product-link/product-link';
import { ProductCard } from '~/src/components/product-card/product-card';
import { Price } from '~/src/components/products/Price';
import { search } from '~/src/vendure/providers/products/products';

// Add these interfaces at the top of the file
interface Collection {
    id: string;
    slug: string;
    name: string;
    featuredAsset?: {
        source: string;
    };
    customFields?: {
        featuredNr?: number;
    };
}

interface FeaturedCollection {
    collection: Collection;
    products: Array<{
        productId: string;
        slug: string;
        productName: string;
        productAsset?: {
            preview: string;
        };
        priceWithTax: number;
        currencyCode: string;
    }>;
}

export async function loader({ request }: LoaderFunctionArgs) {
    // const { featuredCollections } = useRootLoader();
    // if (!featuredCollections?.length) {
    //     throw new Response('No featured collections found', { status: 404 });
    // }
    // const featuredCollectionsWithProducts = await Promise.all(
    //     featuredCollections.map(async (collection) => {
    //         const productsData = await getCollectionProducts(collection.slug, 0, 10); // adjust take if needed

    //         return {
    //             collection,
    //             products: productsData.search.items,
    //         };
    //     }),
    // );
    // const featuredCollectionEins = collections.find(
    //     (c) => c.customFields?.featureNr === 1
    //   );
    //   const featuredSlugEins = featuredCollectionEins?.slug ?? null;

    const collectionProducts = await getCollectionProducts('sc2-featured-items', 0, 100);
    const collectionProductsZwo = await getCollectionProducts('sc1-new-in', 0, 100);
    console.log('collectionProducts', collectionProducts);

    return { collectionProducts, collectionProductsZwo };
}

export default function HomePage() {
    const RootLoaderData = useRootLoader();
    const featuredProductsData = RootLoaderData.featuredProductsData;
    console.log('featuredProductsData', featuredProductsData);

    const featuredCollectionEins = featuredProductsData.filter(
        (item) => item.collection.customFields && item.collection.customFields.featuredNr === 1,
    );
    // .sort((a, b) => (a.item.collection.customFields.sortNr || 0) - (b.item.collection.customFields.sortNr || 0));

    console.log('featuredCollectionEins', featuredCollectionEins);

    const featuredCollectionZwei = featuredProductsData.find(
        (item) => item.collection.customFields && item.collection.customFields.featuredNr === 1,
    );

    console.log('featuredCollectionZwei', featuredCollectionZwei);

    // const featuredCollectionsAll = RootLoaderData.collections
    //     .filter((c) => c.customFields?.featuredCollection === true)
    //     .sort((a, b) => (a.customFields?.featuredNr || 0) - (b.customFields?.featuredNr || 0));

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

    // const featuredAll = RootLoaderData.featuredCollectionsWithProducts;
    // const featuredCollectionEins = featuredAll.collection.find(
    //    (c) => c.customFields?.featuredNr === 1,
    // );

    return (
        <div className="mt-[75px]" data-oid="245gf6u">
            <div className="heroBannerImageFrame" data-oid="418uqe9">
                <img src="./bg1.webp" className="heroBannerImage" alt="" data-oid="-i3pz2e" />
                
                 {/* Video overlay on top of image */}
                 <FadeIn viewportMargin='-20%' duration={1.8} className="fixed -left-10 -top-20 right-0 bottom-0">
    <video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  crossOrigin="anonymous"
  className="heroBannerVideoOverlay"

    >
      <source src="./disco1.webm" type="video/webm" />
    </video>
   </FadeIn>
            </div>
            <div className="heroBanner" data-oid="ybswhrl">
                <div className="p-2">
                    <div className="heroBannerOverlay" data-oid="ud1mqmo">

                        <div className="">
                            <div className="textBannerSubtitle" data-oid="tsyiit3">
                                Life's too short
                            </div>

                            <div className="textBannerTitle" data-oid="xoe18hh">
                                to wear boring Jewelry
                            </div>
                        </div>
                        <CategoryLink
                            className="mt-4 my-16"
                            categorySlug="aa-all"
                            data-oid="einwjr0"
                        >
                            <Button variant="secondary" data-oid="_ns2d22">
                                Shop All
                            </Button>
                        </CategoryLink>
                    </div>
                </div>
            </div>

            <div className="mb-[-4px] mt-[88px]">
                {featuredCollectionEins.map(({ collection, products }) => (
                    <div key={collection?.id} className="py-[8px] mt-10">
                        <FadeIn className="flex flex-row w-full mb-[calc(var(--discoPadding)/2)]" duration={1.8}>
                            <div
                                className="textBannerSubtitle text-center  pl-8 pr-2"
                                data-oid="qt.p1oe"
                            >
                                Collection No. {collection?.customFields?.sortNr}
                            </div>
                            <h3 className="textBannerTitle" data-oid=":.e:sv6">
                                {collection?.name}
                            </h3>
                        </FadeIn>
                        <div className="relative flex items-center flex-col w-full">
                            <div className="w-full px-8">
                                                                    <div className="pointer-events-none absolute left-0  top-8  right-0">
                                        <div className="text-background/20 relative uppercase pl-6 font-light text-[calc(32px+3vw+3vh)] leading-[1] z-[1] mix-blend-hard-light overflow-hidden">
                                            {collection.name}
                                        </div>
                                    </div>
                                {/* <div className=" text-[60px] leading-1.1 font-[300]" data-oid="xoe18hh">
                                    {collection?.customFields?.sortNr}
                                </div> */}
                            </div>
                            {/* <div className="pointer-events-none absolute left-0  top-4  right-0">

                          <div className="text-background/20 absolute left-0 uppercase pl-2 font-light text-[max(125px,4vw)] leading-[0.8] z-[1] mix-blend-hard-light overflow-hidden">
                                    {collection.name}
                                </div>
                            </div> */}
                            <div className="w-full">
                                <div className="md:hidden relative flex w-full bg-foreground aspect-[4/5] md:aspect-[5/8]">
                                    <img
                                        src={collection?.featuredAsset?.source}
                                        className=" object-cover w-full opacity-90"
                                        alt=""
                                        data-oid="-i3pz2e"
                                    />


                                    <div className="heroBannerOverlay">
                                        <div className="w-full h-full flex-col  justify-start items-end flex">
                                            <div
                                                className="relative flex w-full text-white text-center"
                                                data-oid="xoe18hh"
                                            >
                                                <div
                                                    className="textBannerSubtitle pr-2"
                                                    data-oid="c:z:zej"
                                                >
                                                    {/* Collection */}
                                                </div>
                                                <div className="textBannerTitle">
                                                    <div className="relative w-full text-white ">
                                                        {/* {collection?.name} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full h-full flex-col  justify-end items-center flex">
                                            <CategoryLink
                                                className="my-2 justify-center"
                                                categorySlug={collection.slug}
                                                data-oid="einwjr0"
                                            >
                                                <Button variant="secondary" data-oid="_ns2d22">
                                                    Shop Collection
                                                </Button>
                                            </CategoryLink>
                                        </div>
                                        <div className="textBannerTitle" data-oid="xoe18hh"></div>
                                    </div>
                                </div>
                                <Carousel
                                    opts={{ align: 'start' }}
                                    className="w-full"
                                    positionArrows="above"
                                >
                                    <CarouselContent className="-ml-[4px]">
                                        {/* First item: CategoryLink (only visible on lg and up) */}

                                        <CarouselItem className="hidden md:block md:basis-[35%] pl-0">
                                            <div className="flex flex-col w-full h-full">
                                                <div className="relative flex w-full h-full bg-foreground">
                                                    <img
                                                        src={collection?.featuredAsset?.source}
                                                        className=" object-cover w-full opacity-90"
                                                        alt=""
                                                        data-oid="-i3pz2e"
                                                    />
                                    {/* <div className="pointer-events-none absolute left-0 top-4  right-0">
                                        <div className="text-background/20 absolute left-0 top-4 pl-6  uppercase font-light text-[max(84px,4vw)] leading-[0.8] z-[1] mix-blend-hard-light overflow-hidden">
                                            {collection.name}
                                        </div>
                                    </div> */}
                                                    <div className="heroBannerOverlay pb-1">
                                                        <div className="pl-8 w-full h-full items-end grid grid-cols-1">
                                                            <div
                                                                className="relative col-span-1 text-white"
                                                                data-oid="xoe18hh"
                                                            >
                                                               
                                                                <div className="text-white mr-1">
                                                                    {/* <CategoryLink
                                                                        className="text-[12px]"
                                                                        categorySlug={
                                                                            collection?.slug
                                                                        }
                                                                        data-oid="einwjr0"
                                                                    >
                                                                        <LabelWithArrow className="pb-1">
                                                                            Shop Collection
                                                                        </LabelWithArrow>
                                                                    </CategoryLink> */}
                                                                </div>
                                                            </div>
                                                        </div>
<div className="w-full h-full flex-col  justify-end items-center flex">
                                            <CategoryLink
                                                className="my-2 justify-center"
                                                categorySlug={collection.slug}
                                                data-oid="einwjr0"
                                            >
                                                <Button variant="secondary" data-oid="_ns2d22">
                                                    Shop Collection
                                                </Button>
                                            </CategoryLink>
                                        </div>
                                                        <div
                                                            className="textBannerTitle"
                                                            data-oid="xoe18hh"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>

                                        {/* Rest of the carousel items: Products */}
                                        {products?.map(
                                            (product: {
                                                productId: string;
                                                slug: string;
                                                productName: string;
                                                productAsset?: {
                                                    preview: string;
                                                };
                                                priceWithTax: number;
                                                currencyCode: string;
                                            }) => (
                                                <CarouselItem
                                                    key={product.productId}
                                                    className="basis-[42%] md:basis-[28%] pl-[4px]"
                                                >
                                                    <ProductLink
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
                                                </CarouselItem>
                                            ),
                                        )}
                                    </CarouselContent>
                                    <div className="flex justify-self-end gap-1 pr-6 ">
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <FeaturedProductsSection
                featuredProducts={featuredProducts}
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
                        <CategoryLink categorySlug="aa-all" data-oid="6_bckur">
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
    const title = 'DiscoBabes';
    const description = 'Expressive Colors and Unique Shapes for All DiscoBabes!';

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
