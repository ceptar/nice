import { json } from "@remix-run/node"
import { DataFunctionArgs } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { LoaderFunction } from "@remix-run/node"
import { getOrderByCode } from "~/src/vendure/providers/orders/order"
import { formatPrice } from "~/src/vendure/utils/format-price"
import { CheckCircle } from "lucide-react"
import { Button } from "~/src/components/ui/button"
import { CartContents } from "~/src/components/cart-vendure/CartContents";
import { CartTotals } from "~/src/components/cart-vendure/CartTotals";


async function retryFetchOrder(orderCode: string, request: Request, retries: number = 5, delay: number = 1000): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const order = await getOrderByCode(orderCode, { request });
      return { order, error: false };
    } catch (ex) {
      if (i === retries - 1) {
        return { order: null, error: true };
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export async function loader({ params, request }: DataFunctionArgs) {
  const orderCode = params.orderCode!;
  const result = await retryFetchOrder(orderCode, request);
  return json(result);
}


export default function Success() {
  const data = useLoaderData<typeof loader>();

  const { order, error } = data

  if (error || !order) {
    return (
      <div className="mt-20 pb-[62px] ">
    <div className="">
    <h2 className="w-full mb-2 pb-2 text-[20px] font-thin justify-items-center text-center items-center rounded-full">
      Something went wrong
      </h2>
    </div>
          <p className="text-gray-600 mb-6">{error || "Unable to find your order"}</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>

    )
  }

  return (
    <div className="mt-20 pb-[62px] ">
    <div className="">
    <div className="w-full px-4 mb-2 pb-2 text-[20px] font-thin justify-items-center text-center items-center rounded-full">

          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been received.</p>
        </div>

        <div className="border-t border-b p-4 my-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Order Number:</span>
            <span>{order.code}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Date:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Email:</span>
            <span>{order.customer?.emailAddress || "Guest checkout"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-bold">{formatPrice(order.totalWithTax, order.currencyCode)}</span>
          </div>
        </div>

    <div className="bg-[var(--primary1)] rounded-xl p-4 flex flex-col w-full">
                            <h2 className="text-lg font-semibold my-4 pb-4">Order Summary</h2>
        
                            {/* Cart Overview */}
                            {order?.totalQuantity && (
                                <CartContents
                                orderLines={order?.lines ?? []}
                                currencyCode={order?.currencyCode!}
                                    editable={false}
                                    removeItem={undefined}
                                    adjustOrderLine={undefined}
                                    data-oid="szvbl-2"
                                ></CartContents>
                            )}
                            <CartTotals order={order} />
                        </div>

        <div className="text-center my-8">
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

