import { ServerResponse } from 'http'
import { formatPrice } from '@framework/product/use-price'

export default function setCacheHeaders(res: ServerResponse, maxAge: number = 10, staleTime: number = 59000): void {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${staleTime}`
  )
}
