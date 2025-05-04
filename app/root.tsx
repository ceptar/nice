import '~/src/styles/tailwind.css';
import '~/src/styles/reset.scss';
import '~/src/styles/colors.scss';
import '~/src/styles/typography.scss';
import '~/src/styles/global.scss';
import '~/src/styles/utils.scss';

import { DataFunctionArgs, json, LinksFunction } from '@remix-run/server-runtime';
import {
    Links,
    Meta,
    type MetaFunction,
    Outlet,
    Scripts,
    ScrollRestoration,
    ShouldRevalidateFunction,
    useLoaderData,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import CookieConsent from '~/app/client-components/cookie-consent/CookieConsent';
import { getCollections } from '~/src/vendure/providers/collections/collections';
import { getCollectionProducts } from '~/src/vendure/providers/products/collectionProducts';
import { activeChannel } from '~/src/vendure/providers/channel/channel';
import { useActiveOrder } from '~/src/vendure/utils/use-active-order';
import { getActiveCustomer } from '~/src/vendure/providers/customer/customer';
// import { RouteBreadcrumbs } from '~/src/components/breadcrumbs/use-breadcrumbs';
import CartTray from '~/src/components/cart-vendure/CartTray';
import { Footer } from '~/src/components/footer/footer';
import { Header } from '~/src/components/header/header';
// import { NavigationProgressBar } from '~/src/components/navigation-progress-bar/navigation-progress-bar';
// import { Toaster } from '~/src/components/toaster/toaster';
import styles from './root.module.scss';

// The root data does not change once loaded.
export const shouldRevalidate: ShouldRevalidateFunction = ({ nextUrl, currentUrl, formAction }) => {
    if (currentUrl.pathname === '/sign-in') {
        // just logged in
        return true;
    }
    if (currentUrl.pathname === '/checkout/confirmation') {
        // just logged in
        return true;
    }
    if (currentUrl.pathname === '/account' && nextUrl.pathname === '/') {
        // just logged out
        return true;
    }
    if (formAction === '/checkout/payment') {
        // submitted payment for order
        return true;
    }

    return false;
};

export type RootLoaderData = {
    activeCustomer: Awaited<ReturnType<typeof getActiveCustomer>>;
    activeChannel: Awaited<ReturnType<typeof activeChannel>>;
    collections: Awaited<ReturnType<typeof getCollections>>;
    featuredCollections: Awaited<ReturnType<typeof getCollections>>;
    featuredProductsData: Awaited<ReturnType<typeof getCollectionProducts>>;
};

export async function loader({ request, params, context }: DataFunctionArgs) {
    const activeCustomer = await getActiveCustomer({ request });
    const collections = await getCollections(request, { take: 100 });
    const featuredCollections = collections
        .filter((c) => c.customFields?.featuredCollection === true)
        .sort((a, b) => (a.customFields?.featuredNr || 0) - (b.customFields?.featuredNr || 0));
    // const colCollections = collections.filter(
    //     (collection) => collection.parent?.slug === 'collections',
    // );
    // const colCategories = collections.filter(
    //     (collection) => collection.parent?.slug === 'categories',
    // );
    // const colSpecials = collections.filter((collection) => collection.parent?.slug === 'specials');

    if (!featuredCollections?.length) {
        throw new Response('No featured collections found', { status: 404 });
    }
    const featuredProductsData = await Promise.all(
        featuredCollections.map(async (collection) => {
            const productsData = await getCollectionProducts(collection.slug, 0, 100); // adjust take if needed

            return {
                collection,
                products: productsData.search.items,
            };
        }),
    );

    const loaderData: RootLoaderData = {
        collections,
        featuredCollections,
        featuredProductsData,

        // featuredCollectionsWithProducts,
        activeCustomer,
        activeChannel: await activeChannel({ request }),
    };

    return json(
        {
            ...loaderData,
        },
        { headers: activeCustomer._headers },
    );
}

// const breadcrumbs: RouteBreadcrumbs = () => [{ title: 'Home', to: '/' }];

// export const handle = {
//     breadcrumbs,
// };

export function Layout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en" data-oid="c1tvmxa">
            <head data-oid="yr1r.v-">
                <meta charSet="utf-8" data-oid="j.oq8f0" />
                <meta
                    name="viewport"
                    content="width=device-width, 
                 initial-scale=1"
                    data-oid="e89jc_e"
                />

                <Meta data-oid="fyvc851" />
                <Links data-oid="e:ov_ti" />
            </head>
            <body
                // className="bg-[length:2px_12px] bg-gradient-to-r from-transparent via-transparent to-[#0000001d] bg-opacity-5 brightness-105 backdrop-blur-sm"
                data-oid="_x6pjv1"
            >
                {children}

                <ScrollRestoration data-oid="pyt933:" />
                <Scripts data-oid="y230y5c" />
            </body>
        </html>
    );
}

export default function App() {
    const [open, setOpen] = useState(false);
    const loaderData = useLoaderData<RootLoaderData>();
    const { activeOrderFetcher, activeOrder, adjustOrderLine, removeItem, refresh } =
        useActiveOrder();

    useEffect(() => {
        // When the loader has run, this implies we should refresh the contents
        // of the activeOrder as the user may have signed in or out.
        refresh();
    }, [loaderData]);

    return (
        <div data-oid="kv4_gk_">
            <div className={styles.root} data-oid="qp3.ywz">
                <Header
                    onCartIconClick={() => setOpen(!open)}
                    cartQuantity={activeOrder?.totalQuantity ?? 0}
                    collections={loaderData.collections}
                    data-oid="n7gv7e."
                />

                <main className={styles.main} data-oid="d2t9wht">
                    <Outlet
                        context={{
                            activeOrderFetcher,
                            activeOrder,
                            adjustOrderLine,
                            removeItem,
                        }}
                        data-oid="1dncjoj"
                    />
                </main>
                <CookieConsent variant="small" />
                <Footer data-oid="fni-kfo" />
            </div>
            <CartTray
                open={open}
                onClose={setOpen}
                activeOrder={activeOrder}
                adjustOrderLine={adjustOrderLine}
                removeItem={removeItem}
                data-oid="aeda9g6"
            />

            {/* <NavigationProgressBar className={styles.navigationProgressBar} /> */}
            {/* <Toaster /> */}
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

export { ErrorBoundary } from '~/src/components/error-page/error-page';
