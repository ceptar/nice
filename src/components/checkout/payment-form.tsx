import { FormEvent, useEffect, useState } from 'react';
// import { ActionFunction, data, DataFunctionArgs } from '@remix-run/node';
// import { json } from '@remix-run/node'; // Change this
// import { redirect } from '@remix-run/node'; // Change this
import { useFetcher, useLoaderData, useNavigate, Form } from '@remix-run/react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { FadeIn } from '~/src/components/visual-effects';

export function PaymentForm({ orderId, amount }: { orderId: string; amount: number }) {
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
            // Always redirect to the confirmation page
            const { error: confirmError } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/success/${orderId}`,
                },
                redirect: 'always', // Force redirect
            });

            // We should never get here due to redirect
            if (confirmError) {
                setError(confirmError.message ?? 'Payment failed');
            }
        } catch (e: any) {
            setError(e.message ?? 'An unexpected error occurred');
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
            )}
            {error && <div className="text-red-600 text-sm">{error}</div>}
                            
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
