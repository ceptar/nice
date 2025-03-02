import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FormEvent } from 'react';
import { CreditCard as CreditCardIcon } from 'lucide-react';
//   import { useTranslation } from 'react-i18next';

export const CheckoutForm = ({ orderCode }: { orderCode: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    // const { t } = useTranslation();

    const handleSubmit = async (event: FormEvent) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: location.origin + `/checkout/confirmation/${orderCode}`,
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    return (
        <form onSubmit={handleSubmit} data-oid="9owp4u:">
            <PaymentElement data-oid="f-pw645" />
            <button
                disabled={!stripe}
                className="flex w-full px-6 bg-gray-800 rounded-lg hover:bg-opacity-70 items-center justify-center space-x-2 py-3 my-4 border border-transparent uppercase tracking-wider text-base font-medium shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                data-oid="1co7mqm"
            >
                <CreditCardIcon className="w-5 h-5" data-oid="6ffotud"></CreditCardIcon>
                <span data-oid="jn0:hp0">Pay</span>
            </button>
        </form>
    );
};
