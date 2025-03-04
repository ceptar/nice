import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import { useState } from 'react';
import {
    FetcherWithComponents,
    ShouldRevalidateFunction,
    useLoaderData,
    useOutletContext,
    MetaFunction,
} from '@remix-run/react';
import {
    OctagonAlert as Alert,
    Check,
    Minus as MinusIcon,
    Plus as PlusIcon,
    Image as PhotoIcon,
} from 'lucide-react';
import { Price } from '~/src/components/products/Price';
import { ColorSwatches } from '~/src/components/facet-filter/ColorSwatches';
import { CartLoaderData } from '~/app/routes/api.active-order/route';

import { getSessionStorage } from '~/src/vendure/sessions';
import { ErrorCode, ErrorResult } from '~/src/vendure/generated/graphql';

import { getProductBySlug } from '~/src/vendure/providers/products/products';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '~/src/components/ui/carousel';
import styles from './route.module.scss';

export async function loader({ params, request }: DataFunctionArgs) {
    const { product } = await getProductBySlug(params.productSlug!, { request });

    if (!product) {
        throw new Response('Not Found', {
            status: 404,
        });
    }

    const sessionStorage = await getSessionStorage();
    const session = await sessionStorage.getSession(request?.headers.get('Cookie'));
    const error = session.get('activeOrderError');
    return json(
        { product: product!, error },
        {
            headers: {
                'Set-Cookie': await sessionStorage.commitSession(session),
            },
        },
    );
}

export const shouldRevalidate: ShouldRevalidateFunction = () => true;

export default function ProductDetailsPage() {
    const { product, error } = useLoaderData<typeof loader>();
    const { activeOrderFetcher } = useOutletContext<{
        activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
    }>();
    const { activeOrder } = activeOrderFetcher.data ?? {};
    const addItemToOrderError = getAddItemToOrderError(error);
    // const { t } = useTranslation();

    if (!product) {
        return <div data-oid="zgr28-i">Product not found!</div>;
    }

    const findVariantById = (id: string) => product.variants.find((v) => v.id === id);

    const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
    const selectedVariant = findVariantById(selectedVariantId);
    if (!selectedVariant) {
        setSelectedVariantId(product.variants[0].id);
    }

    const qtyInCart =
        activeOrder?.lines.find((l) => l.productVariant.id === selectedVariantId)?.quantity ?? 0;

    const asset = product.assets[0];

    const colorFacetValues = product.facetValues.filter(
        (fv) => fv.facet.code.toLowerCase() === 'colors',
    );
    const [featuredAsset, setFeaturedAsset] = useState(selectedVariant?.featuredAsset);
    return (
        <div className="pt-[62px] pb-[50px] justify-items-center" data-oid="57ypkzz">
            {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
            <div className="max-w-6xl mx-auto" data-oid="bye:.pw">
                <div className={styles.content} data-oid="t.-_yb-">
                    <div className="justify-self-end" data-oid="tq_wi:b">
                        <Carousel className="w-full rounded-none" data-oid="el-hn3a">
                            <CarouselContent
                                className="aspect-[4/6]
                           
                             "
                                data-oid="mymzjp9"
                            >
                                {product.assets.map((asset, assetIndex) => (
                                    <CarouselItem
                                        key={`${asset.id}-${assetIndex}`}
                                        data-oid="wykuf_v"
                                    >
                                        <div className="relative " data-oid="tcfyk9g">
                                            <img
                                                src={asset.preview}
                                                alt={`${product.name} - Image ${assetIndex + 1}`}
                                                className="object-cover object-center"
                                                data-oid="wud3dbw"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious data-oid="0k7s.kk" />
                            <CarouselNext data-oid="pob73h1" />
                        </Carousel>
                    </div>
                    <div data-oid="0lr6-l0">
                        <h3 className="text-xl" data-oid="xzsw503">
                            {product.name}
                        </h3>

                        <div className="" data-oid="kck571k">
                            <h3 className="sr-only" data-oid="ikzebtq">
                                Description
                            </h3>

                            <div
                                className=""
                                dangerouslySetInnerHTML={{
                                    __html: product.description,
                                }}
                                data-oid="a:b1-oz"
                            />
                        </div>
                        <activeOrderFetcher.Form
                            method="post"
                            action="/api/active-order"
                            data-oid="s7oq6ib"
                        >
                            <input
                                type="hidden"
                                name="action"
                                value="addItemToOrder"
                                data-oid="-9k39im"
                            />

                            {1 < product.variants.length ? (
                                <div className="mt-4" data-oid="xf_sw7y">
                                    <label
                                        htmlFor="option"
                                        className="block text-sm tracking-tight text-discopink-300"
                                        data-oid="f:lmlj:"
                                    >
                                        Select option
                                    </label>
                                    <select
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-discogray focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        id="productVariant"
                                        value={selectedVariantId}
                                        name="variantId"
                                        onChange={(e) => {
                                            setSelectedVariantId(e.target.value);

                                            const variant = findVariantById(e.target.value);
                                            if (variant) {
                                                setFeaturedAsset(variant!.featuredAsset);
                                            }
                                        }}
                                        data-oid="mceedbe"
                                    >
                                        {product.variants.map((variant) => (
                                            <option
                                                key={variant.id}
                                                value={variant.id}
                                                data-oid="my141.4"
                                            >
                                                {variant.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <input
                                    type="hidden"
                                    name="variantId"
                                    value={selectedVariantId}
                                    data-oid="2y3v:zp"
                                ></input>
                            )}

                            {/* Product price */}
                            <div className="flex flex-col" data-oid="hqxbjhl">
                                <div className="text-md font-bold " data-oid="rd6glvs">
                                    <Price
                                        priceWithTax={selectedVariant?.priceWithTax}
                                        currencyCode={selectedVariant?.currencyCode}
                                        data-oid="vir-ar0"
                                    ></Price>
                                </div>

                                {/* ADD TO CART  */}
                                <div className="relative w-full md:w-fit" data-oid="01ma401">
                                    <button
                                        type="submit"
                                        className={`
      relative w-full h-12 text-sm  
      text-white bg-black hover:opacity-90
      rounded-full
      py-3 px-10 my-8 cursor-pointer
      transition-all
      ${activeOrderFetcher.state !== 'idle' ? '' : ''}
      ${qtyInCart === 0 ? '' : ''}
    `}
                                        disabled={activeOrderFetcher.state !== 'idle'}
                                        // style={{
                                        //   background: generateGradient({
                                        //     colors: colorFacetValues,
                                        //   }),
                                        //   backgroundSize: '600% 100%',
                                        //   animation: 'gradient 16s ease infinite',
                                        // }}
                                        data-oid="1xc0lf9"
                                    >
                                        {qtyInCart ? (
                                            <span
                                                className="flex items-center justify-center"
                                                data-oid="blq7brl"
                                            >
                                                <Check
                                                    className="w-5 h-5 mr-1"
                                                    data-oid="wacaqmm"
                                                />{' '}
                                                {qtyInCart} in cart
                                            </span>
                                        ) : (
                                            'Add to cart'
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* <div className="mt-4 flex items-center">
                <span className="text-gray-500 pr-2">
                {selectedVariant?.sku}
                </span>
                <StockLevelLabel stockLevel={selectedVariant?.stockLevel} />
                </div> */}
                            {addItemToOrderError && (
                                <div className="" data-oid=":brdd8j">
                                    <Alert message={addItemToOrderError} data-oid="firk3:0" />
                                </div>
                            )}
                                <div className="w-fit px-1 py-[6px] border-[2px] border-black rounded-full" data-oid=":9wynnt">
                                    {/* ... existing image code ... */}
                                    <ColorSwatches colors={colorFacetValues} data-oid="vfo8e1t" />
                                </div>
                            <div className="text-sm" data-oid="_132_a6">
                                <h3 className="font-bold pt-4 my-2" data-oid="3fq6d0:">
                                    Shipping & Returns
                                </h3>
                                <div className="space-y-1" data-oid="28tkekj">
                                    <p data-oid="csxt7sv">
                                        Standard shipping: 3 - 5 working days. Express shipping: 1 -
                                        3 working days.
                                    </p>
                                    <p data-oid="pcmer4y">
                                        Shipping costs depend on delivery address and will be
                                        calculated during checkout.
                                    </p>
                                    <p data-oid="dubkidm">
                                        Returns are subject to terms. Please see the{' '}
                                        <span className="underline" data-oid="5pv9sgg">
                                            returns page
                                        </span>{' '}
                                        for further information.
                                    </p>
                                </div>

                            </div>
                        </activeOrderFetcher.Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = `${data?.product.name ?? 'Product Details'} | ReClaim`;
    const description = data?.product.description;

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
            // content: data?.product.media?.mainMedia?.image?.url ?? '/social-media-image.jpg',
        },
    ];
};

function getAddItemToOrderError(error?: ErrorResult): string | undefined {
    if (!error || !error.errorCode) {
        return undefined;
    }
    switch (error.errorCode) {
        case ErrorCode.OrderModificationError:
        case ErrorCode.OrderLimitError:
        case ErrorCode.NegativeQuantityError:
        case ErrorCode.InsufficientStockError:
            return error.message;
    }
}

export { ErrorBoundary } from '~/src/components/error-page/error-page';
