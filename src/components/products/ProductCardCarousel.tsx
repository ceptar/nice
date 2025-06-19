import { Price } from './Price';

export function ProductCardCarousel({ productAsset, productName, priceWithTax, currencyCode }) {
    return (
        <div className="break-inside-avoid flex flex-col h-full" data-oid="zkh2h_g">
            <img
                className="object-cover "
                alt=""
                src={productAsset?.preview + '?w=full'}
                data-oid="d3d4psj"
            ></img>
            <div className="relative w-full mx-auto bottom-0 left-0" data-oid="c:e6e0k">
                <div
                    className="text-center absolute bottom-0 left-0 w-fit h-fit bg-discogray text-white text-md p-1 font-light"
                    data-oid="06-dn8i"
                >
                    <Price
                        priceWithTax={priceWithTax}
                        currencyCode={currencyCode}
                        data-oid="64.lh3-"
                    />
                </div>
            </div>
            <div
                className="text-xl p-1 text-discogray uppercase tracking-wider font-light whitespace-nowrap overflow-hidden"
                data-oid="klek-ay"
            >
                {productName}
            </div>

            <div className="text-lg p-1 font-bold text-discogray" data-oid="1:27jx1"></div>
        </div>
    );
}
