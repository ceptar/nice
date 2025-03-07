import classNames from 'classnames';
import { NavLink } from '@remix-run/react';
import { CategoryLink } from '../category-link/category-link';
import styles from './navigation-menu.module.scss';

interface NavigationMenuProps {
    className?: string;
    vertical?: boolean;
}

export const NavigationMenu = ({ className, vertical = false }: NavigationMenuProps) => {
    const menuItemStyle = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.menuItem, {
            [styles.active]: isActive,
        });

    return (
        <nav className={className} data-oid="uo69wqu">
            <ul
                className={classNames(styles.menuList, { [styles.vertical]: vertical })}
                data-oid="3aupic7"
            >
                <li data-oid="ahy1wak">
                    <CategoryLink
                        categorySlug="aa-all"
                        className={menuItemStyle}
                        data-oid="jsjs9xq"
                    >
                        Shop All
                    </CategoryLink>
                </li>
                <li data-oid=":r4oiw2">
                    <CategoryLink
                        categorySlug="kitchen-essentials"
                        className={menuItemStyle}
                        data-oid="k-1e3k:"
                    >
                        Kitchen
                    </CategoryLink>
                </li>
                <li data-oid="34l0-tg">
                    <CategoryLink categorySlug="bath" className={menuItemStyle} data-oid="z-w1l2c">
                        Bath
                    </CategoryLink>
                </li>
                <li data-oid="0c1kl5k">
                    <CategoryLink
                        categorySlug="on-the-go"
                        className={menuItemStyle}
                        data-oid=":5ux6oe"
                    >
                        On the Go
                    </CategoryLink>
                </li>
                <li data-oid="jn:vcer">
                    <NavLink to="/about-us" className={menuItemStyle} data-oid="tivysxx">
                        About Us
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
