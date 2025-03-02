import type { LoaderFunctionArgs } from '@remix-run/node';
import { type MetaFunction, useLoaderData } from '@remix-run/react';
import { initializeEcomApiForRequest } from '~/src/wix/ecom/session';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { OrderSummary } from '~/src/components/order-summary/order-summary';

import styles from './route.module.scss';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const orderId = url.searchParams.get('orderId');
    const api = await initializeEcomApiForRequest(request);
    // Allow a missing `orderId` to support viewing this page in Codux.
    const order = orderId ? await api.getOrder(orderId) : undefined;
    return { order };
};

export default function ThankYouPage() {
    const { order } = useLoaderData<typeof loader>();

    return (
        <div className={styles.root} data-oid="_ojp3_x">
            <h1 className="heading4" data-oid="2kk9e2v">
                Thank You!
            </h1>
            <div className={styles.subtitle} data-oid="t278w-k">
                You’ll receive a confirmation email soon.
            </div>

            {order && (
                <>
                    <div className={styles.orderNumber} data-oid="2rbjoiq">
                        Order number: {order.number}
                    </div>
                    <OrderSummary
                        order={order}
                        className={styles.orderSummary}
                        data-oid="8q6cp0."
                    />
                </>
            )}

            <CategoryLink categorySlug="all-products" className={styles.link} data-oid="izda79w">
                Continue Browsing
            </CategoryLink>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Thank You | ReClaim' },
        {
            name: 'description',
            content: 'Thank You for your order',
        },
        {
            property: 'robots',
            content: 'noindex, nofollow',
        },
    ];
};

export { ErrorBoundary } from '~/src/components/error-page/error-page';
