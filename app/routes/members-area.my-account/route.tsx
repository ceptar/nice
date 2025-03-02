import { LoaderFunctionArgs, redirect, TypedResponse } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { Member } from '~/src/wix/ecom';
import classNames from 'classnames';
import { useState } from 'react';
import { Dialog, DialogDescription, DialogTitle } from '~/src/components/dialog/dialog';
import { Spinner } from '~/src/components/spinner/spinner';
import { initializeEcomApiForRequest } from '~/src/wix/ecom/session';
import { loaderMockData } from './loader-mock-data';

import styles from './route.module.scss';

export type LoaderResponseData = { user: Member | undefined };
export type LoaderResponse = Promise<TypedResponse<never> | LoaderResponseData>;

export async function loader({ request }: LoaderFunctionArgs): LoaderResponse {
    const api = await initializeEcomApiForRequest(request);
    if (!api.isLoggedIn()) {
        return redirect('/login');
    }

    const user = await api.getUser();
    return { user };
}

// will be called if app is run in Codux because fetching user details requires
// user to be logged in but it's currently can't be done through Codux
export async function coduxLoader(): ReturnType<typeof loader> {
    return loaderMockData;
}

export default function MyAccountPage() {
    const { user } = useLoaderData<typeof loader>();

    const initialUserDetailsFormData = {
        firstName: user?.contact?.firstName ?? '',
        lastName: user?.contact?.lastName ?? '',
        phoneNumber: user?.contact?.phones?.[0] ?? '',
    };

    const [userDetailsFormData, setUserDetailsFormData] = useState(initialUserDetailsFormData);
    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false);

    const onDiscardChangesClick = () => {
        setDiscardConfirmationOpen(true);
    };

    const handleDiscardChanges = () => {
        setUserDetailsFormData(initialUserDetailsFormData);
        setDiscardConfirmationOpen(false);
    };

    const navigation = useNavigation();

    const userDetailsFormAction = '/members-area/my-account/update-details';
    const resetPasswordFormAction = '/members-area/my-account/reset-password';

    const isUpdatingUserDetails =
        navigation.state === 'submitting' && navigation.formAction === userDetailsFormAction;

    const isResettingPassword =
        navigation.state === 'submitting' && navigation.formAction === resetPasswordFormAction;

    return (
        <div data-oid="d:vuxoa">
            <div className={classNames(styles.section, styles.header)} data-oid="e:6ua.7">
                <div data-oid="gtaqoxr">
                    <h2 className="heading4" data-oid="ov.9ndb">
                        Account
                    </h2>
                    <span className="paragraph1" data-oid="anegqa.">
                        View and edit your personal info below.
                    </span>
                </div>
                <div className={styles.actions} data-oid="aqxyagk">
                    <button
                        className={classNames('button', 'secondaryButton', 'smallButton')}
                        onClick={onDiscardChangesClick}
                        data-oid="prigfnu"
                    >
                        Discard
                    </button>
                    <button
                        className={classNames(
                            'button',
                            'primaryButton',
                            'smallButton',
                            styles.updateInfoButton,
                        )}
                        disabled={isUpdatingUserDetails}
                        form="user-details-form"
                        type="submit"
                        data-oid="s7n-ebl"
                    >
                        {isUpdatingUserDetails ? (
                            <Spinner size={24} data-oid="okq9sbg" />
                        ) : (
                            'Update Info'
                        )}
                    </button>
                </div>
            </div>

            <div className={styles.section} data-oid="spk09vg">
                <div data-oid="o9up9k3">
                    <h2 className="heading5" data-oid="awhy87d">
                        Personal info
                    </h2>
                    <span className="paragraph1" data-oid="oatyk:k">
                        Update you personal information.
                    </span>
                </div>

                <Form
                    id="user-details-form"
                    method="post"
                    action={userDetailsFormAction}
                    className={styles.userDetailsForm}
                    data-oid="taa4x1r"
                >
                    <input
                        type="hidden"
                        name="userId"
                        value={user?._id ?? undefined}
                        data-oid="bvz51as"
                    />

                    <label data-oid="4-tbmyn">
                        First Name
                        <input
                            className="textInput"
                            name="firstName"
                            value={userDetailsFormData.firstName}
                            onChange={(e) =>
                                setUserDetailsFormData((current) => ({
                                    ...current,
                                    firstName: e.target.value,
                                }))
                            }
                            data-oid="jkgbavx"
                        />
                    </label>

                    <label data-oid="y5rqs4l">
                        Last Name
                        <input
                            className="textInput"
                            name="lastName"
                            value={userDetailsFormData.lastName}
                            onChange={(e) =>
                                setUserDetailsFormData((current) => ({
                                    ...current,
                                    lastName: e.target.value,
                                }))
                            }
                            data-oid="9phz6i1"
                        />
                    </label>

                    <label data-oid="fkbts72">
                        Phone
                        <input
                            className="textInput"
                            name="phoneNumber"
                            value={userDetailsFormData.phoneNumber}
                            onChange={(e) =>
                                setUserDetailsFormData((current) => ({
                                    ...current,
                                    phoneNumber: e.target.value,
                                }))
                            }
                            data-oid="bj4qgwi"
                        />
                    </label>
                </Form>

                <div className={styles.actions} data-oid="ju2zz5b">
                    <button
                        className={classNames('button', 'secondaryButton', 'smallButton')}
                        onClick={onDiscardChangesClick}
                        data-oid="9-kbo7r"
                    >
                        Discard
                    </button>
                    <button
                        className={classNames(
                            'button',
                            'primaryButton',
                            'smallButton',
                            styles.updateInfoButton,
                        )}
                        disabled={isUpdatingUserDetails}
                        form="user-details-form"
                        type="submit"
                        data-oid=".n3hxyp"
                    >
                        {isUpdatingUserDetails ? (
                            <Spinner size={24} data-oid="x3_ftih" />
                        ) : (
                            'Update Info'
                        )}
                    </button>
                </div>
            </div>

            <div className={styles.section} data-oid="8yfjkbv">
                <div data-oid="qz6pop7">
                    <h2 className="heading5" data-oid="_oxxi-j">
                        Login info
                    </h2>
                    <span className="paragraph1" data-oid="_r68qe.">
                        View your login email and reset password.
                    </span>
                </div>

                <Form
                    id="reset-password-form"
                    method="post"
                    action={resetPasswordFormAction}
                    className={styles.loginInfoSection}
                    data-oid="ew_.:l4"
                >
                    <div data-oid="j3-4qt8">
                        <div data-oid="zrk-fsm">Login email:</div>
                        <div data-oid="pmrzcqy">{user?.loginEmail}</div>
                        <input
                            type="hidden"
                            name="email"
                            value={user?.loginEmail ?? undefined}
                            data-oid="7cazefj"
                        />
                    </div>

                    <div className={styles.actions} data-oid="un7fvja">
                        <button
                            type="submit"
                            className={classNames(
                                'button',
                                'primaryButton',
                                'smallButton',
                                styles.resetPasswordButton,
                            )}
                            disabled={isResettingPassword}
                            data-oid="3xdbh8q"
                        >
                            {isResettingPassword ? (
                                <Spinner size={22} data-oid="k8ni3id" />
                            ) : (
                                'Reset password'
                            )}
                        </button>
                    </div>
                </Form>
            </div>

            <Dialog
                open={discardConfirmationOpen}
                onOpenChange={(open) => setDiscardConfirmationOpen(open)}
                data-oid="s:27nax"
            >
                <DialogTitle className={styles.title} data-oid="pi:fjaw">
                    Discard changes?
                </DialogTitle>
                <DialogDescription data-oid="-x9hkub">
                    Any changes you made will be lost.
                </DialogDescription>
                <div className={styles.confirmationDialogBody} data-oid="-cx.op2">
                    <button
                        className={classNames('button', 'secondaryButton', 'smallButton')}
                        onClick={() => setDiscardConfirmationOpen(false)}
                        data-oid="rpbzb_0"
                    >
                        Keep Editing
                    </button>
                    <button
                        className={classNames('button', 'primaryButton', 'smallButton')}
                        onClick={handleDiscardChanges}
                        data-oid="d18cuth"
                    >
                        Discard Changes
                    </button>
                </div>
            </Dialog>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'My Account | ReClaim' },
        {
            name: 'description',
            content: 'Essential home products for sustainable living',
        },
        {
            property: 'robots',
            content: 'noindex, nofollow',
        },
    ];
};
