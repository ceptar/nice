import { Plus as PlusIcon } from 'lucide-react';
import { Link } from '@remix-run/react';
// import { useTranslation } from 'react-i18next';

export default function AddAddressCard() {
    // const { t } = useTranslation();

    return (
        <>
            <Link
                preventScrollReset
                className="border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
                to="/account/addresses/new"
                data-oid="3:v2hfd"
            >
                <span className="text-base-semi" data-oid="o599a0v">
                    {
                        // t
                        'address.new'
                    }
                </span>
                <PlusIcon className="w-6 h-6" data-oid="h6qoklf"></PlusIcon>
            </Link>
        </>
    );
}
