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
            </div>
            <div className="heroBanner" data-oid="ybswhrl">
                <div className="heroBannerOverlay" data-oid="ud1mqmo">
                    <div className="h-[40vh]"></div>
                    
                    <div></div>
                    <div className="textBannerSubtitle" data-oid="tsyiit3">
                        Life's too short
                    </div>

                    <div className="textBannerTitle" data-oid="xoe18hh">
                        to wear boring Jewelry
                    </div>

                    <CategoryLink className="my-16" categorySlug="aa-all" data-oid="einwjr0">
                        <Button variant="secondary" data-oid="_ns2d22">
                            Shop All
                        </Button>
                    </CategoryLink>
                    
                </div>
            </div>
            {/* <div className="textBannerSection" data-oid="hqay.qu">
                <FadeIn className="textBanner" duration={1.8} data-oid="q6k4z92">
                    <div className="textBannerTitle" data-oid="xq_xyhz">
                        Collections
                    </div>
                    <div className="textBannerSubtitle" data-oid="c:z:zej"></div> */}

                    {/* <CategoryLink categorySlug="aa-aa-all" data-oid="8gzudre">
                        <LabelWithArrow data-oid="4fjs1_:">Shop Collections</LabelWithArrow>
                    </CategoryLink> */}
                {/* </FadeIn>
            </div> */}
            {/* // Start neue featured Sections  */}

            <div className="mb-[-4px] mt-[4px]">
                {featuredCollectionEins.map(({ collection, products }) => (
                    <>
                                 <div className="grid grid-cols-1 h-[5vh] relative items-end">
                                {/* <div className="absolute left-0 bottom-0 -mb-[24px]">
                                <div className="uppercase font-semibold text-[max(24px,3vw)] leading-[1.1] relative p-6 ">
                                    {collection.name}
                                </div></div> */}

                            </div> 
                    <div className="relative mb-[4px] flex items-center" key={collection?.id}>
                    <div className="absolute left-0 top-2">
                    <div className="uppercase pl-8 font-semibold text-[max(24px,3vw)] leading-[1.1] relative ">
                                    {collection.name}
                                </div>
                                </div>
                        <div className="w-full">
                            <div className="md:hidden mb-[4px] relative flex w-full bg-black aspect-[10/8] md:aspect-[5/8]">
                                <img
                                    src={collection?.featuredAsset?.source}
                                    className=" object-cover w-full opacity-90"
                                    alt=""
                                    data-oid="-i3pz2e"
                                />

                                <div className="heroBannerOverlay">
                                    <div className="w-full h-full  justify-center flex mt-8">
                                        <div
                                            className="relative  text-white text-center"
                                            data-oid="xoe18hh"
                                        >
                                            <div className="textBannerSubtitle" data-oid="c:z:zej">
                                                Collection
                                            </div>
                                            <div className="textBannerTitle">
                                                <div className="absolute w-full text-white ">
                                                    {collection?.name}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <CategoryLink
                                        className="my-2 justify-center"
                                        categorySlug={collection.slug}
                                        data-oid="einwjr0"
                                    >
                                        <Button variant="secondary" data-oid="_ns2d22">
                                            Shop Collection
                                        </Button>
                                    </CategoryLink>
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
                                            <div className="relative flex w-full h-full bg-black">
                                               
                                                <img
                                                    src={collection?.featuredAsset?.source}
                                                    className=" object-cover w-full opacity-90"
                                                    alt=""
                                                    data-oid="-i3pz2e"
                                                />


                                                <div className="heroBannerOverlayLinksUnten pb-1">
                                                    <div className="pl-16 w-full h-full items-end grid grid-cols-2">
                                                        <div
                                                            className="relative col-span-1 text-white"
                                                            data-oid="xoe18hh"
                                                        >
                                                            {/* <div
                                                                className="textBannerSubtitle"
                                                                data-oid="c:z:zej"
                                                            >
                                                                Collection
                                                            </div> */}
                                                            <div className="textBannerTitle">
                                                                <div className="py-1 text-start relative w-full text-[32px]  text-white pr-1">
                                                                    {/* {collection?.name} */}
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div className="col-span-1 text-white mr-1">
                                                            <CategoryLink
                                                    className="text-[12px]"
                                                    categorySlug={collection?.slug}
                                                    data-oid="einwjr0"
                                                >
                                                    <LabelWithArrow className="pl-[4px] py-1">
                                                        Shop Collection
                                                    </LabelWithArrow>
                                         
                                                </CategoryLink>
                                              
                                                        </div>
                                                    </div>
                                                    {/* <CategoryLink
                                    className="my-2 justify-center"
                                    categorySlug={featuredCollectionEins?.collection?.slug}
                                    data-oid="einwjr0"
                                >
                                    <Button variant="secondary" data-oid="_ns2d22">
                                        Shop Collection
                                    </Button>
                                </CategoryLink> */}
                                                    <div
                                                        className="textBannerTitle"
                                                        data-oid="xoe18hh"
                                                    ></div>
                                                </div>
                                            </div>
{/* 
                                            <div className="relative pl-16 flex w-full h-[26px] justify-start ">
                                                <CategoryLink
                                                    className="py-1 text-[12px] font-bold"
                                                    categorySlug={collection?.slug}
                                                    data-oid="einwjr0"
                                                >
                                                    <LabelWithArrow>
                                                        Shop Collection
                                                    </LabelWithArrow>
                                                    Shop Collection
                                                </CategoryLink>
                                            </div>
 */}
 {/* 
                                            <div className="relative mx-auto flex w-full h-[26px]   justify-center ">
                                                <CategoryLink
                                                    className="py-1 text-[12px] uppercase font-bold"
                                                    categorySlug={collection?.slug}
                                                    data-oid="einwjr0"
                                                >
                                                    Shop Collection
                                                </CategoryLink>
                                            </div>
                                             */}
                                        </div>                                
                                    </CarouselItem>

                                    {/* Rest of the carousel items: Products */}
                                    {products?.map((product) => (
                                        <CarouselItem
                                            key={product.productId}
                                            className="basis-1/2 md:basis-[28%] pl-[4px]"
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
                                    ))}
                                </CarouselContent>
                                {/* <CarouselPrevious />
  <CarouselNext /> */}
                            </Carousel>
                        </div>
                    </div>
                    </>
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
