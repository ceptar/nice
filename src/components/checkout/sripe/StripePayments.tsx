import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CheckoutForm } from './CheckoutForm';

const stripePromise = getStripe('pk_test_....wr83u');

type StripePaymentsProps = {
  clientSecret: string;
  orderCode: string;
}

export function StripePayments({ clientSecret, orderCode }: StripePaymentsProps) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  }
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm orderCode={orderCode} />
    </Elements>
  );
}