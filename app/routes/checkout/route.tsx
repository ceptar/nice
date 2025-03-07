import { FormEvent, useEffect, useState } from 'react';
import { useFetcher, useLoaderData, useNavigate, Form, useOutletContext } from '@remix-run/react';
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
import { OutletContext } from '~/src/vendure/types'; 
import { StripePayments } from '~/src/components/checkout/sripe/StripePayments';
import { CurrencyCode, ErrorCode, ErrorResult } from '~/src/vendure/generated/graphql';
import { getSessionStorage } from '~/src/vendure/sessions';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PHY56IqbXyMSGmjFTOB20RTYw23RdBIgZqhlYKlRRqny1flkuxlMuQYnHTqRIkzjJNYEHfv8PZn0YsBlSjV9f7c00XQahomn2');

type CheckoutProps = {
  clientSecret: string;
  orderCode: string;
}

export async function loader({ request }: DataFunctionArgs) {
    const session = await getSessionStorage().then((sessionStorage) =>
      sessionStorage.getSession(request?.headers.get('Cookie')),
    );
  
    const activeOrder = await getActiveOrder({ request });
  
    //check if there is an active order if not redirect to homepage
    if (
      !session ||
      !activeOrder ||
      !activeOrder.active ||
      activeOrder.lines.length === 0
    ) {
      return redirect('/');
    }
        // Add payment intent creation
        const { eligiblePaymentMethods } = await getEligiblePaymentMethods({ request });
        let stripePaymentIntent;
        
        if (eligiblePaymentMethods.find((method) => method.code.includes('stripe'))) {
            const result = await createStripePaymentIntent({ request });
            stripePaymentIntent = result.createStripePaymentIntent;
        }
    const { availableCountries } = await getAvailableCountries({ request });
    const { eligibleShippingMethods } = await getEligibleShippingMethods({
      request,
    });
    const { activeCustomer } = await getActiveCustomerAddresses({ request });

    return json({
      availableCountries,
      eligibleShippingMethods,
      activeCustomer,
      stripePaymentIntent,
      error: session.get('activeOrderError'),
    });
  }

  export async function action({ params, request }: DataFunctionArgs) {
    const body = await request.formData();
    const paymentMethodCode = body.get('paymentMethodCode');
    const paymentNonce = body.get('paymentNonce');
  
    if (typeof paymentMethodCode !== 'string' || typeof paymentNonce !== 'string') {
      throw new Response('Invalid payment data', { status: 400 });
    }
  
    try {
      const { nextOrderStates } = await getNextOrderStates({ request });
      
      if (nextOrderStates.includes('ArrangingPayment')) {
        const transitionResult = await transitionOrderToState(
          'ArrangingPayment',
          { request }
        );
        
        if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
          throw new Error(transitionResult.transitionOrderToState?.message);
        }
      }
  
      const result = await addPaymentToOrder(
        { 
          method: paymentMethodCode, 
          metadata: { 
            nonce: paymentNonce 
          } 
        },
        { request }
      );
  
      if (result.addPaymentToOrder.__typename === 'Order') {
        return redirect(`/checkout/confirmation/${result.addPaymentToOrder.code}`);
      } else {
        throw new Error(result.addPaymentToOrder?.message);
      }
    } catch (error: any) {
      console.error('Payment processing error:', error);
      throw new Response(error.message, { status: 400 });
    }
  }
  
  export default function Checkout({ orderCode }: CheckoutProps) {
    const data = useLoaderData<typeof loader>();
    const { availableCountries, eligibleShippingMethods, activeCustomer, error } =
      useLoaderData<typeof loader>();
    const { activeOrderFetcher, activeOrder } = useOutletContext<OutletContext>();
    const [customerFormChanged, setCustomerFormChanged] = useState(false);
    const [addressFormChanged, setAddressFormChanged] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
 
const clientSecret = data!.stripePaymentIntent;

    const { customer, shippingAddress } = activeOrder ?? {};
    const isSignedIn = !!activeCustomer?.id;
    const addresses = activeCustomer?.addresses ?? [];
    const defaultFullName =
      shippingAddress?.fullName ??
      (customer ? `${customer.firstName} ${customer.lastName}` : ``);
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

        return (
        <div className="pt-24 pb-24 ">
            <div className="">
                <h2 className="text-lg font-semibold mb-6">Checkout</h2>
            </div>
            <div className="mx-auto flex flex-col md:flex-row w-full gap-8">
                <div className="bg-[var(--primary1)] rounded-xl p-4 flex flex-col w-full">
                    <h2 className="text-lg font-semibold pb-4 my-4">Order Summary</h2>

                    {/* Cart Overview */}
                    {activeOrder?.totalQuantity && (
                        <CartContents
                            orderLines={activeOrder?.lines ?? []}
                            currencyCode={activeOrder?.currencyCode!}
                            editable={false}
                            removeItem={undefined}
                            adjustOrderLine={undefined}
                            data-oid="szvbl-2"
                        ></CartContents>
                      )}
                    <CartTotals order={activeOrder} />
                 
                </div>
                <div className="rounded-xl mx-auto flex-row md:flex-col w-full">
                    <h2 className="text-lg font-semibold p-4 my-4">Shipping Address</h2>

                    {/* Shipping Address Selection */}
                    <Form
                        method="post"
                        action="/api/active-order"
                        onBlur={submitAddressForm}
                        onChange={() => setAddressFormChanged(true)}
                    >
                        <input type="hidden" name="action" value="setCheckoutShipping" />

                        <AddressForm
                            availableCountries={activeOrder ? availableCountries : undefined}
                            address={shippingAddress}
                            defaultFullName={defaultFullName}
                        ></AddressForm>
                    </Form>

                    {/* Shipping Method Selection */}
                    <h2 className="text-lg font-semibold mt-4 p-4">Choose Shipping Method</h2>
                    <ShippingMethodSelector
                        eligibleShippingMethods={eligibleShippingMethods}
                        currencyCode={activeOrder?.currencyCode}
                        shippingMethodId={activeOrder?.shippingLines[0]?.shippingMethod.id ?? ''}
                        onChange={submitSelectedShippingMethod}
                    />

<div className="mt-8">
                <h2 className="text-lg font-semibold mb-4 p-4">Payment</h2>
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: data.stripePaymentIntent,
                        appearance: {
                            theme: 'stripe',
                            variables: {
                                colorPrimary: '#0570de',
                                borderRadius: '8px',
                            },
                        },
                    }}
                >
              <StripePayments
              orderCode={activeOrder?.code ?? ''}
              clientSecret={clientSecret!}
            ></StripePayments>


                </Elements>
            </div>                      
             
                    </div>
                </div>
            </div>
        );
      }


// const stripePromise = loadStripe('pk_test_51PHY56IqbXyMSGmjFTOB20RTYw23RdBIgZqhlYKlRRqny1flkuxlMuQYnHTqRIkzjJNYEHfv8PZn0YsBlSjV9f7c00XQahomn2');

// // live data
// // const stripePromise = loadStripe('pk_live_51PHY56IqbXyMSGmjfiHNgFGqrsy8kOM5RkNvKY62adXSjIVv5zSlP7QHE0xWVdacGRZ32bnvCnmaKqPo17ojDHdN00drHeJ6Ac');


// export const loader: LoaderFunction = async ({ request }) => {
//     try {
//         const session = await getSessionStorage().then((sessionStorage) =>
//             sessionStorage.getSession(request?.headers.get('Cookie')),
//         );
//         const activeOrder = await getActiveOrder({ request });

//         if (!session || !activeOrder || !activeOrder.active || activeOrder.lines.length === 0) {
//             console.log('Redirecting: No active order found', {
//                 hasSession: !!session,
//                 hasOrder: !!activeOrder,
//                 isActive: activeOrder?.active,
//                 lineCount: activeOrder?.lines?.length,
//             });
//             return redirect('/');
//         }

//         const { eligiblePaymentMethods } = await getEligiblePaymentMethods({ request });
//         const { eligibleShippingMethods } = await getEligibleShippingMethods({ request });
//         const { activeCustomer } = await getActiveCustomerAddresses({ request });
//         const { availableCountries } = await getAvailableCountries({ request });

//         let stripePaymentIntent: string | undefined;
//         let stripePublishableKey: string | undefined;
//         let stripeError: string | undefined;

//         if (eligiblePaymentMethods.find((method) => method.code.includes('stripe'))) {
//             try {
//                 const stripePaymentIntentResult = await createStripePaymentIntent({
//                     request,
//                 });
//                 stripePaymentIntent =
//                     stripePaymentIntentResult.createStripePaymentIntent ?? undefined;
//                 stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
//             } catch (e: any) {
//                 console.error('Stripe error:', e);
//                 stripeError = e.message;
//             }
//         }

//         const data = {
//             activeOrder,
//             activeCustomer,
//             availableCountries,
//             eligibleShippingMethods,
//             eligiblePaymentMethods,
//             stripePaymentIntent,
//             stripePublishableKey,
//             stripeError,
//             error: session.get('activeOrderError'),
//         };

//         console.log('Loader data:', {
//             hasOrder: !!data.activeOrder,
//             hasCustomer: !!data.activeCustomer,
//             shippingMethods: data.eligibleShippingMethods?.length,
//             paymentMethods: data.eligiblePaymentMethods?.length,
//             hasStripe: !!data.stripePaymentIntent,
//         });

//         return json(data);
//     } catch (error) {
//         console.error('Loader error:', error);
//         throw new Response('Error loading checkout data', { status: 500 });
//     }
// };

// export async function action({ params, request }: DataFunctionArgs) {
//     const body = await request.formData();
//     const action = body.get('action');

//     if (action === 'refreshPaymentIntent') {
//         try {
//             const stripePaymentIntentResult = await createStripePaymentIntent({
//                 request,
//             });
            
//             if (!stripePaymentIntentResult.createStripePaymentIntent) {
//                 throw new Error('Failed to create new payment intent');
//             }

//             return json({
//                 success: true,
//                 stripePaymentIntent: stripePaymentIntentResult.createStripePaymentIntent
//             });
//         } catch (error) {
//             console.error('Failed to refresh payment intent:', error);
//             return json({ 
//                 success: false, 
//                 error: 'Failed to refresh payment' 
//             }, { status: 400 });
//         }
//     }
//     const paymentMethodCode = body.get('paymentMethodCode');
//     const paymentNonce = body.get('paymentNonce');
//     if (typeof paymentMethodCode === 'string') {
//         const { nextOrderStates } = await getNextOrderStates({
//             request,
//         });
//         if (nextOrderStates.includes('ArrangingPayment')) {
//             const transitionResult = await transitionOrderToState('ArrangingPayment', { request });
//             if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
//                 throw new Response('Not Found', {
//                     status: 400,
//                     statusText: transitionResult.transitionOrderToState?.message,
//                 });
//             }
//         }

//         const result = await addPaymentToOrder(
//             { method: paymentMethodCode, metadata: { nonce: paymentNonce } },
//             { request },
//         );
//         if (result.addPaymentToOrder.__typename === 'Order') {
//             return redirect(`/checkout/confirmation/${result.addPaymentToOrder.code}`);
//         } else {
//             throw new Response('Not Found', {
//                 status: 400,
//                 statusText: result.addPaymentToOrder?.message,
//             });
//         }
//     };
// };

// export default function Checkout(){
//     const data = useLoaderData<typeof loader>();
//     const fetcher = useFetcher();
//     const [previousAmount, setPreviousAmount] = useState<number>(0);

//     const availableCountries = data.availableCountries;
//     const context = useOutletContext<OutletContext>();
//     const activeOrderFetcher = context.activeOrderFetcher;
//     const activeOrder = context.activeOrder;
//     // const [customerFormChanged, setCustomerFormChanged] = useState(false);
//     const [addressFormChanged, setAddressFormChanged] = useState(false);
//     const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

//     useEffect(() => {
//         const currentAmount = activeOrder?.totalWithTax ?? 0;
        
//         if (previousAmount !== 0 && previousAmount !== currentAmount) {
//             console.log('Cart amount changed:', { 
//                 previous: previousAmount, 
//                 current: currentAmount 
//             });
//             // Refresh payment intent
//             fetcher.submit(
//                 { action: 'refreshPaymentIntent' },
//                 { method: 'post' }
//             );
//         }
//         setPreviousAmount(currentAmount);
//     }, [activeOrder?.totalWithTax, previousAmount, fetcher]);

//     useEffect(() => {
//         if ((fetcher.data as { stripePaymentIntent?: string })?.stripePaymentIntent) {
//             console.log('Payment intent refreshed:', {
//                 hasNewIntent: !!(fetcher.data as { stripePaymentIntent?: string }).stripePaymentIntent,
//                 amount: activeOrder?.totalWithTax
//             });
//         }
//     }, [fetcher.data, activeOrder?.totalWithTax]);

//     const paymentIntent = (fetcher.data as any)?.stripePaymentIntent || data.stripePaymentIntent;
//     const elementsKey = `${paymentIntent}-${activeOrder?.totalWithTax}`;


//     useEffect(() => {
//         console.log('Checkout mounted with data:', {
//             hasOrder: !!activeOrder,
//             itemCount: activeOrder?.lines?.length,
//         });
//     }, [activeOrder, data]);

//     const {
//         activeCustomer,
//         eligibleShippingMethods,
//         stripePaymentIntent,
//         stripeError,
//         stripePublishableKey,
//     } = data;

//     const { customer, shippingAddress } = activeOrder ?? {};
//     const isSignedIn = !!activeCustomer?.id;
//     const addresses = activeCustomer?.addresses ?? [];
//     const defaultFullName =
//         shippingAddress?.fullName ?? (customer ? `${customer.firstName} ${customer.lastName}` : ``);
//     const canProceedToPayment =
//         customer &&
//         ((shippingAddress?.streetLine1 && shippingAddress?.postalCode) ||
//             selectedAddressIndex != null) &&
//         activeOrder?.shippingLines?.length &&
//         activeOrder?.lines?.length;

//     const submitAddressForm = (event: FormEvent<HTMLFormElement>) => {
//         const formData = new FormData(event.currentTarget);
//         const isValid = event.currentTarget.checkValidity();
//         if (addressFormChanged && isValid) {
//             setShippingAddress(formData);
//         }
//     };
//     const submitSelectedAddress = (index: number) => {
//         const selectedAddress = activeCustomer?.addresses?.[index];
//         if (selectedAddress) {
//             setSelectedAddressIndex(index);
//             const formData = new FormData();
//             Object.keys(selectedAddress).forEach((key) =>
//                 formData.append(key, (selectedAddress as any)[key]),
//             );
//             formData.append('countryCode', selectedAddress.country.code);
//             formData.append('action', 'setCheckoutShipping');
//             setShippingAddress(formData);
//         }
//     };

//     function setShippingAddress(formData: FormData) {
//         if (shippingFormDataIsValid(formData)) {
//             activeOrderFetcher.submit(formData, {
//                 method: 'post',
//                 action: '/api/active-order',
//             });
//             setAddressFormChanged(false);
//         }
//     }

//     const submitSelectedShippingMethod = (value?: string) => {
//         if (value) {
//             activeOrderFetcher.submit(
//                 {
//                     action: 'setShippingMethod',
//                     shippingMethodId: value,
//                 },
//                 {
//                     method: 'post',
//                     action: '/api/active-order',
//                 },
//             );
//         }
//     };

//     // Early return if no order
//     if (!activeOrder) {
//         console.error('No active order found in data:', activeOrder);
//         return (
//             <div className="bg-red-50 p-4 rounded-md">
//                 <h2 className="text-red-800 font-semibold">No active order found</h2>
//                 <p className="text-sm text-red-600 mt-1">Please add items to your cart first.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="pt-24 pb-24 ">
//             <div className="">
//                 <h2 className="text-lg font-semibold mb-6">Checkout</h2>
//             </div>
//             <div className="mx-auto flex flex-col md:flex-row w-full gap-4">
//                 <div className="bg-[var(--primary1)] rounded-xl p-4 flex flex-col w-full">
//                     <h2 className="text-lg font-semibold pb-4 my-4">Order Summary</h2>

//                     {/* <pre className="text-xs text-gray-500 mb-4">
//         {JSON.stringify({
//           hasOrder: !!activeOrder,
//           itemCount: activeOrder?.lines?.length,
//           hasCustomer: !!activeCustomer,
//           hasShipping: !!eligibleShippingMethods?.length,
//           hasPayment: !!stripePaymentIntent?.clientSecret
//         }, null, 2)}
//       </pre> */}

//                     {/* Cart Overview */}
//                     {activeOrder?.totalQuantity && (
//                         <CartContents
//                             orderLines={activeOrder?.lines ?? []}
//                             currencyCode={activeOrder?.currencyCode!}
//                             editable={false}
//                             removeItem={undefined}
//                             adjustOrderLine={undefined}
//                             data-oid="szvbl-2"
//                         ></CartContents>
//                     )}
//                     <CartTotals order={activeOrder} />
//                 </div>
//                 <div className="rounded-xl mx-auto flex-row md:flex-col w-full">
//                     <h2 className="text-lg font-semibold p-4 md:mt-4">Shipping Address</h2>

//                     {/* Shipping Address Selection */}
//                     <Form
//                         method="post"
//                         action="/api/active-order"
//                         onBlur={submitAddressForm}
//                         onChange={() => setAddressFormChanged(true)}
//                     >
//                         <input type="hidden" name="action" value="setCheckoutShipping" />

//                         {/* { isSignedIn && activeCustomer.addresses?.length ? (
//           <div>
//             <ShippingAddressSelector
//               addresses={activeCustomer.addresses}
//               selectedAddressIndex={selectedAddressIndex}
//               onChange={submitSelectedAddress}
//             />
//           </div>
//         ) : ( */}
//                         <AddressForm
//                             availableCountries={activeOrder ? availableCountries : undefined}
//                             address={shippingAddress}
//                             defaultFullName={defaultFullName}
//                         ></AddressForm>
//                         {/* )} */}
//                     </Form>

//                     {/* Shipping Method Selection */}
//                     <h2 className="text-lg font-semibold mt-4 p-4">Choose Shipping Method</h2>
//                     <ShippingMethodSelector
//                         eligibleShippingMethods={eligibleShippingMethods}
//                         currencyCode={activeOrder?.currencyCode}
//                         shippingMethodId={activeOrder?.shippingLines[0]?.shippingMethod.id ?? ''}
//                         onChange={submitSelectedShippingMethod}
//                     />

//                     <div className="">
//                         <h2 className="text-lg font-semibold my-4 p-4">Payment</h2>
//                         {stripeError && canProceedToPayment ? (
//                             <div className="text-red-600">
//                                 <p className="font-bold">Payment initialization failed</p>
//                                 <p className="text-sm">{stripeError}</p>
//                             </div>
//                         ) : (
                
//                             <Elements
//                                 stripe={stripePromise}
//                                 options={{
//                                     clientSecret: stripePaymentIntent,
//                                     fonts: [
//                                         {
//                                             family: 'Figtree',
//                                             src: 'url(https://discobabes.store/src/assets/fonts/figtree-regular.woff2)',
//                                             weight: '400',
//                                         },
//                                     ],
//                                     appearance: {
//                                         labels: 'floating',
//                                         theme: 'stripe' as 'stripe',
//                                         rules: {
//                                             '.Input': {
//                                                 padding: '16px',
//                                             },
//                                             '.Label': {
//                                                 padding: '0px',
//                                             },
//                                         },

//                                         variables: {
//                                             colorPrimary: '#0570de',
//                                             colorBackground: '#ffffff',
//                                             colorText: '#30313d',
//                                             colorDanger: '#df1b41',
//                                             fontFamily: 'Figtree',
//                                             spacingUnit: '4px',
//                                             borderRadius: '8px',
//                                         },
//                                     },
//                                 }}
//                                 key={elementsKey} // Use the composite key

//                             >
//                                 <PaymentForm 
//                                 orderId={activeOrder?.code ?? ''}
//                                 amount={activeOrder?.totalWithTax ?? 0}
//                                 publishableKey={stripePublishableKey}
//                                />
//                             </Elements>
                           
//                         )}
             
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// function PaymentForm({
//     publishableKey,
//     orderId,
//     amount,
//   }: {
//     publishableKey: string;
//     orderId: string;
//     amount: number;
//   }) {
//     const orderCode = orderId
//     const stripe = useStripe();
//     const elements = useElements();
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();
//     const fetcher = useFetcher();


//     useEffect(() => {
//         console.log('Payment amount changed:', amount);
//     }, [amount]);

//     const handleSubmit = async (event: FormEvent) => {
//         event.preventDefault();
//         if (!stripe || !elements) return;

//         setIsProcessing(true);
//         setError(null);

//         try {
//             const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
//                 elements,
//                 confirmParams: {
//                     return_url: `${window.location.origin}/checkout/confirmation/${orderId}`,
//                 },
//                 redirect: 'if_required',
//             });

//             if (confirmError) {
//                 setError(confirmError.message ?? 'Payment failed');
//                 setIsProcessing(false);
//                 return;
//             }

//             if (paymentIntent?.status === 'succeeded') {
//                 fetcher.submit(
//                     {
//                         action: 'addPayment',
//                         method: 'stripe',
//                         metadata: JSON.stringify({
//                             paymentIntentId: paymentIntent.id,
//                             status: paymentIntent.status,
//                         }),
//                     },
//                     { method: 'post' },
//                 );
//                 navigate(`/checkout/confirmation/${orderCode}`);
//             }
//         } catch (e: any) {
//             setError(e.message ?? 'An unexpected error occurred');
//             setIsProcessing(false);
//         }
//     };
    
//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             {error && <div className="text-red-600 text-sm">{error}</div>}
//             <PaymentElement
//                 options={{
//                     layout: {
//                         type: 'accordion',
//                         defaultCollapsed: false,
//                         radios: false,
//                         spacedAccordionItems: true,
//                     },
//                 }}
//             />
//             <button
//                 type="submit"
//                 disabled={isProcessing || !stripe || !elements}
//                 className="w-full bg-black text-white py-3 rounded-full hover:opacity-90 disabled:bg-gray-400"
//             >
//                 {isProcessing ? 'Processing...' : 'Pay Now'}
//             </button>
//         </form>
//     );
// }
//
