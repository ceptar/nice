import { Link, useNavigate, useLocation } from '@remix-run/react';
import { motion, useTransform, useScroll } from 'framer-motion';
import classNames from 'classnames';
import { DiscoLogo } from '~/src/components/icons/disco-logo';
import { useIsMobile } from '~/src/vendure/hooks/use-mobile';

import MobileMenu from '~/src/components/mobile-menu/MobileMenu';
import Cart from '~/src/components/icons/cart';
import { Button } from '../ui/button';
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
    const isHomePage = location.pathname === '/' || isCollections;
    const colorDark = 'rgba(0, 0, 0, 1)';
    const colorLight = 'rgba(239,239,239, 1)';
    const colorLightTrans = 'rgba(239,239,239, 0)';
    const colorBanner = useTransform(
        scrollY,
        [0, 62],
        isHomePage ? [colorLight, colorDark] : [colorDark, colorDark],
    );
    const colorLogo = useTransform(
        scrollY,
        [0, 62],
        isProductDetails && isMobile
            ? [colorLight, colorDark]
            : isProductDetails
              ? [colorLight, colorLight]
              : isHomePage
                ? [colorLight, colorDark]
                : [colorDark, colorDark],
    );
    const colorNav = useTransform(
        scrollY,
        [0, 62],
        isProductDetails && isMobile
            ? [colorLight, colorDark]
            : isProductDetails
              ? [colorDark, colorDark]
              : isHomePage
                ? [colorLight, colorDark]
                : [colorDark, colorDark],
    );

    const bgNav = useTransform(
        scrollY,
        [0, 62],
        isHomePage
            ? [colorLightTrans, colorLight]
            : isProductDetails && isMobile
              ? [colorLightTrans, colorLight]
              : isProductDetails
                ? [colorLightTrans, colorLightTrans]
                : [colorLight, colorLight],
    );

    const navigate = useNavigate();

    return (
        <motion.div
            className="fixed z-[100] top-0 left-0 right-0 h-fit"
            style={{
                background: bgNav,
            }}
        >
            <motion.div
                style={{
                    color: colorLogo,
                    borderColor: colorLogo,
                    borderBottomWidth: '0.64px',
                }}
                className="relative grid grid-cols-2 gap-0 items-center justify-between h-fit w-full"
                data-oid="j9mn1qx"
            >
                <div
                    className="flex overflow-hidden h-discoNavHeight items-center justify-start pl-8 py-3.5 w-fit"
                    data-oid="e490jhm"
                >
                    <Link to="/" data-oid="2g7b.xk" className="flex items-center justify-center h-full w-full">
                        <DiscoLogo data-oid="k5i-:00" className="flex h-full w-full" />
                    </Link>
                </div>

                <motion.div
                    className="relative flex flex-row-reverse px-3.5 text-foreground"
            // style={{
            //        color: colorNav,
            //         background: bgNav,
            //           borderColor: colorNav,

            //         }}
                >
                    {/* 
                        Placeholder filter button
                         */}
                    {isCollections ? (
                        <div className="order-3 w-10 h-10 flex flex-col items-center justify-center"></div>
                    ) : null}

                    <div
                        className="order-2 w-10 h-10 flex flex-col items-center justify-center"
                        data-oid="._m2pef"
                    >
 <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-8 w-8 rounded-full border-[1.5px]"
                        onClick={onCartIconClick}

                        >
                            <Cart className="w-4 h-4" data-oid="m:up2t3" />

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
                        </Button>
                    </div>

                    <div
                        className="order-1 w-10 h-10 flex flex-col items-center justify-center"
                        data-oid="gta9zd2"
                    >

                        <MobileMenu collections={collections} data-oid="48n_ip9" />{' '}
                  
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
