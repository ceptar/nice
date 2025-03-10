import { AvailableCountriesQuery, OrderAddress } from '~/src/vendure/generated/graphql';

export function AddressForm({
    address,
    defaultFullName,
    availableCountries,
}: {
    address?: OrderAddress | null;
    defaultFullName?: string;
    availableCountries?: AvailableCountriesQuery['availableCountries'];
}) {
    // const { t } = useTranslation();

    return (
        <div className=" leading-[21px] mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4" data-oid="viat6-9">
            <div data-oid="c6-2qha">
                <label htmlFor="fullName" className="hidden  text-gray-700" data-oid="t1icg93">
                    Full Name
                </label>
                <div className="mt-1" data-oid="0_ujiol">
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        defaultValue={defaultFullName}
                        autoComplete="given-name"
                        placeholder="Full Name"
                        className="block p-3 w-full border-gray-200 rounded-[8px] border-[1px]"
                        data-oid="bu7pyu_"
                    />
                </div>
            </div>
            <div data-oid="5qrug1:">
                <label htmlFor="company" className="hidden  text-gray-700" data-oid="t.47o5w">
                    Company
                </label>
                <div className="mt-1" data-oid=":d3.3z9">
                    <input
                        type="text"
                        name="company"
                        id="company"
                        defaultValue={address?.company ?? ''}
                        placeholder="Company"
                        className="block p-3 w-full border-gray-200 rounded-[8px] border-[1px]"
                        data-oid="1e9b7vn"
                    />
                </div>
            </div>

            <div className="sm:col-span-2" data-oid="2pxi7ma">
                <label htmlFor="streetLine1" className="hidden  text-gray-700" data-oid="akxe_3l">
                    Street 1/2
                </label>
                <div className="mt-1" data-oid="xibm7xw">
                    <input
                        type="text"
                        name="streetLine1"
                        id="streetLine1"
                        defaultValue={address?.streetLine1 ?? ''}
                        autoComplete="street-address"
                        placeholder="Street"
                        className="block p-3 w-full border-gray-200 rounded-[8px] border-[1px]"
                        data-oid="d0syms2"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4" data-oid="tdrv7hs">
                <div data-oid="yfdg2gm">
                    <label htmlFor="city" className="hidden  text-gray-700" data-oid="2qsc5s9">
                        City
                    </label>
                    <div className="mt-1" data-oid="drwgycs">
                        <input
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="address-level2"
                            defaultValue={address?.city ?? ''}
                            placeholder="City"
                            className="block p-3 w-full border-gray-200 rounded-[8px] border-[1px]"
                            data-oid="ozcag98"
                        />
                    </div>
                </div>

                <div data-oid="d0rd7eh">
                    <label
                        htmlFor="countryCode"
                        className="hidden  text-gray-700"
                        data-oid="pa00a42"
                    >
                        Country
                    </label>
                    <div className="mt-1" data-oid="8cc8i9v">
                        {availableCountries && (
                            <select
                                id="countryCode"
                                name="countryCode"
                                defaultValue={address?.countryCode ?? 'AT'}
                                aria-placeholder="Country"
                                className="block p-3 w-full border-gray-200 h-full rounded-[8px] border-[1px]"
                                data-oid="u_q-2mg"
                            >
                                {availableCountries.map((item) => (
                                    <option key={item.id} value={item.code} data-oid="1suu9i5">
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4" data-oid="1tm2s8n">
                <div data-oid="agcyxh3">
                    <label htmlFor="province" className="hidden  text-gray-700" data-oid="4niktmd">
                        Province
                    </label>
                    <div className="mt-1" data-oid="7rur9uh">
                        <input
                            type="text"
                            name="province"
                            id="province"
                            defaultValue={address?.province ?? ''}
                            autoComplete="address-level1"
                            placeholder="Province"
                            className="block p-3 w-full border-gray-200 rounded-[8px] border-[1px]"
                            data-oid="q5ve-.r"
                        />
                    </div>
                </div>

                <div data-oid="y:z2.i5">
                    <label
                        htmlFor="postalCode"
                        className="hidden  text-gray-700"
                        data-oid="se7.y4q"
                    >
                        Zip Code
                    </label>
                    <div className="mt-1" data-oid="nwi5_jp">
                        <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            defaultValue={address?.postalCode ?? ''}
                            autoComplete="postal-code"
                            placeholder="ZIP"
                            className="block p-3 w-full border-gray-200 rounded-[8px] border-[1px]"
                            data-oid="zbq3898"
                        />
                    </div>
                </div>
            </div>
            {/* <div className="sm:col-span-2">
        <label
        htmlFor="phoneNumber"
        className="hidden  text-gray-700"
        >
        Phone Number
        </label>
        <div className="mt-1">
        <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        defaultValue={address?.phoneNumber ?? ''}
        autoComplete="tel"
        placeholder='Phone Number'
        className="block p-3 w-full border-gray-200 rounded-[8px] border-[1px]"
        />
        </div>
        </div> */}
        </div>
    );
}
