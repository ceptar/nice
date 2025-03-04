import { RadioGroup } from '@headlessui/react';
import { classNames } from '~/src/vendure/utils/class-names';
import { Price } from '~/src/components/products/Price';
import { CircleCheck as CheckCircleIcon } from 'lucide-react';
import {
  CurrencyCode,
  EligibleShippingMethodsQuery,
} from '~/src/vendure/generated/graphql';

export function ShippingMethodSelector({
    eligibleShippingMethods,
    shippingMethodId,
    onChange,
    currencyCode,
  }: {
    eligibleShippingMethods: EligibleShippingMethodsQuery['eligibleShippingMethods'];
    shippingMethodId: string | undefined;
    onChange: (value?: string) => void;
    currencyCode?: CurrencyCode;
  }) {
    if (!eligibleShippingMethods?.length) {
      return (
        <div className="text-sm text-gray-500 p-4">
          No shipping methods available for your location and order weight.
        </div>
      );
    }

    return (
      <RadioGroup value={shippingMethodId} onChange={onChange}>
        <div className="mt-4 grid grid-cols-1 gap-y-6">
          {eligibleShippingMethods.map((shippingMethod) => (
            <RadioGroup.Option
              key={shippingMethod.id}
              value={shippingMethod.id}
              className={classNames(
                'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
                shippingMethodId === shippingMethod.id 
                  ? 'border-primary-500 ring-2 ring-primary-500' 
                  : 'border-gray-300'
              )}
            >
              {({ checked, active }) => (
              <>
                <span className="flex-1 flex">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {shippingMethod.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-900"
                    >
                      <Price
                        priceWithTax={shippingMethod.priceWithTax}
                        currencyCode={currencyCode}
                      ></Price>
                    </RadioGroup.Description>
                  </span>
                </span>
                {checked ? (
                  <CheckCircleIcon
                    className="h-5 w-5 text-primary-600"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-primary-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg pointer-events-none',
                  )}
                  aria-hidden="true"
                />
              </>
            )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    );
  }