import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { RefObject } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import { Address, AvailableCountriesQuery } from '~/generated/graphql';
import { Input } from '~/app/components/Input';
import { Select } from '~/app/components/Select';
// import { useTranslation } from 'react-i18next';

export const validator = withZod(
    z.object({
        fullName: z.string().min(1, { message: 'Name is required' }),
        city: z.string(),
        countryCode: z.string().min(1, { message: 'Country is required' }),
        postalCode: z.string(),
        province: z.string(),
        streetLine1: z.string().min(1, { message: 'Address is required' }),
        streetLine2: z.string(),
        phone: z.string(),
        company: z.string(),
    }),
);

export default function CustomerAddressForm({
    address,
    formRef,
    submit,
    availableCountries,
}: {
    address?: Address;
    formRef: RefObject<HTMLFormElement>;
    submit: () => void;
    availableCountries: AvailableCountriesQuery['availableCountries'];
}) {
    // const { t } = useTranslation();

    return (
        <ValidatedForm
            id="editAddressForm"
            validator={validator}
            formRef={formRef}
            method="post"
            onSubmit={submit}
            defaultValues={{
                fullName: address?.fullName || undefined,
                city: address?.city || undefined,
                streetLine1: address?.streetLine1 || undefined,
                streetLine2: address?.streetLine2 || undefined,
                countryCode: address?.country?.code || undefined,
                postalCode: address?.postalCode || undefined,
                phone: address?.phoneNumber || undefined,
                company: address?.company || undefined,
                province: address?.province || undefined,
            }}
            data-oid="n0u5k:7"
        >
            <input type="hidden" name="intent" value="updateAddress" data-oid="1c-bhxm" />
            <div className="grid grid-cols-1 gap-y-2 my-8" data-oid="jnawo:l">
                <div className="grid grid-cols-2 gap-x-2" data-oid="ffyght7">
                    <Input
                        label={'account.fullName'}
                        name="fullName"
                        required
                        autoComplete="full-name"
                        data-oid="rcgim_-"
                    />
                </div>
                <Input label={'address.company'} name="company" data-oid="mw_kml0" />
                <Input
                    label={'address.streetLine1'}
                    name="streetLine1"
                    required
                    autoComplete="address-line1"
                    data-oid="9gqsyrr"
                />

                <Input
                    label={'address.streetLine2'}
                    name="streetLine2"
                    autoComplete="address-line2"
                    data-oid="x5ph52g"
                />

                <div className="grid grid-cols-[144px_1fr] gap-x-2" data-oid="19wkv3p">
                    <Input
                        label={'address.postalCode'}
                        name="postalCode"
                        required
                        autoComplete="postal-code"
                        data-oid="4-:ofcv"
                    />

                    <Input
                        label={'address.city'}
                        name="city"
                        required
                        autoComplete="locality"
                        data-oid="dm9rtbr"
                    />
                </div>
                <Input
                    label={'address.province'}
                    name="province"
                    autoComplete="address-level1"
                    data-oid="3mpp196"
                />

                <Select
                    name="countryCode"
                    autoComplete="country"
                    placeholder={'address.selectCountry'}
                    required
                    label="Country"
                    data-oid="qdmiwj2"
                >
                    {availableCountries?.map((country) => (
                        <option key={country.id} value={country.code} data-oid="96-kbe9">
                            {country.name}
                        </option>
                    ))}
                </Select>
                <Input
                    label={'address.phoneNumber'}
                    name="phone"
                    autoComplete="phone"
                    data-oid="6yv:43c"
                />

                <input type="submit" hidden data-oid="z0-pi10" />
            </div>
        </ValidatedForm>
    );
}
