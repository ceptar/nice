import { RadioGroup, RadioGroupItem } from '~/src/components/ui/radio-group';
import { Label } from '~/src/components/ui/label';
import { classNames } from '~/src/vendure/utils/class-names';
import { Price } from '~/src/components/products/Price';
import { CircleCheck as CheckCircleIcon } from 'lucide-react';
import { CurrencyCode, EligibleShippingMethodsQuery } from '~/src/vendure/generated/graphql';

export function ShippingMethodSelector({
    eligibleShippingMethods,
    currencyCode,
    shippingMethodId,
    onChange,
}: {
    eligibleShippingMethods: EligibleShippingMethodsQuery['eligibleShippingMethods'];
    shippingMethodId: string | undefined;
    onChange: (value?: string) => void;
    currencyCode?: CurrencyCode;
}) {
    return (
        <div data-oid="waz5_j1">
            <RadioGroup
                defaultValue={shippingMethodId}
                onValueChange={onChange}
                className="mt-4 grid grid-cols-1 gap-y-4"
                data-oid="wpcfhhm"
            >
                {eligibleShippingMethods.map((shippingMethod) => (
                    <div
                        key={shippingMethod.id}
                        className={classNames(
                            'relative bg-white shadow-sm p-4 flex cursor-pointer focus:outline-none',
                            shippingMethodId === shippingMethod.id
                                ? 'border-transparent ring-2 ring-primary-500'
                                : 'border-gray-300',
                        )}
                        data-oid="kadon4r"
                    >
                        <div
                            className="flex-1 flex justify-between items-center"
                            data-oid="ddlgwyr"
                        >
                            <div className="flex flex-row w-full items-center" data-oid="0pq91ii">
                                <RadioGroupItem
                                    value={shippingMethod.id}
                                    id={shippingMethod.id}
                                    className="mr-2"
                                    data-oid="qtf5:l6"
                                />

                                <Label
                                    htmlFor={shippingMethod.id}
                                    className="flex text-sm text-gray-900"
                                    data-oid="95g7qwt"
                                >
                                    {shippingMethod.name}
                                </Label>
                                <span
                                    className="flex-grow text-sm text-right text-gray-900"
                                    data-oid="_x2rddd"
                                >
                                    <Price
                                        priceWithTax={shippingMethod.priceWithTax}
                                        currencyCode={currencyCode}
                                        data-oid="la-78_5"
                                    />
                                </span>
                            </div>
                        </div>
                        {shippingMethodId === shippingMethod.id && (
                            <CheckCircleIcon
                                className="h-5 w-5 text-primary-600"
                                aria-hidden="true"
                                data-oid="krzx-i_"
                            />
                        )}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
