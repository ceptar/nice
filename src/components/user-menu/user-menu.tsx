import { NavLink } from '@remix-run/react';
import { Avatar } from '~/src/components/avatar/avatar';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '~/src/components/dropdown-menu/dropdown-menu';
import { DropdownIcon } from '~/src/components/icons';
import { useUserInfo } from '~/src/wix/users';

import styles from './user-menu.module.scss';

export const UserMenu = () => {
    const { isLoggedIn, user } = useUserInfo();

    if (!isLoggedIn) {
        return (
            <NavLink className={styles.root} to={'/login'} data-oid="q9nsle9">
                <Avatar imageSrc={undefined} data-oid="de4va74" />
                Log In
            </NavLink>
        );
    }

    return (
        <DropdownMenu
            trigger={
                <button className={styles.root} data-oid="aa:ju27">
                    <Avatar imageSrc={user?.profile?.photo?.url} data-oid="_ja57bj" />
                    <DropdownIcon width={10} height={10} data-oid="qm-bla1" />
                </button>
            }
            contentProps={{
                align: 'end',
                sideOffset: 6,
            }}
            data-oid="vm7b-:q"
        >
            <DropdownMenuItem asChild data-oid="0m_2332">
                <NavLink className={styles.link} to={'/members-area/my-account'} data-oid="e-aozyb">
                    My Account
                </NavLink>
            </DropdownMenuItem>

            <DropdownMenuItem asChild data-oid="prpvvj.">
                <NavLink className={styles.link} to={'/members-area/my-orders'} data-oid="v3e9lj1">
                    My Orders
                </NavLink>
            </DropdownMenuItem>

            <DropdownMenuSeparator data-oid=":2f:izp" />

            <DropdownMenuItem asChild data-oid="z9qd.9y">
                <NavLink className={styles.link} to={'/logout'} data-oid="ppjnvvd">
                    Log out
                </NavLink>
            </DropdownMenuItem>
        </DropdownMenu>
    );
};
