import { RadioGroup, RadioGroupItem } from '~/src/components/ui/radio-group';
import { Card } from '~/src/components/ui/card';
import { classNames } from '~/src/vendure/utils/class-names';
import { CircleCheck as CheckCircleIcon } from 'lucide-react';
import { ActiveCustomerAddressesQuery } from '~/src/vendure/generated/graphql';

export type SelectedAddress = NonNullable<
    NonNullable<ActiveCustomerAddressesQuery['activeCustomer']>['addresses']
>[number];

export function ShippingAddressSelector({
    addresses,
    selectedAddressIndex,
    onChange,
}: {
    addresses: SelectedAddress[];
    selectedAddressIndex: number;
    onChange: (value: number) => void;
}) {
    return (
        <RadioGroup
            defaultValue={selectedAddressIndex.toString()}
            onValueChange={(value) => onChange(parseInt(value))}
            data-oid="438q6nl"
        >
            <div
                className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4"
                data-oid="fp2-kn_"
            >
                {(addresses || []).map((address, index) => (
                    <Card
                        key={index}
                        className={classNames(
                            'relative border shadow-sm p-4 cursor-pointer',
                            selectedAddressIndex === index
                                ? 'border-transparent ring-2 ring-primary-500'
                                : 'border-gray-300',
                        )}
                        data-oid="v.6a4_4"
                    >
                        <div className="flex" data-oid="rtwsv0s">
                            <div className="flex-1 flex" data-oid="zy5u1ah">
                                <div className="flex flex-col" data-oid="neh9jho">
                                    <RadioGroupItem
                                        value={index.toString()}
                                        id={`address-${index}`}
                                        className="absolute top-4 right-4"
                                        data-oid="czkwik_"
                                    />

                                    <span
                                        className="block text-sm text-gray-900"
                                        data-oid="lt-p11r"
                                    >
                                        {address.streetLine1}, {address.postalCode}
                                    </span>
                                    <div className="mt-6 text-sm text-gray-800" data-oid="i1xt7dn">
                                        <ul data-oid="a7lf:p2">
                                            <li data-oid="q929sz7">{address.streetLine1}</li>
                                            <li data-oid="87i4q7b">{address.streetLine2}</li>
                                            <li data-oid="6:983ec">{address.city}</li>
                                            <li data-oid="_ag42.1">{address.province}</li>
                                            <li data-oid="h6d-2f0">{address.postalCode}</li>
                                            <li data-oid="8-i3bkl">{address.country.name}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {selectedAddressIndex === index && (
                                <CheckCircleIcon
                                    className="h-5 w-5 text-primary-600"
                                    aria-hidden="true"
                                    data-oid="pmd87fm"
                                />
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </RadioGroup>
    );
}
