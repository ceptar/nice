import { json } from "@remix-run/node"
import { DataFunctionArgs } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { LoaderFunction } from "@remix-run/node"
import { getOrderByCode } from "~/src/vendure/providers/orders/order"
import { formatPrice } from "~/src/vendure/utils/format-price"
import { CheckCircle } from "lucide-react"
import { Button } from "~/src/components/ui/button"

export async function loader({ params, request }: DataFunctionArgs) {
  try {
    const order = await getOrderByCode(params.orderCode!, { request });
    return {
      order,
      error: false,
    };
  } catch (ex) {
    return {
      order: null,
      error: true,
    };
  }
}

export default function Success() {
  const data = useLoaderData<typeof loader>();

  const { order, error } = data

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error || "Unable to find your order"}</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been received.</p>
        </div>

        <div className="border-t border-b py-4 my-6">
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

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="divide-y">
Placeholder Orderlines
          </div>
        </div>

        <div className="text-center">
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

