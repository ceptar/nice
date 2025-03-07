import {
    redirect,
    type TypedResponse,
    type LoaderFunctionArgs,
    type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { type OrderDetails } from '~/src/wix/ecom';
import { initializeEcomApiForRequest } from '~/src/wix/ecom/session';
import { OrderSummary } from '~/src/components/order-summary/order-summary';
import { Accordion } from '~/src/components/accordion/accordion';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { loaderMockData } from './loader-mock-data';

import styles from './route.module.scss';

export type LoaderResponseData = { orders: OrderDetails[] };
export type LoaderResponse = Promise<TypedResponse<never> | LoaderResponseData>;

export async function loader({ request }: LoaderFunctionArgs): LoaderResponse {
    const api = await initializeEcomApiForRequest(request);
    if (!api.isLoggedIn()) {
        return redirect('/login');
    }

    const ordersResponse = await api.getOrders();
    return { orders: ordersResponse.items };
}

// will be called if app is run in Codux because fetching orders requires
// user to be logged in but it's currently can't be done through Codux
export async function coduxLoader(): ReturnType<typeof loader> {
    return loaderMockData;
}

export default function MyOrdersPage() {
    const { orders } = useLoaderData<typeof loader>();

    const formatOrderCreationDate = (date: Date) =>
        date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

    const accordionItems = orders.map((order) => ({
        header: (
            <div className={styles.orderHeader} data-oid="hp4h.72">
                <div className={styles.orderHeaderSection} data-oid="gpqoe3o">
                    <span className={styles.orderHeaderSectionName} data-oid="h7z_l9-">
                        Date:{' '}
                    </span>
                    {formatOrderCreationDate(new Date(order._createdDate!))}
                </div>
                <div className={styles.orderHeaderSection} data-oid="kac_bg7">
                    <span className={styles.orderHeaderSectionName} data-oid="7-.mot4">
                        Order:{' '}
                    </span>
                    {order.number}
                </div>
                <div className={styles.orderHeaderSection} data-oid="y7y2k73">
                    <span className={styles.orderHeaderSectionName} data-oid="0a6t5c:">
                        Status:{' '}
                    </span>
                    {order.status}
                </div>
                <div className={styles.orderHeaderSection} data-oid="jd2r_2j">
                    <span className={styles.orderHeaderSectionName} data-oid="hqb653x">
                        Total:{' '}
                    </span>
                    {order.priceSummary?.total?.formattedAmount}
                </div>
            </div>
        ),

        content: <OrderSummary key={order._id} order={order} data-oid="3:v00ww" />,
    }));

    return (
        <div data-oid="h7s42qk">
            <div className={styles.pageHeader} data-oid="xel5yw7">
                <div className={styles.title} data-oid="qkck1-b">
                    My Orders
                </div>
                <div className={styles.message} data-oid="nz-8ix:">
                    View your order history or check the status of a recent order.
                </div>
            </div>
            <div className={styles.orders} data-oid="oor:3z8">
                {orders.length > 0 ? (
                    <>
                        <div className={styles.orderListHeader} data-oid=":jz-6rt">
                            <div className={styles.orderListHeaderSection} data-oid="4wjw863">
                                Date
                            </div>
                            <div className={styles.orderListHeaderSection} data-oid="w7z-h:g">
                                Order
                            </div>
                            <div className={styles.orderListHeaderSection} data-oid="n_i0vt6">
                                Status
                            </div>
                            <div className={styles.orderListHeaderSection} data-oid="c-1zhun">
                                Total
                            </div>
                        </div>
                        <Accordion
                            items={accordionItems}
                            className={styles.orderList}
                            data-oid="ulfi684"
                        />
                    </>
                ) : (
                    <div className={styles.emptyStateContainer} data-oid="7ur6tjs">
                        <div className={styles.emptyStateMessage} data-oid="t58cjvg">
                            {"You haven't placed any orders yet"}
                        </div>
                        <CategoryLink
                            categorySlug="aa-all"
                            className={styles.startBrowsingLink}
                            data-oid="7r2zsdq"
                        >
                            Start Browsing
                        </CategoryLink>
                    </div>
                )}
            </div>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'My Orders | ReClaim' },
        {
            name: 'description',
            content: 'Essential home products for sustainable living',
        },
        {
            property: 'robots',
            content: 'noindex, nofollow',
        },
    ];
};

export { ErrorBoundary } from '~/src/components/error-page/error-page';
