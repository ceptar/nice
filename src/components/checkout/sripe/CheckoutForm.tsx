import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { CreditCard as CreditCardIcon } from 'lucide-react';
import { useFetcher } from '@remix-run/react';

export const CheckoutForm = ({ orderCode }: { orderCode: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetcher = useFetcher();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: location.origin + `/checkout/confirmation/${orderCode}`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message ?? 'Payment failed');
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        fetcher.submit(
          {
            paymentMethodCode: 'stripe',
            paymentNonce: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              status: paymentIntent.status
            })
          },
          { method: 'post' }
        );
      }
    } catch (e: any) {
      setError(e.message ?? 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="text-red-600 text-sm mb-4">{error}</div>
      )}
      <PaymentElement 
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
        disabled={isProcessing || !stripe}
        className="items-center justify-center flex flex-row w-full bg-black text-white mt-8 py-4 rounded-full hover:opacity-90 disabled:bg-gray-400"
      >
        <div className="flex flex-col"><CreditCardIcon className="w-5 h-5" /></div>
        <div className="flex flex-col pl-2">
          {isProcessing ? 'Processing...' : 'Pay'}
        </div>
      </button>
    </form>
  );
};




// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from '@stripe/react-stripe-js';
// import { FormEvent } from 'react';
// import { CreditCard as CreditCardIcon } from 'lucide-react';

// export const CheckoutForm = ({ orderCode }: { orderCode: string }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event: FormEvent) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: location.origin + `/checkout/confirmation/${orderCode}`,
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement 
//                   options={{
//                     layout: {
//                         type: 'accordion',
//                         defaultCollapsed: false,
//                         radios: false,
//                         spacedAccordionItems: true,
//                     },
//                 }}
//       />
//       <button
//         disabled={!stripe}
//         className="items-center justify-center flex flex-row w-full bg-black text-white mt-8 py-4 rounded-full hover:opacity-90 disabled:bg-gray-400"
// >
        
//         <div className="flex flex-col"><CreditCardIcon className="w-5 h-5" /></div>
//         <div className="flex flex-col pl-2">Pay</div>
//       </button>
//     </form>
//   );
// };

