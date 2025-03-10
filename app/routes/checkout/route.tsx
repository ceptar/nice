import { json, redirect } from '@remix-run/node';
import { useSubmit, useNavigation } from '@remix-run/react';
import { FormEvent, useEffect, useState } from 'react';
import { LoaderFunction } from '@remix-run/node';
import { AddressForm } from '~/src/components/account/AddressForm';

import { DataFunctionArgs } from '@remix-run/node';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getSessionStorage } from '~/src/vendure/sessions';
import { CheckoutSummary } from '~/src/components/checkout/checkout-summary';
import { CartContents } from '~/src/components/cart-vendure/CartContents';
import { CartTotals } from '~/src/components/cart-vendure/CartTotals';
import { ShippingAddressSelector } from '~/src/components/checkout/ShippingAddressSelector';
import { ShippingMethodSelector } from '~/src/components/checkout/ShippingMethodSelector';
import { PaymentForm } from '~/src/components/checkout/payment-form';
import { useFetcher, useLoaderData, useNavigate, Form } from '@remix-run/react';
import { useDebounce } from '~/src/vendure/utils/use-debounce';
import { getActiveOrder } from '~/src/vendure/providers/orders/order';
import { shippingFormDataIsValid } from '~/src/vendure/utils/validation';

import {
    getAvailableCountries,
    getEligibleShippingMethods,
    addPaymentToOrder,
    createStripePaymentIntent,
    getEligiblePaymentMethods,
    getNextOrderStates,
    transitionOrderToState,
} from '~/src/vendure/providers/checkout/checkout';

// Initialize Stripe
const stripePromise = loadStripe(
    'pk_test_51PHY56IqbXyMSGmjFTOB20RTYw23RdBIgZqhlYKlRRqny1flkuxlMuQYnHTqRIkzjJNYEHfv8PZn0YsBlSjV9f7c00XQahomn2',
);

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSessionStorage().then((sessionStorage) =>
        sessionStorage.getSession(request?.headers.get('Cookie')),
    );
    // Get active order
    const activeOrder = await getActiveOrder({ request });

    if (!activeOrder || activeOrder.lines.length === 0) {
        return redirect('/cart');
    }

    // Get eligible shipping methods if shipping address is set
    const { availableCountries } = await getAvailableCountries({ request });

    const { eligiblePaymentMethods } = await getEligiblePaymentMethods({ request });
    const { eligibleShippingMethods } = await getEligibleShippingMethods({ request });

    // Create payment intent if shipping method is set
    let stripePaymentIntent: string | undefined;
    let stripePublishableKey: string | undefined;
    let stripeError: string | undefined;

    if (eligiblePaymentMethods.find((method) => method.code.includes('stripe'))) {
        try {
            const stripePaymentIntentResult = await createStripePaymentIntent({
                request,
            });
            stripePaymentIntent = stripePaymentIntentResult.createStripePaymentIntent ?? undefined;
            stripePublishableKey =
                'pk_test_51PHY56IqbXyMSGmjFTOB20RTYw23RdBIgZqhlYKlRRqny1flkuxlMuQYnHTqRIkzjJNYEHfv8PZn0YsBlSjV9f7c00XQahomn2';
        } catch (e: any) {
            console.error('Stripe error:', e);
            stripeError = e.message;
        }
    }
    const error = session.get('activeOrderError');

    return json({
        availableCountries,
        activeOrder,
        eligibleShippingMethods,
        stripePaymentIntent,
        error,
    });
};

export async function action({ params, request }: DataFunctionArgs) {
    const body = await request.formData();
    const action = body.get('action');
    const paymentMethodCode = body.get('paymentMethodCode');
    const paymentNonce = body.get('paymentNonce');

    // Handle different actions
    switch (action) {
        case 'transitionToState': {
            const { nextOrderStates } = await getNextOrderStates({ request });
            if (nextOrderStates.includes('ArrangingPayment')) {
                const transitionResult = await transitionOrderToState('ArrangingPayment', {
                    request,
                });
                if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
                    return json(
                        {
                            error: transitionResult.transitionOrderToState?.message,
                        },
                        { status: 400 },
                    );
                }
                return json({ success: true });
            }
            return json({ error: 'Cannot transition to ArrangingPayment' }, { status: 400 });
        }

        case 'refreshPaymentIntent': {
            try {
                const stripePaymentIntentResult = await createStripePaymentIntent({
                    request,
                });
                return json({
                    success: true,
                    stripePaymentIntent: stripePaymentIntentResult.createStripePaymentIntent,
                });
            } catch (error) {
                console.error('Failed to refresh payment intent:', error);
                return json(
                    { success: false, error: 'Failed to refresh payment' },
                    { status: 400 },
                );
            }
        }

        default: {
            if (typeof paymentMethodCode === 'string') {
                const result = await addPaymentToOrder(
                    { method: paymentMethodCode, metadata: { nonce: paymentNonce } },
                    { request },
                );
                if (result.addPaymentToOrder.__typename === 'Order') {
                    return { result };
                } else {
                    return json(
                        {
                            error: result.addPaymentToOrder?.message,
                        },
                        { status: 400 },
                    );
                }
            }
            return json({ error: 'Invalid action' }, { status: 400 });
        }
    }
}

export default function Checkout() {
    const data = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const [previousAmount, setPreviousAmount] = useState<number>(0);
    const availableCountries = data.availableCountries;
    const [addressFormChanged, setAddressFormChanged] = useState(false);
    const [customerFormChanged, setCustomerFormChanged] = useState(false);
    const debouncedAmount = useDebounce(data.activeOrder?.totalWithTax ?? 0, 300);

    useEffect(() => {
        const currentAmount = data.activeOrder?.totalWithTax ?? 0;

        // Check if amount has changed
        if (previousAmount !== 0 && previousAmount !== currentAmount) {
            console.log('Order amount changed:', {
                previous: previousAmount,
                current: currentAmount,
            });

            // Refresh payment intent
            fetcher.submit({ action: 'refreshPaymentIntent' }, { method: 'post' });
        }
        setPreviousAmount(currentAmount);
    }, [data.activeOrder?.totalWithTax]);

    const paymentIntent = data?.stripePaymentIntent || data.stripePaymentIntent;
    const elementsKey = `${paymentIntent}-${debouncedAmount}`;

    useEffect(() => {
        console.log('Checkout mounted with data:', {
            hasOrder: !!data.activeOrder,
            itemCount: data.activeOrder?.lines?.length,
        });
    }, [data.activeOrder, data]);

    const { eligibleShippingMethods, stripePaymentIntent, stripeError } = data;

    const { customer, shippingAddress } = data.activeOrder ?? {};
    const defaultFullName =
        shippingAddress?.fullName ?? (customer ? `${customer.firstName} ${customer.lastName}` : ``);
    const canProceedToPayment =
        shippingAddress?.streetLine1 &&
        shippingAddress?.postalCode &&
        data.activeOrder?.shippingLines?.length &&
        data.activeOrder?.lines?.length;

    function setShippingAddress(formData: FormData) {
        if (shippingFormDataIsValid(formData)) {
            fetcher.submit(formData, {
                method: 'post',
                action: '/api/active-order',
            });
            setAddressFormChanged(false);
        }
    }
    const submitCustomerForm = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const { emailAddress } = Object.fromEntries<any>(formData.entries());
        const isValid = event.currentTarget.checkValidity();
        if (customerFormChanged && isValid && emailAddress) {
            fetcher.submit(formData, {
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

    const submitSelectedShippingMethod = (value?: string) => {
        if (value) {
            fetcher.submit(
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

    return (
        <div className="mt-20 pb-[62px] ">
            <div className="">
                <h2 className="w-full mb-2 pb-2 text-[20px] font-thin justify-items-center text-center items-center rounded-full">
                    Checkout
                </h2>
            </div>

            <div className="mx-auto flex flex-col md:flex-row w-full gap-4">
                <div className="bg-[var(--primary1)] rounded-xl p-4 flex flex-col w-full">
                    <h2 className="text-lg font-semibold my-4 pb-4">Order Summary</h2>

                    {/* Cart Overview */}
                    {data.activeOrder?.totalQuantity && (
                        <CartContents
                            orderLines={data.activeOrder?.lines ?? []}
                            currencyCode={data.activeOrder?.currencyCode!}
                            editable={false}
                            removeItem={data.removeItem}
                            adjustOrderLine={data.adjustOrderLine}
                            data-oid="szvbl-2"
                        ></CartContents>
                    )}
                    <CartTotals order={data.activeOrder} />
                </div>

                {/* Left column - Forms */}
                <div className="rounded-xl mx-auto flex-row md:flex-col w-full">
                    <h2 className="text-lg font-semibold my-4 p-4">Email & Shipping Address</h2>
                    <Form
                        method="post"
                        action="/api/active-order"
                        onBlur={submitCustomerForm}
                        onChange={() => setCustomerFormChanged(true)}
                        hidden={undefined}
                    >
                        <input type="hidden" name="action" value="setOrderCustomer" />

                        <div className="">
                            <input
                                type="email"
                                id="emailAddress"
                                name="emailAddress"
                                autoComplete="email"
                                defaultValue={customer?.emailAddress}
                                placeholder="Email Address"
                                className="block py-3 px-4 w-full border-gray-200 rounded-[8px] border-[1px]"
                            />
                        </div>
                        {data.error?.errorCode === 'EMAIL_ADDRESS_CONFLICT_ERROR' && (
                            <p className="mt-2 text-sm text-red-600" id="email-error">
                                {data.error.message}
                            </p>
                        )}
                    </Form>
                    <Form
                        method="post"
                        action="/api/active-order"
                        onBlur={submitAddressForm}
                        onChange={() => setAddressFormChanged(true)}
                    >
                        <input type="hidden" name="action" value="setCheckoutShipping" />

                        <AddressForm
                            availableCountries={data.activeOrder ? availableCountries : undefined}
                            address={shippingAddress}
                            defaultFullName={defaultFullName}
                        ></AddressForm>
                    </Form>

                    {/* Shipping Method Selection */}
                    <h2 className="text-lg font-semibold mt-4 p-4">Choose Shipping Method</h2>
                    <ShippingMethodSelector
                        eligibleShippingMethods={eligibleShippingMethods}
                        currencyCode={data.activeOrder?.currencyCode}
                        shippingMethodId={
                            data.activeOrder?.shippingLines[0]?.shippingMethod.id ?? ''
                        }
                        onChange={submitSelectedShippingMethod}
                    />

                    <div className="">
                        <h2 className="text-lg font-semibold mt-4 p-4">Payment</h2>
                        {stripeError ? (
                            <div className="text-red-600">
                                <p className="font-bold">Payment initialization failed</p>
                                <p className="text-sm">{stripeError}</p>
                            </div>
                        ) : (
                            <Elements
                                stripe={stripePromise}
                                options={{
                                    clientSecret: stripePaymentIntent,
                                    fonts: [
                                        {
                                            family: 'Figtree',
                                            src: 'url(https://proud-voice-eead.christoph-cerjan.workers.dev/corsproxy/?apiurl=https://discobabes.store/src/assets/fonts/figtree-regular.woff2)',
                                            weight: '400',
                                        },
                                    ],
                                    appearance: {
                                        labels: 'floating',
                                        theme: 'stripe' as 'stripe',
                                        rules: {
                                            '.Input': {
                                                padding: '16px',
                                            },
                                            '.Label': {
                                                padding: '0px',
                                            },
                                        },

                                        variables: {
                                            colorPrimary: '#0570de',
                                            colorBackground: '#ffffff',
                                            colorText: '#30313d',
                                            colorDanger: '#df1b41',
                                            fontFamily: 'Figtree',
                                            spacingUnit: '4px',
                                            borderRadius: '8px',
                                        },
                                    },
                                }}
                                key={elementsKey} // Use the composite key
                            >
                                {canProceedToPayment ? (
                                    <PaymentForm
                                        orderId={data.activeOrder?.code ?? ''}
                                        amount={data.activeOrder?.totalWithTax ?? 0}
                                    />
                                ) : (
                                    <div className="text-sm text-gray-500 p-4">
                                        Please choose a shipping method
                                    </div>
                                )}
                            </Elements>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
