import { Link, useNavigate, useLocation } from '@remix-run/react';
import { motion, useTransform, useScroll } from 'framer-motion';
import classNames from 'classnames';
import { DiscoLogo } from '~/src/components/icons/disco-logo';
import { useIsMobile } from '~/src/vendure/hooks/use-mobile';

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
    const isMobile = useIsMobile();
    const isCollections = location.pathname.startsWith('/products/');
    const isProductDetails = location.pathname.startsWith('/product-details/');
    const isHomePage = location.pathname === '/';
    const colorDark = 'rgba(0, 0, 0, 1)';
    const colorLight = 'rgba(250, 249, 246, 1)';
    const colorLightTrans = 'rgba(250, 249, 246, 0)';
    const colorBanner = useTransform(
        scrollY,
        [0, 62],
        isHomePage ? [colorLight, colorDark] : [colorDark, colorDark],
    );
    const colorLogo = useTransform(
        scrollY,
        [0, 62],
        isProductDetails && isMobile ? [colorLight, colorDark] : 
        isProductDetails ? [colorLight, colorLight] : 
        isHomePage ? [colorLight, colorDark] : [colorDark, colorDark]
    );
        const colorNav = useTransform(
        scrollY,
        [0, 62],
        isProductDetails && isMobile ? [colorLight, colorDark] : 
        isProductDetails ? [colorDark, colorDark] : 
        isHomePage ? [colorLight, colorDark] : [colorDark, colorDark]
    );

    const background = useTransform(
        scrollY,
        [0, 62],
        isHomePage ? [colorLightTrans, colorLight] : 
        isProductDetails && isMobile ? [colorLightTrans, colorLight] :
        isProductDetails ? [colorLightTrans, colorLightTrans] : [colorLight, colorLight],
    );


    const navigate = useNavigate();

    return (
        <div className="absolute top-0 left-0 w-full flex">
            <div className={classNames(styles.root, className)}>
<motion.div
    style={{
        background,
    }}
    data-oid="e490jhm"
>
                    <div
                        className="py-1 px-6 relative flex flex-row items-center justify-between h-full w-full"
                        data-oid="j9mn1qx"
                    >
                        <motion.div
                        style={{
                            color: colorLogo,
                        }}
                        data-oid="e490jhm"
                    >
                        <Link to="/" data-oid="2g7b.xk">
                            <DiscoLogo
                                data-oid="k5i-:00"
                                className="h-[40px] px-1.5 mx-auto py-1.5"
                            />
                        </Link>
                         </motion.div>
                        <div className="relative flex flex-row gap-2">
                            <motion.div
                            style={{
                                color: colorNav,
                            }}
                        >
                            <div className="px-1 py-1 flex flex-row gap-2 items-center">
                                {/* 
                        Placeholder filter button
                         */}
                                {isCollections ? (
                                    <div
                                        className="relative flex-shrink flex-col items-center justify-center"
                                        data-oid="._m2pef"
                                    >
                                        <div className="flex flex-col h-10 w-10 items-center justify-center"></div>
                                    </div>
                                ) : null}

                                <div

                                    className="relative flex-shrink flex-col items-center justify-center"
                                    data-oid="._m2pef"
                                >
                                    <button
                                    
                                        className="group relative border-[var(--ui1)] flex p-2 h-9 w-9 items-center justify-center overflow-hidden rounded-full shadow-md shadow-gray-200 transition-all duration-300"
                                        onClick={onCartIconClick}
                                    >
                                        <Cart
                                            data-oid="m:up2t3"
                                          
                                            className="relative z-10 transition-all duration-300"
                                        />
                                        <div className="absolute z-0 left-0 top-full h-full w-full rounded-full bg-[var(--ui1)] transition-all duration-300 group-hover:top-0"></div>
                                    </button>

                                    {cartQuantity ? (
                                        <div
                                            className="-right-[6px] -top-[6px] flex text-[14px] leading-1 font-[500] aspect-[1/1] px-2 absolute items-center justify-center rounded-full"
                                            style={{
                                                backgroundColor: 'var(--ui1)',
                                                // left: '34px',
                                                // top: '2px',
                                            }}
                                            data-oid="nc_ojqm"
                                        >
                                            {cartQuantity}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                {/* </motion.div>
                                <motion.div
                id="navigation"
                style={{
                    color,
                    background,
                }}
                className="rounded-full"
                data-oid="e490jhm"
            > */}
                                <div
                                    className="flex justify-end items-center flex-shrink"
                                    data-oid="gta9zd2"
                                >
                                    <MobileMenu
                                     collections={collections} data-oid="48n_ip9" />{' '}
                                </div>
                            </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
