import { Link, useNavigate, useLocation } from '@remix-run/react';
import { motion, useTransform, useScroll } from 'framer-motion';
import classNames from 'classnames';
import { DiscoLogo } from '~/src/components/icons/disco-logo';

import MobileMenu from '~/src/components/drawer-mobile-menu/MobileMenu';
import Cart from '~/src/components/icons/cart';
import styles from './header.module.scss';
export interface HeaderProps {
    className?: string;
    collections: Array<any>;
    onCartIconClick: () => void;
    cartQuantity: number;
}

export const Header = ({ className, collections, onCartIconClick, cartQuantity }: HeaderProps) => {
    const { scrollY } = useScroll();
    const location = useLocation(); // Add this hook
    const isHomePage = location.pathname === '/';
    const colorDark = 'rgba(0, 0, 0, 1)';
    const colorLight = 'rgba(250, 249, 246, 1)';
    const colorLightTrans = 'rgba(250, 249, 246, 0)';
    const color = useTransform(
        scrollY,
        [0, 62],
        isHomePage ? [colorLight, colorDark] : [colorDark, colorDark],
    );

    const background = useTransform(
        scrollY,
        [0, 62],
        isHomePage ? [colorLightTrans, colorLight] : [colorLight, colorLight],
    );

    const navigate = useNavigate();

    return (
        <div className="absolute top-0 left-0 w-full h-[75px] flex items-center">
            <motion.header
                id="navigation"
                style={{
                    color,
                    background,
                }}
                className={classNames(styles.root, className)}
                data-oid="e490jhm"
            >
                <div
                    className="relative flex flex-row items-center justify-between h-full w-full"
                    data-oid="j9mn1qx"
                >
                    <div className="flex-1 flex-col items-center justify-center" data-oid="._m2pef">
                        <button
                            className="group relative border-[var(--ui1)] flex ml-1 p-2 h-9 w-9 items-center justify-center overflow-hidden rounded-full  shadow-md shadow-gray-200 transition-all duration-500"
                            onClick={onCartIconClick}
                        >
                            <Cart
                                data-oid="m:up2t3"
                                className="relative z-10 transition-all duration-300"
                            />
                            <div className="absolute z-0 left-0 top-full h-full w-full rounded-full bg-[var(--ui1)] transition-all duration-500 group-hover:top-0"></div>
                        </button>

                        {cartQuantity ? (
                            <div
                                className="flex text-[13px] font-[500] aspect-[1/1] px-2 absolute items-center justify-center rounded-full"
                                style={{
                                    backgroundColor: 'var(--ui1)',
                                    left: '34px',
                                    top: '2px',
                                }}
                                data-oid="nc_ojqm"
                            >
                                {cartQuantity}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    <Link to="/" className={styles.logo} data-oid="2g7b.xk">
                        <DiscoLogo data-oid="k5i-:00" className="w-[80%] mx-auto" />
                    </Link>

                    <div className="flex justify-end items-center flex-1" data-oid="gta9zd2">
                        <MobileMenu collections={collections} data-oid="48n_ip9" />{' '}
                    </div>
                </div>
            </motion.header>
        </div>
    );
};
