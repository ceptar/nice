import { useActiveOrder } from '~/src/vendure/utils/use-active-order';
import { CreateAddressInput } from '~/src/vendure/generated/graphql';

export type OutletContext = ReturnType<typeof useActiveOrder>;

export type ShippingFormData = CreateAddressInput;
