import {
    ArrowPathIcon,
    CreditCardIcon,
    PencilIcon,
    TrashIcon,
    TruckIcon,
} from '@heroicons/react/24/outline';
import { Link, useFetcher } from '@remix-run/react';
import clsx from 'clsx';
import { useState } from 'react';
import { Address, ErrorResult } from '~/generated/graphql';
import { Button } from '../Button';
import { ErrorMessage } from '../ErrorMessage';
import { HighlightedButton } from '../HighlightedButton';
import Modal from '../modal/Modal';
// import { useTranslation } from 'react-i18next';

type EditAddressProps = {
    address: Address;
    isActive?: boolean;
};

export default function EditAddressCard({ address, isActive = false }: EditAddressProps) {
    const setShipping = useFetcher();
    const setBilling = useFetcher();
    const deleteAddress = useFetcher<ErrorResult>();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    // const { t } = useTranslation();

    return (
        <>
            {/* Note: Only allow closing when it isnt loading to prevent accidental closing via outside-click */}
            <Modal
                isOpen={isDeleteModalVisible}
                close={() => setDeleteModalVisible(deleteAddress.state === 'idle' ? false : true)}
                data-oid="kvr_b.c"
            >
                <deleteAddress.Form method="post" preventScrollReset data-oid="nzece-d">
                    <Modal.Title data-oid="4p:-s-z">{'address.deleteModal.title'}</Modal.Title>
                    <Modal.Body data-oid="my1nzeb">
                        <div className="space-y-4 my-4" data-oid="j5:qvua">
                            {'address.deleteModal.confirmation'}
                            <input type="hidden" name="id" value={address.id} data-oid="a_o8fxz" />
                            {deleteAddress.data && (
                                <ErrorMessage
                                    heading={'address.deleteModal.error'}
                                    message={
                                        deleteAddress.data?.message ?? t('common.defaultError')
                                    }
                                    data-oid="8r7.6ra"
                                />
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer data-oid="g6m5zn1">
                        <Button
                            type="button"
                            onClick={() => setDeleteModalVisible(false)}
                            disabled={deleteAddress.state !== 'idle'}
                            data-oid="074rfw0"
                        >
                            {'common.cancel'}
                        </Button>
                        <HighlightedButton
                            type="submit"
                            name="_action"
                            value="deleteAddress"
                            disabled={deleteAddress.state !== 'idle'}
                            isSubmitting={deleteAddress.state !== 'idle'}
                            data-oid="dcvae06"
                        >
                            {'common.yes'}
                        </HighlightedButton>
                    </Modal.Footer>
                </deleteAddress.Form>
            </Modal>
            <div
                className={clsx(
                    'border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between gap-8 transition-colors',
                    {
                        'border-gray-900': isActive,
                    },
                )}
                data-oid="7s4-yrd"
            >
                <div className="flex justify-between" data-oid="j.xyzhz">
                    {/* Customer Data Section */}
                    <div className="flex flex-col" data-oid="6es.a4k">
                        <span className="text-left text-base-semi" data-oid="nshcupy">
                            {address.fullName}
                        </span>
                        {address.company && (
                            <span className="text-small-regular text-gray-700" data-oid="orh48m0">
                                {address.company}
                            </span>
                        )}
                        <div
                            className="flex flex-col text-left text-base-regular mt-2"
                            data-oid="1vre.3p"
                        >
                            <span data-oid="q1v6bxe">
                                {address.streetLine1}
                                {address.streetLine2 && (
                                    <span data-oid="ks6wa4g">, {address.streetLine2}</span>
                                )}
                            </span>
                            <span data-oid="3mp9l_x">
                                {address.postalCode}, {address.city}
                            </span>
                            <span data-oid="q_4m40s">
                                {address.province && `${address.province}, `}
                                {address.country?.code?.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    {/* Default Shipping/Billing Section */}
                    {(address.defaultShippingAddress || address.defaultBillingAddress) && (
                        <div
                            className="text-end text-gray-500 uppercase tracking-wider"
                            data-oid="1css7pu"
                        >
                            <span className="block text-sm " data-oid="303hehs">
                                {'common.default'}
                            </span>
                            <span className="block text-xs mt-1" data-oid="m8qvz5c">
                                {address.defaultShippingAddress && t('common.shipping')}
                                {address.defaultShippingAddress &&
                                    address.defaultBillingAddress && (
                                        <>
                                            <br data-oid="7vnh4fj" />
                                            &amp;&nbsp;
                                        </>
                                    )}
                                {address.defaultBillingAddress && t('common.billing')}
                            </span>
                        </div>
                    )}
                </div>
                {/* CRUD Actions */}
                <div className="flex flex-col md:flex-row items-start gap-4" data-oid="a4wq0jr">
                    <div className="flex items-center gap-4" data-oid="1.o:awq">
                        <Link
                            role="button"
                            preventScrollReset
                            className="text-gray-700 flex items-center gap-x-2"
                            to={`/account/addresses/${address.id}`}
                            data-oid="3se6m15"
                        >
                            <PencilIcon className="w-4 h-4" data-oid="gjib0fk"></PencilIcon>
                            {'common.edit'}
                        </Link>
                        <button
                            type="button"
                            title="Delete this address"
                            className="text-gray-700 flex items-center gap-x-2"
                            disabled={deleteAddress.state !== 'idle'}
                            onClick={() => setDeleteModalVisible(true)}
                            data-oid="yo_raee"
                        >
                            {deleteAddress.state === 'idle' ? (
                                <TrashIcon className="w-4 h-4" data-oid="i.6twut"></TrashIcon>
                            ) : (
                                <ArrowPathIcon
                                    className="w-4 h-4 animate-spin"
                                    data-oid="yxaoq6d"
                                ></ArrowPathIcon>
                            )}
                            {'common.remove'}
                        </button>
                    </div>
                    {(!address.defaultShippingAddress || !address.defaultBillingAddress) && (
                        <div data-oid="w0ia6rj">
                            <span className="text-gray-500 flex gap-4" data-oid="i.r_018">
                                {/* Default shipping */}
                                {!address.defaultShippingAddress && (
                                    <setShipping.Form method="post" data-oid=".mvu3rn">
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={address.id}
                                            data-oid="jq6u05o"
                                        />
                                        <button
                                            name="_action"
                                            value="setDefaultShipping"
                                            type="submit"
                                            title="Set as default shipping address"
                                            className="text-gray-700 flex items-center gap-2"
                                            disabled={setShipping.state !== 'idle'}
                                            data-oid="6fv-vqn"
                                        >
                                            {setShipping.state === 'idle' ? (
                                                <TruckIcon
                                                    className="w-4 h-4"
                                                    data-oid="oi4t28:"
                                                ></TruckIcon>
                                            ) : (
                                                <ArrowPathIcon
                                                    className="w-4 h-4 animate-spin"
                                                    data-oid="6iu9y0o"
                                                ></ArrowPathIcon>
                                            )}
                                            {'common.shipping'}
                                        </button>
                                    </setShipping.Form>
                                )}

                                {!address.defaultBillingAddress && (
                                    <setBilling.Form method="post" data-oid=":.h7cv2">
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={address.id}
                                            data-oid="46q_pjh"
                                        />
                                        <button
                                            name="_action"
                                            value="setDefaultBilling"
                                            type="submit"
                                            title="Set as default billing address"
                                            className="text-gray-700 flex items-center gap-2"
                                            disabled={setBilling.state !== 'idle'}
                                            data-oid="pw3j8ae"
                                        >
                                            {setBilling.state === 'idle' ? (
                                                <CreditCardIcon
                                                    className="w-4 h-4"
                                                    data-oid="9alop.s"
                                                ></CreditCardIcon>
                                            ) : (
                                                <ArrowPathIcon
                                                    className="w-4 h-4 animate-spin"
                                                    data-oid="xbqk4u4"
                                                ></ArrowPathIcon>
                                            )}
                                            {'common.billing'}
                                        </button>
                                    </setBilling.Form>
                                )}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
