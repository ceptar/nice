import { Form, Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import { OutletContext } from '~/src/vendure/types';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { useRootLoader } from '~/src/vendure/utils/use-root-loader';
import { RootLoaderData } from '~/app/root';
import { useLocation } from '@remix-run/react';
import {
    getAvailableCountries,
    getEligibleShippingMethods,
} from '~/src/vendure/providers/checkout/checkout';
import { shippingFormDataIsValid } from '~/src/vendure/utils/validation';
import { getSessionStorage } from '~/src/vendure/sessions';
import { getActiveCustomerAddresses } from '~/src/vendure/providers/customer/customer';
import { getActiveOrder } from '~/src/vendure/providers/orders/order';
import { Elements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '~/app/routes/api.create-payment-intent/route';
import { ShippingMethodSelector } from '~/src/components/checkout/ShippingMethodSelector';
import { CartLoaderData } from '~/app/routes/api.active-order/route';
import { CartTotals } from '~/src/components/cart-vendure/CartTotals';
import { CartContents } from '~/src/components/cart-vendure/CartContents';
import { AddressForm } from '~/src/components/account/AddressForm';
import { ShippingAddressSelector } from '~/src/components/checkout/ShippingAddressSelector';
import { CheckoutForm } from '~/src/components/checkout/sripe/CheckoutForm';
import { Price } from '~/src/components/products/Price';
import { useState, FormEvent } from 'react';

const stripePromise = loadStripe(
    'pk_live_51PHY56IqbXyMSGmjfiHNgFGqrsy8kOM5RkNvKY62adXSjIVv5zSlP7QHE0xWVdacGRZ32bnvCnmaKqPo17ojDHdN00drHeJ6Ac',
);

type StripePaymentsProps = {
    clientSecret: string;
    orderCode: string;
};

export async function loader({ request }: DataFunctionArgs) {
    const session = await getSessionStorage().then((sessionStorage) =>
        sessionStorage.getSession(request?.headers.get('Cookie')),
    );

    const activeOrder = await getActiveOrder({ request });

    //check if there is an active order if not redirect to homepage
    if (!session || !activeOrder || !activeOrder.active || activeOrder.lines.length === 0) {
        return redirect('/');
    }
    const { availableCountries } = await getAvailableCountries({ request });
    const { eligibleShippingMethods } = await getEligibleShippingMethods({
        request,
    });
    const { activeCustomer } = await getActiveCustomerAddresses({ request });
    const error = session.get('activeOrderError');
    return json({
        stripePromise,
        createPaymentIntent: await createPaymentIntent(1000),
        availableCountries,
        eligibleShippingMethods,
        activeCustomer,
        error,
    });
}

export default function Checkout() {
    const loaderData = useLoaderData<typeof loader>();
    const clientSecret = loaderData.createPaymentIntent.client_secret;
    const options = {
        clientSecret,
    };

    const { error } = loaderData;
    const { activeCustomer } = loaderData;
    const availableCountries = loaderData.availableCountries;
    const eligibleShippingMethods = loaderData.eligibleShippingMethods;
    const outletContext = useOutletContext<OutletContext>();
    const { activeOrderFetcher, activeOrder, adjustOrderLine, removeItem } = outletContext;
    const [customerFormChanged, setCustomerFormChanged] = useState(false);
    const [addressFormChanged, setAddressFormChanged] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

    const currencyCode = activeOrder?.currencyCode;
    const location = useLocation();
    const editable = !location.pathname.startsWith('/checkout');

    // const { t } = useTranslation();

    const { customer, shippingAddress } = activeOrder ?? {};
    const isSignedIn = !!activeCustomer?.id;
    const addresses = activeCustomer?.addresses ?? [];
    const defaultFullName =
        shippingAddress?.fullName ?? (customer ? `${customer.firstName} ${customer.lastName}` : ``);
    const canProceedToPayment =
        customer &&
        ((shippingAddress?.streetLine1 && shippingAddress?.postalCode) ||
            selectedAddressIndex != null) &&
        activeOrder?.shippingLines?.length &&
        activeOrder?.lines?.length;

    const submitCustomerForm = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const { emailAddress, firstName, lastName } = Object.fromEntries<any>(formData.entries());
        const isValid = event.currentTarget.checkValidity();
        if (customerFormChanged && isValid && emailAddress && firstName && lastName) {
            activeOrderFetcher.submit(formData, {
                method: 'post',
                action: '/api/active-order',
            });
            setCustomerFormChanged(false);
        }
    };
    const submitAddressForm = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const isValid = event.currentTarget.checkValidity();
        if (addressFormChanged && isValid) {
            setShippingAddress(formData);
        }
    };
    const submitSelectedAddress = (index: number) => {
        const selectedAddress = activeCustomer?.addresses?.[index];
        if (selectedAddress) {
            setSelectedAddressIndex(index);
            const formData = new FormData();
            Object.keys(selectedAddress).forEach((key) =>
                formData.append(key, (selectedAddress as any)[key]),
            );
            formData.append('countryCode', selectedAddress.country.code);
            formData.append('action', 'setCheckoutShipping');
            setShippingAddress(formData);
        }
    };

    function setShippingAddress(formData: FormData) {
        if (shippingFormDataIsValid(formData)) {
            activeOrderFetcher.submit(formData, {
                method: 'post',
                action: '/api/active-order',
            });
            setAddressFormChanged(false);
        }
    }

    const submitSelectedShippingMethod = (value?: string) => {
        if (value) {
            activeOrderFetcher.submit(
                {
                    action: 'setShippingMethod',
                    shippingMethodId: value,
                },
                {
                    method: 'post',
                    action: '/api/active-order',
                },
            );
        }
    };

    const orderCode = activeOrder?.code ?? '';

    const appearance = {
        theme: 'stripe' as 'stripe',

        variables: {
            colorPrimary: '#0570de',
            colorBackground: '#ffffff',
            colorText: '#30313d',
            colorDanger: '#df1b41',
            fontFamily: 'Syne',
            spacingUnit: '4px',
            borderRadius: '8px',
            // See all possible variables below
        },
    };

    return (
        <div className="w-full mx-auto pt-32 py-8" data-oid="un7hs7a">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-oid="wnneflw">
                {/* Left Column - Order Details */}
                <div className="p-4 bg-[var(--primary1)] rounded-[16px]" data-oid="q2ss37d">
                    <h2 className="text-xl font-semibold text-center mb-4" data-oid="r4fjyks">
                        Order Summary
                    </h2>

                    <CartContents
                        orderLines={activeOrder?.lines ?? []}
                        currencyCode={activeOrder?.currencyCode!}
                        editable={false}
                        removeItem={removeItem}
                        adjustOrderLine={adjustOrderLine}
                        data-oid="87f420w"
                    ></CartContents>
                    <CartTotals order={activeOrder} data-oid=".d9_qf0"></CartTotals>
                </div>
                {/* Right Column - Checkout Form */}
                <div className="p-4" data-oid="2znrv7p">
                    <Form method="post" className="bg-white" data-oid="01vfbd2">
                        <h2 className="text-xl font-semibold text-center mb-4" data-oid="xt0:vjj">
                            Shipping Address
                        </h2>

                        {isSignedIn && activeCustomer.addresses?.length ? (
                            <ShippingAddressSelector
                                addresses={activeCustomer.addresses}
                                selectedAddressIndex={selectedAddressIndex}
                                onChange={submitSelectedAddress}
                                data-oid="f:12995"
                            />
                        ) : (
                            <AddressForm
                                availableCountries={availableCountries}
                                address={shippingAddress}
                                defaultFullName={defaultFullName}
                                data-oid="niq:1v7"
                            />
                        )}
                    </Form>

                    <div className="bg-white" data-oid="osl_fyb">
                        <h2
                            className="text-xl font-semibold text-center pt-6 mb-4"
                            data-oid="5ukuesk"
                        >
                            Shipping Method
                        </h2>
                        <ShippingMethodSelector
                            eligibleShippingMethods={eligibleShippingMethods}
                            currencyCode={activeOrder?.currencyCode}
                            shippingMethodId={
                                activeOrder?.shippingLines[0]?.shippingMethod.id ?? ''
                            }
                            onChange={submitSelectedShippingMethod}
                            data-oid="p9pixp6"
                        />
                    </div>

                    {/* Payment Section - Only show if shipping is selected */}
                    {canProceedToPayment && clientSecret && (
                        <div className="bg-white" data-oid="7jq0z6q">
                            <h2
                                className="text-xl font-semibold text-center pt-6 mb-4"
                                data-oid="pepcez4"
                            >
                                Payment
                            </h2>
                            <Elements
                                stripe={stripePromise}
                                options={{
                                    clientSecret,
                                    appearance,
                                    fonts: [
                                        {
                                            family: 'Syne',
                                            src: 'url(https://discobabes.store/src/assets/fonts/syne-latin-400-normal.woff2)',
                                            weight: '400',
                                        },
                                    ],
                                }}
                                data-oid="39qt-r8"
                            >
                                <CheckoutForm orderCode={orderCode} data-oid="r_uq2f6" />
                            </Elements>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

//   return (
//     <div className="pt-[78px] ">

//               {clientSecret && (
//                 <Elements
//                   stripe={stripePromise}
//                   options={{ clientSecret, appearance,
//                     shippingAddressRequired: true,
//                     allowedShippingCountries: ['US'],
//                     shippingRates: [
//                       {
//                         id: 'free-shipping',
//                         displayName: 'Free shipping',
//                         amount: 0,
//                         deliveryEstimate: {
//                          maximum: {unit: 'day', value: 7},
//                          minimum: {unit: 'day', value: 5}
//                         }
//                       },
//                     ]

//                    }}
//                 >
//                   <CheckoutForm />
//                 </Elements>
//               )}
//               </div>
//   )
// }
