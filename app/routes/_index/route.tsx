import { LoaderFunctionArgs, data } from '@remix-run/node';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { useRootLoader } from '~/src/vendure/utils/use-root-loader';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
import FramerCarousel from '~/src/components/framer-carousel/framer-carousel';
import { ParallaxCarousel } from '~/src/components/parallax-carousel/parallax-carousel';
// import { ParallaxSlider } from '~/src/components/parallax-slider/parallax-slider';

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
        category?: string;
    }>;
}

export async function loader({ request }: LoaderFunctionArgs) {
    try {
        // Pass an object with the required parameters
        const collectionProducts = await getCollectionProducts({
            slug: 'sc2-featured-items',
            skip: 0,
            take: 100,
        });

        const collectionProductsZwo = await getCollectionProducts({
            slug: 'sc1-new-in',
            skip: 0,
            take: 100,
        });

        return { collectionProducts, collectionProductsZwo };
    } catch (error) {
        console.error('Index loader error:', error);
        throw new Response('Error loading collections', { status: 500 });
    }
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
        <div className="" data-oid="245gf6u">
            <div className="heroBannerImageFrame" data-oid="418uqe9">
                <img
                    src="./bg1.webp"
                    className="aspect-square w-full h-full  object-cover object-center opacity-100"
                    alt=""
                    data-oid="-i3pz2e"
                />
                {/* <FadeIn
                    viewportMargin=""
                    duration={4}
                   className="absolute left-[20px] top-[-50px] aspect-square  flex w-[165px]"
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        crossOrigin="anonymous"
                        className="relative flex w-full h-full aspect-square object-cover object-center opacity-100"
                    >
                        <source src="./disco9.mov" type="video/mp4" />
                    </video>
                </FadeIn> */}
            </div>
            <div className="h-[100vh] relative" data-oid="ybswhrl">
                <div
                    className="absolute flex flex-col h-fit left-20 right-20 overflow-hidden items-start bottom-20  text-background"
                    data-oid="ud1mqmo"
                >
                                                 <div
                        className="absolute left-0 top-0 w-fit h-fit flex flex-col  p-4 bg-white/50 rounded-lg  mix-blend-screen"
                        data-oid="1wfaej8"
                    >
                        <div className="relative flex flex-col w-fit h-fit " data-oid="ot7ky.y">
                            <div className="heading3 text-foreground col-span-1" data-oid="tsyiit3">
                                Life's too short
                            </div>
                            <div
                                className="heading3  text-foreground col-span-1"
                                data-oid="xoe18hh"
                            >
                                to wear boring Jewelry
                            </div>

                            <div className="mt-4 col-span-1 items-center flex">
                                <Button
                                    asChild
                                    variant="secondary"
                                    className="text-foreground border-foreground"
                                    data-oid="_ns2d22"
                                >
                                    <a href="/products/col-all">Shop All</a>
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                    <div
                        className="relative flex flex-col w-fit h-fit p-4 bg-white/50 rounded-lg backdrop-blur-sm  mix-blend-exclusion"
                        data-oid="1wfaej8"
                    >

                        <div className="relative flex flex-col w-fit h-fit " data-oid="ot7ky.y">
                            <div className="heading3  text-foreground col-span-1" data-oid="tsyiit3">
                                Life's too short
                            </div>
                            <div
                                className="heading3  text-foreground col-span-1"
                                data-oid="xoe18hh"
                            >
                                to wear boring Jewelry
                            </div>

                            <div className="mt-4 col-span-1 items-center flex">
                                <Button
                                    asChild
                                    variant="secondary"
                                    className="text-foreground border-foreground"
                                    data-oid="_ns2d22"
                                >
                                    <a href="/products/col-all">Shop All</a>
                                </Button>
                            </div>
                        </div>
                                       
                    </div>

                </div>
            </div>

            {/* <div className="w-full min-h-screen my-[calc(discoPadding*2)]">
        <ParallaxSlider
        collections={featuredCollectionEins} 
       /> 
      </div>
*/}
            <div className="mb-[-4px] ">
                {featuredCollectionEins.map(({ collection, products }) => (
                    <div key={collection?.id} className="mt-discoPadding">
                        <FadeIn
                            className=""
                            duration={1.8}
                            data-oid="f92np_p"
                        >
                            <div className="grid grid-cols-2 gap-0 w-full mb-[calc(var(--discoPadding)/4)] ">
                                <div className="col-span-1">
                                    <h3 className="textBannerTitle pl-5" data-oid=":.e:sv6">
                                        {collection?.name}
                                    </h3>
                                </div>
                                <div
                                    className="text-[max(15px,1.45vw)] whitespace-nowrap content-end text-right col-span-1 pr-5"
                                    data-oid="qt.p1oe"
                                >
                                    Collection No. {collection?.customFields?.sortNr}
                                </div>
                            </div>
                        
                        <div className="relative flex items-center flex-col w-full px-5 ">
                            <div className="w-full">
                                {/* <div className="pointer-events-none absolute left-0 bottom-13 right-0">
                                        <div className="text-background/20 relative uppercase font-light text-[calc(18px+1vw+1vh)] leading-[1] z-[1] mix-blend-hard-light overflow-hidden">
                                            {collection.name}
                                        </div>
                                    </div> */}
                                {/* <div className=" text-[60px] leading-1.1 font-[300]" data-oid="xoe18hh">
                                    {collection?.customFields?.sortNr}
                                </div> */}
                            </div>
                            {/* <div className="pointer-events-none absolute left-0  top-4  right-0">

                          <div className="text-background/20 absolute left-0 uppercase pl-2 font-light text-[max(125px,4vw)] leading-[0.8] z-[1] mix-blend-hard-light overflow-hidden">
                                    {collection.name}
                                </div>
                            </div> */}
                            <div className="w-full ">
                                <div className="md:hidden rounded-lg relative flex w-full bg-foreground aspect-[4/5] md:aspect-[5/8]">
                                    <img
                                        src={collection?.featuredAsset?.source}
                                        className=" object-cover w-full opacity-90 rounded-lg "
                                        alt=""
                                        data-oid="-i3pz2e"
                                    />

                                    <div className="flex flex-col text-left overflow-hidden absolute p-5 inset-0 items-end justify-end">
                                        <div className="w-full h-full flex-col  justify-end items-end flex">
                                            <div className=" justify-end flex flex-col w-full">
                                                <Button
                                                    asChild
                                                    variant="secondary"
                                                    className="w-full flex flex-col"
                                                    data-oid="_ns2d22"
                                                >
                                                    <a href={`/products/${collection.slug}`}>
                                                        Shop Collection
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Carousel
                                    opts={{ align: 'start' }}
                                    className="w-full bg-background "
                                    positionArrows="below"
                                >
                                    <div className="absolute md:relative md:flex md:justify-center justify-end md:mt-auto  mt-[50%]  items-end md:items-start w-full h-full">
                                        {/* <div className="flex flex-col z-[10] p-[2px] gap-2 rounded-full bg-background/60 items-end justify-end backdrop-blur-md w-fit"> */}
                                        <div className="hidden md:absolute md:mt-[-8px] md:inset-0 md:h-fit w-fit ml-auto md:mx-auto md:grid grid-cols-2 z-[10] p-[2px] gap-2 rounded-full bg-white/50 backdrop-blur-md">
                                            <CarouselPrevious className="rounded-full" />
                                            <CarouselNext className="rounded-full " />
                                        </div>
                                        <div className="md:hidden inset-0 h-fit w-full justify-between flex flex-row items-center z-[10] px-4">
                                            <CarouselPrevious className="rounded-full z-[10]" />
                                            <CarouselNext className="rounded-full z-[10]" />
                                        </div>
                                        {/* </div> */}
                                    </div>
                                    <CarouselContent className="-ml-[0px] gap-2 mt-2 z-[9]">
                                        {/* First item: CategoryLink (only visible on lg and up) */}

                                        <CarouselItem className="hidden md:block md:basis-[35%]">
                                            <div className="flex flex-col w-full h-full">
                                                <div className="relative rounded-lg  flex w-full h-full">
                                                    <img
                                                        src={collection?.featuredAsset?.source}
                                                        className=" object-cover w-full h-full opacity-90 rounded-lg "
                                                        alt=""
                                                        data-oid="-i3pz2e"
                                                    />
                                                    {/* <div className="pointer-events-none absolute left-0 top-4  right-0">
                                        <div className="text-background/20 absolute left-0 top-4 pl-6  uppercase font-light text-[max(84px,4vw)] leading-[0.8] z-[1] mix-blend-hard-light overflow-hidden">
                                            {collection.name}
                                        </div>
                                    </div> */}
                                                    <div className="flex flex-col text-left overflow-hidden absolute p-5 inset-0 items-end justify-end">
                                                        <div className="w-full h-full flex-col  justify-end items-end flex">
                                                            <div className=" justify-end flex flex-col w-full">
                                                                <Button
                                                                    asChild
                                                                    variant="secondary"
                                                                    className="w-full flex flex-col"
                                                                    data-oid="_ns2d22"
                                                                >
                                                                    <a
                                                                        href={`/products/${collection.slug}`}
                                                                    >
                                                                        Shop Collection
                                                                    </a>
                                                                </Button>
                                                            </div>
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
                                                category?: string;
                                            }) => (
                                                <CarouselItem
                                                    key={product.productId}
                                                    className="basis-[72%] md:basis-[28%]"
                                                    data-oid="1dgt013"
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
                                                            category={product.category}
                                                            data-oid=".69b_9o"
                                                        />
                                                    </ProductLink>
                                                </CarouselItem>
                                            ),
                                        )}
                                    </CarouselContent>
                                    <div className="w-full flex h-full flex-row"></div>
                                </Carousel>
                                  
                            </div>
                        </div>
                         </FadeIn>
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
            <div className="h-discoPadding w-full bg-background"></div>

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

            {/* <div className="mb-[-4px] mt-[88px]">
                {featuredCollectionEins.map(({ collection, products }) => (
                    <div key={collection?.id} className="py-[8px] mt-10">
                        <FadeIn
                            className="mb-[calc(var(--discoPadding)/2)]"
                            duration={1.8}
                            data-oid="f92np_p"
                        >
                            <div className="grid grid-cols-2 gap-0 w-full">
                                <div className="col-span-1 justify-end">
                                    <h3
                                        className="textBannerTitle pl-8 text-right"
                                        data-oid=":.e:sv6"
                                    >
                                        {collection?.name}
                                    </h3>
                                </div>
                            </div>
                            <div className="textBannerSubtitle text-center" data-oid="qt.p1oe">
                                Collection No. {collection?.customFields?.sortNr}
                            </div>
                        </FadeIn>
 */}
            {/* <FramerCarousel featuredProducts={featuredProductsZwo} /> */}
            {/* 
<ParallaxCarousel products={products} /> */}
            {/* </div>                   
                ))}                     
                            </div> */}

            <FeaturedProductsSection
                featuredProducts={featuredProductsZwo}
                categorySlug="sc1-new-in"
                title="New In"
                description="Are You an explorer?"
                productCount={4}
                data-oid="933ppe_"
            />
            <div className="h-discoPadding w-full"></div>
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
