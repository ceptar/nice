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
    const color = useTransform(
        scrollY,
        [0, 62],
        isHomePage
            ? ['rgba(250, 249, 246, 1)', 'rgba(0, 0, 0, 1)']
            : ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)'],
    );

    const background = useTransform(
        scrollY,
        [0, 62],
        isHomePage
            ? ['rgba(250, 249, 246, 0)', 'rgba(250, 249, 246, 1)']
            : ['rgba(250, 249, 246, 1)', 'rgba(250, 249, 246, 1)'],
    );

    const navigate = useNavigate();

    return (
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
                        className="flex flex-col px-4 shadow-none cursor-pointer justify-center rounded-full items-center py-2 text-sm transition-all duration-300 ease-out hover:opacity-70"
                        onClick={onCartIconClick}
                        aria-label="Open cart tray"
                        data-oid="l6yu.jm"
                    >
                        <Cart data-oid="m:up2t3" />
                        {cartQuantity ? (
                            <div
                                className="text-xs font-bold aspect-[1/1] px-2 pt-[3px] z-40 absolute items-center justify-center rounded-full"
                                style={{
                                    backgroundColor: '#954eff3b',
                                    left: '34px',
                                    top: '28px',
                                }}
                                data-oid="nc_ojqm"
                            >
                                {cartQuantity}
                            </div>
                        ) : (
                            ''
                        )}
                    </button>
                </div>

                <Link to="/" className={styles.logo} data-oid="2g7b.xk">
                    <DiscoLogo data-oid="k5i-:00" className="w-[90%]" />
                </Link>

                <div className="flex justify-end items-center flex-1" data-oid="gta9zd2">
                    <MobileMenu collections={collections} data-oid="48n_ip9" />{' '}
                </div>
            </div>
        </motion.header>
    );
};
