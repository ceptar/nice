import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CheckoutForm } from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PHY56IqbXyMSGmjFTOB20RTYw23RdBIgZqhlYKlRRqny1flkuxlMuQYnHTqRIkzjJNYEHfv8PZn0YsBlSjV9f7c00XQahomn2');

type StripePaymentsProps = {
  clientSecret: string;
  orderCode: string;
}

export function StripePayments({ clientSecret, orderCode }: StripePaymentsProps) {

  return (
    <Elements stripe={stripePromise} 
    
   options={{
    clientSecret: clientSecret,
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
    
    >
      <CheckoutForm 
      orderCode={orderCode}
      />
    </Elements>
  );
}