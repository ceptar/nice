import { FormEvent, useEffect, useState } from 'react';
// import { ActionFunction, data, DataFunctionArgs } from '@remix-run/node';
// import { json } from '@remix-run/node'; // Change this
// import { redirect } from '@remix-run/node'; // Change this
import { useFetcher, useLoaderData, useNavigate, Form } from '@remix-run/react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getActiveOrder } from '~/src/vendure/providers/orders/order';
import { getActiveCustomerAddresses } from '~/src/vendure/providers/customer/customer';
import { AddressForm } from '~/src/components/account/AddressForm';
import { shippingFormDataIsValid } from '~/src/vendure/utils/validation';
import { ShippingAddressSelector } from '~/src/components/checkout/ShippingAddressSelector';
import { ShippingMethodSelector } from '~/src/components/checkout/ShippingMethodSelector';
import { CartContents } from '~/src/components/cart-vendure/CartContents';
import { CartTotals } from '~/src/components/cart-vendure/CartTotals';
import type { LoaderFunction } from '@remix-run/node';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import {
    getAvailableCountries,
    getEligibleShippingMethods,
    addPaymentToOrder,
    createStripePaymentIntent,
    generateBraintreeClientToken,
    getEligiblePaymentMethods,
    getNextOrderStates,
    transitionOrderToState,
} from '~/src/vendure/providers/checkout/checkout';
import { StripePayments } from '~/src/components/checkout/sripe/StripePayments';
import { useOutletContext } from '@remix-run/react';
import { useDebounce } from '~/src/vendure/utils/use-debounce'
import { FadeIn } from '~/src/components/visual-effects';
import { OutletContext } from '~/src/vendure/types';
import { CurrencyCode, ErrorCode, ErrorResult } from '~/src/vendure/generated/graphql';
import { getSessionStorage } from '~/src/vendure/sessions';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
    'pk_test_51PHY56IqbXyMSGmjFTOB20RTYw23RdBIgZqhlYKlRRqny1flkuxlMuQYnHTqRIkzjJNYEHfv8PZn0YsBlSjV9f7c00XQahomn2',
);

type StripePaymentsProps = {
    clientSecret: string;
    orderCode: string;
};

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSessionStorage().then((sessionStorage) =>
        sessionStorage.getSession(request?.headers.get('Cookie')),
      );
      const activeOrder = await getActiveOrder({ request });

        if (!session || !activeOrder || !activeOrder.active || activeOrder.lines.length === 0) {
            console.log('Redirecting: No active order found', {
                hasSession: !!session,
                hasOrder: !!activeOrder,
                isActive: activeOrder?.active,
                lineCount: activeOrder?.lines?.length,
            });
            return redirect('/');
        }

        const { eligiblePaymentMethods } = await getEligiblePaymentMethods({ request });
         const error = session.get('activeOrderError');
        const { eligibleShippingMethods } = await getEligibleShippingMethods({ request });
        const { activeCustomer } = await getActiveCustomerAddresses({ request });
        const { availableCountries } = await getAvailableCountries({ request });

        let stripePaymentIntent: string | undefined;
        let stripePublishableKey: string | undefined;
        let stripeError: string | undefined;

        if (eligiblePaymentMethods.find((method) => method.code.includes('stripe'))) {
            try {
                const stripePaymentIntentResult = await createStripePaymentIntent({
                    request,
                });
                stripePaymentIntent =
                    stripePaymentIntentResult.createStripePaymentIntent ?? undefined;
                stripePublishableKey =
                    'pk_test_51PHY56IqbXyMSGmjFTOB20RTYw23RdBIgZqhlYKlRRqny1flkuxlMuQYnHTqRIkzjJNYEHfv8PZn0YsBlSjV9f7c00XQahomn2';
            } catch (e: any) {
                console.error('Stripe error:', e);
                stripeError = e.message;
            }
        }

        return json ({
            activeOrder,
            activeCustomer,
            availableCountries,
            eligibleShippingMethods,
            eligiblePaymentMethods,
            stripePaymentIntent,
            stripePublishableKey,
            stripeError,
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
                const transitionResult = await transitionOrderToState(
                    'ArrangingPayment',
                    { request }
                );
                if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
                    return json({ 
                        error: transitionResult.transitionOrderToState?.message 
                    }, { status: 400 });
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
                    stripePaymentIntent: stripePaymentIntentResult.createStripePaymentIntent
                });
            } catch (error) {
                console.error('Failed to refresh payment intent:', error);
                return json({ success: false, error: 'Failed to refresh payment' }, { status: 400 });
            }
        }

        default: {
            if (typeof paymentMethodCode === 'string') {
                const result = await addPaymentToOrder(
                    { method: paymentMethodCode, metadata: { nonce: paymentNonce } },
                    { request }
                );
                if (result.addPaymentToOrder.__typename === 'Order') {
                    return { result };
                } else {
                    return json({ 
                        error: result.addPaymentToOrder?.message 
                    }, { status: 400 });
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
    const outletContext = useOutletContext<OutletContext>();
    const { activeOrder, adjustOrderLine, removeItem, activeOrderFetcher } = outletContext;
    // const [customerFormChanged, setCustomerFormChanged] = useState(false);
    const [addressFormChanged, setAddressFormChanged] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const debouncedAmount = useDebounce(activeOrder?.totalWithTax ?? 0, 300);

    useEffect(() => {
        const currentAmount = data.activeOrder?.totalWithTax ?? 0;
        
        // Check if amount has changed
        if (previousAmount !== 0 && previousAmount !== currentAmount) {
            console.log('Order amount changed:', { previous: previousAmount, current: currentAmount });
            
            // Refresh payment intent
            fetcher.submit(
                { action: 'refreshPaymentIntent' },
                { method: 'post' }
            );
        }
        setPreviousAmount(currentAmount);
    }, [data.activeOrder?.totalWithTax]);

    const paymentIntent = data?.stripePaymentIntent || data.stripePaymentIntent;
    const elementsKey = `${paymentIntent}-${debouncedAmount}`;


    useEffect(() => {
        console.log('Checkout mounted with data:', {
            hasOrder: !!activeOrder,
            itemCount: activeOrder?.lines?.length,
        });
    }, [activeOrder, data]);

    const {
        activeCustomer,
        eligibleShippingMethods,
        eligiblePaymentMethods,
        stripePaymentIntent,
        stripeError,
        stripePublishableKey,
        } = data;

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

    // Early return if no order
    if (!activeOrder) {
        console.error('No active order found in data:', activeOrder);
        return (
            <div className="bg-red-50 p-4 rounded-md">
                <h2 className="text-red-800 font-semibold">No active order found</h2>
                <p className="text-sm text-red-600 mt-1">Please add items to your cart first.</p>
            </div>
        );
    }

    return (
        <div className="mt-20 pb-[62px] ">
            <div className="">
                <h2 className="w-full px-2 py-1 text-[20px] font-thin justify-items-center text-center items-center rounded-full">Checkout</h2>
            </div>
            <div className="mx-auto flex flex-col md:flex-row w-full gap-4">
                <div className="bg-[var(--primary1)] rounded-xl p-4 flex flex-col w-full">
                    <h2 className="text-lg font-semibold pb-4 my-4">Order Summary</h2>

                    {/* Cart Overview */}
                    {activeOrder?.totalQuantity && (
                        <CartContents
                        orderLines={activeOrder?.lines ?? []}
                        currencyCode={activeOrder?.currencyCode!}
                            editable={false}
                            removeItem={removeItem}
                            adjustOrderLine={adjustOrderLine}
                            data-oid="szvbl-2"
                        ></CartContents>
                    )}
                    <CartTotals order={data.activeOrder} />
                </div>
                <div className="rounded-xl mx-auto flex-row md:flex-col w-full">
                    <h2 className="text-lg font-semibold p-4 md:mt-4">Shipping Address</h2>

                    {/* Shipping Address Selection */}
                    <Form
                        method="post"
                        action="/api/active-order"
                        onBlur={submitAddressForm}
                        onChange={() => setAddressFormChanged(true)}
                    >
                        <input type="hidden" name="action" value="setCheckoutShipping" />

                        {/* { isSignedIn && activeCustomer.addresses?.length ? (
          <div>
            <ShippingAddressSelector
              addresses={activeCustomer.addresses}
              selectedAddressIndex={selectedAddressIndex}
              onChange={submitSelectedAddress}
            />
          </div>
        ) : ( */}
                        <AddressForm
                            availableCountries={activeOrder ? availableCountries : undefined}
                            address={shippingAddress}
                            defaultFullName={defaultFullName}
                        ></AddressForm>
                        {/* )} */}
                    </Form>

                    {/* Shipping Method Selection */}
                    <h2 className="text-lg font-semibold mt-4 p-4">Choose Shipping Method</h2>
                    <ShippingMethodSelector
                        eligibleShippingMethods={eligibleShippingMethods}
                        currencyCode={activeOrder?.currencyCode}
                        shippingMethodId={activeOrder?.shippingLines[0]?.shippingMethod.id ?? ''}
                        onChange={submitSelectedShippingMethod}
                    />

                    <div className="">
                        <h2 className="text-lg font-semibold my-4 p-4">Payment</h2>
                        {stripeError && canProceedToPayment ? (
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
                                            src: 'url(https://discobabes.store/src/assets/fonts/figtree-regular.woff2)',
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
                                <PaymentForm 
                                orderId={activeOrder?.code ?? ''}
                                amount={activeOrder?.totalWithTax ?? 0}
                                 />
                            </Elements>
                           
                        )}
             
                    </div>
                </div>
            </div>
        </div>
    );
  };

  function PaymentForm({ orderId, amount }: { orderId: string; amount: number }) {
    const [isLoading, setIsLoading] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const fetcher = useFetcher();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setError(null);

        try {
            // First transition to ArrangingPayment
            await fetcher.submit(
                { action: 'transitionToState' },
                { method: 'post' }
            );

            if (error) {
                throw new Error(error);
            }

            // Then confirm payment
            const { error: confirmError } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: location.origin + `/checkout/confirmation/${orderId}`,
                },
               
            });

            if (confirmError) {
                setError(confirmError.message ?? 'Payment failed');
            }
        } catch (e: any) {
            setError(e.message ?? 'An unexpected error occurred');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <FadeIn className="relative">
        <form onSubmit={handleSubmit} className="space-y-4">
            {isLoading &&
            (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
            )}:{(
             error && <div className="text-red-600 text-sm">{error}</div>)}
                            
            <PaymentElement
             onReady={() => setIsLoading(false)}
                options={{
                    layout: {
                        type: 'accordion',
                        defaultCollapsed: false,
                        radios: false,
                        spacedAccordionItems: true,
                    },
                }}
            />
            <button
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className="w-full bg-black text-white py-3 rounded-full hover:opacity-90 disabled:bg-gray-400"
            >
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
        </FadeIn>
    );
}
