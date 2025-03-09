import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params, request }) => {
  console.log("Checkout confirmation params:", params);
  
  const url = new URL(request.url);
  const paymentIntent = url.searchParams.get("payment_intent");
  const orderCode = params.orderCode; // Should be CX4DVXW81KXZPD57
  
  console.log("Extracted orderCode:", orderCode);
  console.log("Extracted paymentIntent:", paymentIntent);

  if (!orderCode) {
    throw new Response("Order not found", { status: 404 });
  }

  const response = await fetch("https://proud-voice-eead.christoph-cerjan.workers.dev/corsproxy/?apiurl=https://discobabes.club/shop-api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query { orderByCode(code: "${orderCode}") { id code state totalWithTax } }`,
    }),
  });

  const result = await response.json();
  console.log("Vendure order response:", result);

  if (!result?.data?.orderByCode) {
    throw new Response("Order not found in Vendure", { status: 404 });
  }

  return json({ order: result.data.orderByCode, paymentIntent });
};

export default function CheckoutConfirmation() {
  const { order, paymentIntent } = useLoaderData<typeof loader>();
  
  console.log("Order received in frontend:", order);
  console.log("Payment Intent:", paymentIntent);

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Order Code: {order.code}</p>
      <p>Total: {order.totalWithTax / 100} EUR</p>
      <p>Payment Intent: {paymentIntent}</p>
    </div>
  );
}



// import { DataFunctionArgs, json } from '@remix-run/server-runtime';
// import { getOrderByCode } from '~/src/vendure/providers/orders/order';
// import { useLoaderData } from '@remix-run/react';
// import { addPaymentToOrder } from '~/src/vendure/providers/checkout/checkout';
// import { CartContents } from '~/src/components/cart-vendure/CartContents';
// import { CartTotals } from '~/src/components/cart-vendure/CartTotals';
// import { CircleCheckIcon as CheckCircleIcon, XCircleIcon, InfoIcon as InformationCircleIcon } from 'lucide-react';
// import { useRevalidator } from '@remix-run/react';
// import { useEffect, useState } from 'react';
// import { OrderDetailFragment } from '~/src/vendure/generated/graphql';

// export async function loader({ params, request }: DataFunctionArgs) {
//   try {
//     const order = await getOrderByCode(params.orderCode!, { request });
//     return {
//       order,
//       error: false,
//     };
//   } catch (ex) {
//     return {
//       order: null,
//       error: true,
//     };
//   }
// }

// export default function CheckoutConfirmation() {
//   const { order, error } = useLoaderData<typeof loader>();
//   const revalidator = useRevalidator();
//   const [retries, setRetries] = useState(1);

//   const orderNotFound = !order && !error;
//   const orderErrored = !order && error;
//   const maxRetries = 5;
//   const retriesExhausted = retries >= maxRetries;
//   const retryTimeout = 2500;

//   const retry = () => {
//     if (!window) return;
//     setRetries(retries + 1);
//     window.setTimeout(() => {
//       if (retries > maxRetries) return;
//       revalidator.revalidate();
//     }, retryTimeout);
//   };

//   useEffect(() => {
//     if (orderErrored) {
//       retry();
//     }
//   }, [order]);

//   useEffect(() => {
//     if (
//       revalidator.state === 'idle' &&
//       orderErrored &&
//       retries <= maxRetries &&
//       retries > 1
//     ) {
//       retry();
//     }
//   }, [revalidator.state]);

//   if (orderNotFound) {
//     return (
//       <div>
//         <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
//           Order not found.
//         </h2>
//       </div>
//     );
//   }

//   if (orderErrored && retriesExhausted) {
//     return (
//       <div>
//         <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
//           <XCircleIcon className="text-red-600 w-8 h-8 sm:w-12 sm:h-12"></XCircleIcon>
//           <span>Error</span>
//         </h2>
//         <p className="text-lg text-gray-700">
//           Error, couldnt place Order.
//         </p>
//       </div>
//     );
//   }

//   if (orderErrored) {
//     return (
//       <div>
//         <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
//           ...processing
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
//         <CheckCircleIcon className="text-green-600 w-8 h-8 sm:w-12 sm:h-12"></CheckCircleIcon>
//         <span>Summary</span>
//       </h2>
//       <p className="text-lg text-gray-700">
//         Success!
//         <span className="font-bold">{order!.code}</span>
//       </p>
//       {order!.active && (
//         <div className="rounded-md bg-blue-50 p-4 my-8">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <InformationCircleIcon
//                 className="h-5 w-5 text-blue-400"
//                 aria-hidden="true"
//               />
//             </div>
//             <div className="ml-3 flex-1 md:flex md:justify-between">
//               <p className="text-sm text-blue-700">
//                 Payment settled.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="mt-12">
//         <div className="mb-6">
//           <CartContents
//             orderLines={order!.lines}
//             currencyCode={order!.currencyCode}
//             editable={false}
//           />
//         </div>
//         <CartTotals order={order as OrderDetailFragment}></CartTotals>
//       </div>
//     </div>
//   );
// }