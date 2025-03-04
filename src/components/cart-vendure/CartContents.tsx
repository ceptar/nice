import { Form, Link, useFetcher, useOutletContext } from '@remix-run/react';
import { Price } from '~/src/components/products/Price';
import { ActiveOrderQuery, CurrencyCode } from '~/src/vendure/generated/graphql';

export function CartContents({
    orderLines,
    currencyCode,
    editable = true,
    adjustOrderLine,
    removeItem,
}: {
    orderLines: NonNullable<ActiveOrderQuery['activeOrder']>['lines'];
    currencyCode: CurrencyCode;
    editable: boolean;
    adjustOrderLine?: (lineId: string, quantity: number) => void;
    removeItem?: (lineId: string) => void;
}) {
    const isEditable = editable !== false;
    return (
        <div className="flow-root" data-oid="qkda56c">
            <ul role="list" className="-my-4 " data-oid="kq7nxan">
                {(orderLines ?? []).map((line) => (
                    <li key={line.id} className="py-4 flex" data-oid="xoh0q7a">
                        <div
                            className="flex-shrink-0 w-24 h-32 border-[1px] border-gray-200 object-center object-cover items-center justify-center overflow-hidden"
                            data-oid="g5hu_-9"
                        >
                            <img
                                src={
                                    line.featuredAsset?.preview +
                                    '?q=95&w=150&h=210&mode=crop&fpx=0.5&fpy=0.5'
                                }
                                alt={line.productVariant.name}
                                className="flex w-full h-auto object-center object-cover"
                                data-oid="7r3s-lu"
                            ></img>
                        </div>

                        <div className="ml-4 flex-1 flex flex-col" data-oid="ga:dzub">
                            <div data-oid="rdd8atw">
                                <div className="flex justify-between" data-oid="t75rzkc">
                                    <h3 data-oid="3n6objg">
                                        <Link
                                            to={`/products/${line.productVariant.product.slug}`}
                                            data-oid="kd6msyc"
                                        >
                                            {line.productVariant.name}
                                        </Link>
                                    </h3>
                                    <p className="ml-4" data-oid="x8-yype">
                                        <Price
                                            priceWithTax={line.linePriceWithTax}
                                            currencyCode={currencyCode}
                                            data-oid="rgx1_vn"
                                        ></Price>
                                    </p>
                                </div>
                            </div>
                            <div
                                className="flex-1 flex items-center text-sm py-4"
                                data-oid="ud5-vx:"
                            >
                                <div
                                    className="flex flex-row items-start text-sm h-full w-full"
                                    data-oid="xkgm3bw"
                                >
                                    {editable ? (
                                        <Form data-oid="t1uop58">
                                            <label
                                                htmlFor={`quantity-${line.id}`}
                                                className="mr-2"
                                                data-oid="-60h3ts"
                                            >
                                                Quantity
                                            </label>
                                            <select
                                                disabled={!isEditable}
                                                id={`quantity-${line.id}`}
                                                name={`quantity-${line.id}`}
                                                value={line.quantity}
                                                onChange={(e) =>
                                                    adjustOrderLine &&
                                                    adjustOrderLine(line.id, +e.target.value)
                                                }
                                                className="max-w-full border  border-gray-200 bg-[#954eff3b] py-1 px-2 rounded-full text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                                data-oid="pm1_u15"
                                            >
                                                <option value={1} data-oid="3izj_i8">
                                                    1
                                                </option>
                                                <option value={2} data-oid="uyc58ce">
                                                    2
                                                </option>
                                                <option value={3} data-oid="sj6yzyu">
                                                    3
                                                </option>
                                                <option value={4} data-oid="s941onp">
                                                    4
                                                </option>
                                                <option value={5} data-oid="qd76uwc">
                                                    5
                                                </option>
                                                <option value={6} data-oid="7jo:-_0">
                                                    6
                                                </option>
                                                <option value={7} data-oid="oz673ok">
                                                    7
                                                </option>
                                                <option value={8} data-oid="k:unics">
                                                    8
                                                </option>
                                            </select>
                                        </Form>
                                    ) : (
                                        <div className="text-gray-800" data-oid="293l-59">
                                            <span className="mr-1" data-oid="7xrv6di">
                                                Quantity
                                            </span>
                                            <span className="font-medium" data-oid="dkgit6j">
                                                {line.quantity}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex" data-oid="agc69_u">
                                    {isEditable && (
                                        <button
                                            type="submit"
                                            name="removeItem"
                                            value={line.id}
                                            className="border-gray-200 bg-[#954eff3b] font-medium border hover:opacity-70 rounded-full py-1 px-2"
                                            onClick={() => removeItem && removeItem(line.id)}
                                            data-oid="77yoy2j"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div
                                className="flex flex-row items-start text-sm h-full w-full"
                                data-oid="ak9.x2o"
                            ></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
