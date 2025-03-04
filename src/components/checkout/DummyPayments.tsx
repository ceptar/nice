import { CreditCard as CreditCardIcon, LucideCircleX as XCircleIcon } from 'lucide-react';
import { Form } from '@remix-run/react';
import { EligiblePaymentMethodsQuery } from '~/src/vendure/generated/graphql';
// import { useTranslation } from 'react-i18next';

export function DummyPayments({
    paymentMethod,
    paymentError,
}: {
    paymentMethod: EligiblePaymentMethodsQuery['eligiblePaymentMethods'][number];
    paymentError?: string;
}) {
    // const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center" data-oid="e9-k-kk">
            <p className="text-discogray-700 text-sm p-6" data-oid="dnlahz_">
                {'checkout.dummyPayment'}
            </p>
            {paymentError && (
                <div className=" bg-red-50 p-4 mb-8" data-oid="0f6qb6.">
                    <div className="flex" data-oid="bop47r0">
                        <div className="flex-shrink-0" data-oid="xojv.f-">
                            <XCircleIcon
                                className="h-5 w-5 text-red-400"
                                aria-hidden="true"
                                data-oid="ugechno"
                            />
                        </div>
                        <div className="ml-3" data-oid="2h-5ire">
                            <h3 className="text-sm  text-red-800" data-oid="ia4g63s">
                                {'checkout.paymentErrorMessage'}
                            </h3>
                            <div className="mt-2 text-sm text-red-700" data-oid="oxyw5q2">
                                {paymentError}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Form method="post" data-oid="29e4cba">
                <input
                    type="hidden"
                    name="paymentMethodCode"
                    value={paymentMethod.code}
                    data-oid="c1m1ixc"
                />

                <button
                    type="submit"
                    className="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base   shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    data-oid="q_jcyvu"
                >
                    <CreditCardIcon className="w-5 h-5" data-oid="4s9tq_d"></CreditCardIcon>
                    <span data-oid="2c_ya-o">
                        {'checkout.payWith'} {paymentMethod.name}
                    </span>
                </button>
            </Form>
        </div>
    );
}
