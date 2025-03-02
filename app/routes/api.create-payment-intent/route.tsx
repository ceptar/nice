import { Stripe } from 'stripe';

const stripe = new Stripe(
    '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',
);

export async function createPaymentIntent(
    amount: number,
    shipping?: Stripe.PaymentIntentCreateParams.Shipping,
) {
    return await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        shipping,
    });
}

export async function retrievePaymentIntent(id: string) {
    return await stripe.paymentIntents.retrieve(id);
}
