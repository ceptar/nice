import classNames from 'classnames';
import { Outlet, NavLink } from '@remix-run/react';

import styles from './route.module.scss';

export default function MembersAreaPage() {
    const tabClassName = ({ isActive }: { isActive: boolean }) => {
        return classNames('tab', { active: isActive });
    };

    return (
        <div className={styles.page} data-oid="kcfxzm8">
            <div className="tabs" data-oid="3lptof9">
                <NavLink
                    to={'/members-area/my-account'}
                    className={tabClassName}
                    data-oid="5qgy:yq"
                >
                    My Account
                </NavLink>
                <NavLink to={'/members-area/my-orders'} className={tabClassName} data-oid="69xfhvw">
                    My Orders
                </NavLink>
            </div>
            <div className={styles.content} data-oid="hhssu6g">
                <Outlet data-oid="_7q--v9" />
            </div>
        </div>
    );
}
