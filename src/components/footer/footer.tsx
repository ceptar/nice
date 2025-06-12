import { Link, NavLink } from '@remix-run/react';
import { useRootLoader } from '~/src/vendure/utils/use-root-loader';
import classNames from 'classnames';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { FadeIn } from '~/src/components/visual-effects';
import { LastRow } from '~/src/components/last-row/last-row';
import LogoTwoLines from '~/src/components/icons/diso-logo-twolines';

import styles from './footer.module.scss';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@radix-ui/react-accordion';

export interface FooterProps {
    className?: string;
}

export const Footer = ({ className }: FooterProps) => {
    const RootLoaderData = useRootLoader().collections;
    const categories = RootLoaderData?.filter((collection) => collection.parentId === '15');
    const subCollections = RootLoaderData?.filter((collection) => collection?.parentId === '12');

    const navItemStyle = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.navItem, {
            [styles.active]: isActive,
        });

    return (
        <footer className={classNames(styles.root, className)}>
            <FadeIn className="relative w-full h-full z-[9]" duration={1.8}>
                {/* <div
            style={{
                opacity: '100%',
                backgroundImage:
                    'radial-gradient(circle at 95.98% 92.95%, #86e7da, transparent 65%),radial-gradient(circle at 37.98% 80.00%, #212c1c, transparent 57%),radial-gradient(circle at 4.02% 92.05%, #305216, transparent 1%),radial-gradient(circle at 62.02% 5.00%, #ff4baf, transparent 65%),radial-gradient(circle at 50% 50%, #428f87, #428f87 100%)',
                backgroundBlendMode: 'multiply, overlay, color-burn, color-dodge, normal',
                //   filter: 'saturate(0)', // Added filter
            }}
            className={'absolute inset-0 z-[1]'}
        ></div> */}
                <div className="absolute inset-0 bg-white overflow-hidden">
                    <img
                        src="/bgFooter.webp"
                        className="w-full h-full object-cover object-top opacity-100"
                        alt=""
                        data-oid="-i3pz2e"
                    />
                </div>

                <div className="absolute inset-0 text-[16px] bg-white/50 mix-blend-exclusion backdrop-blur-sm">
                    <div className="relative z-[20] h-discoPadding w-full">
                        {/* <div className="relative w-full h-1 bg-foreground"></div> */}
                    </div>

                    <div className="z-[20] relative text-foreground flex flex-col flex-wrap mx-auto md:flex-no-wrap md:flex-row md:items-center">
                        <div className="flex flex-wrap flex-grow md:text-left mb-[30px]">
                            <div className="w-full lg:w-1/4 md:w-1/2 mb-[2rem] pl-4">
                                <div className="font-[600] uppercase" data-oid="3e0_.y8">
                                    Collections&nbsp;&nbsp;
                                </div>
                                <div data-oid="isc2l:q">
                                    <ul data-oid="tnl0yx8">
                                        {subCollections.map(
                                            (collection: {
                                                id: React.Key | null | undefined;
                                                slug: any;
                                                name:
                                                    | string
                                                    | number
                                                    | boolean
                                                    | React.ReactElement<
                                                          any,
                                                          string | React.JSXElementConstructor<any>
                                                      >
                                                    | Iterable<React.ReactNode>
                                                    | React.ReactPortal
                                                    | null
                                                    | undefined;
                                            }) => (
                                                <Link
                                                    className="w-fit flex relative after:bg-black after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                                    key={collection.id}
                                                    to={`/products/${collection.slug}`}
                                                    data-oid="pc7-ep."
                                                >
                                                    <li data-oid="pjiaoi6">{collection.name}</li>
                                                </Link>
                                            ),
                                        )}
                                    </ul>

                                    <div className="font-[600] uppercase mt-4" data-oid="5zs6-ct">
                                        Categories&nbsp;&nbsp;
                                    </div>
                                    <div data-oid="_j_9.w8">
                                        <ul
                                            // className="opacity-90"
                                            data-oid="tnl0yx8"
                                        >
                                            {categories.map((category) => (
                                                <Link
                                                    className="w-fit flex relative after:bg-black after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                                    key={category.id}
                                                    to={`/products/${category.slug}`}
                                                    data-oid="eyqy_2e"
                                                >
                                                    <li className="text-md" data-oid="snkgn2p">
                                                        {category.name}
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 md:w-1/2 mb-[2rem] pl-4">
                                <ul className={styles.navList}>
                                    <li>
                                        <NavLink
                                            to="/terms-and-conditions"
                                            className={navItemStyle}
                                        >
                                            Terms & Conditions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/privacy-policy" className={navItemStyle}>
                                            Privacy Policy
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/shipping-policy" className={navItemStyle}>
                                            Shipping Policy
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/refund-policy" className={navItemStyle}>
                                            Refund Policy
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/4 md:w-1/2 mb-[2rem] pl-4">
                                <ul className={styles.navList}>
                                    <li>
                                        <Link
                                            to="https://www.facebook.com/WixStudio"
                                            className={styles.navItem}
                                            target="_blank"
                                        >
                                            Facebook
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="https://www.instagram.com/wixstudio"
                                            className={styles.navItem}
                                            target="_blank"
                                        >
                                            Instagram
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="https://www.pinterest.com/wixcom"
                                            className={styles.navItem}
                                            target="_blank"
                                        >
                                            Pinterest
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/4 md:w-1/2 mb-[2rem]">
                                <div className="mx-auto">
                                    {/* <LogoTwoLines
                fill="#fff"
                className="-ml-2 mr-auto max-h-[5rem]"
              /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <LastRow />
                </div>

                <div className="relative w-full h-full text-[16px] bg-white/0 mix-blend-screen opacity-70 pointer-events-none">
                    <div className="relative z-[20] h-discoPadding w-full">
                        {/* <div className="relative w-full h-1 bg-foreground"></div> */}
                    </div>

                    <div className="z-[20] relative text-background flex flex-col flex-wrap mx-auto md:flex-no-wrap md:flex-row md:items-center">
                        <div className="flex flex-wrap flex-grow md:text-left mb-[30px]">
                            <div className="w-full lg:w-1/4 md:w-1/2 mb-[2rem] pl-4">
                                <div className="font-[600] uppercase" data-oid="3e0_.y8">
                                    Collections&nbsp;&nbsp;
                                </div>
                                <div data-oid="isc2l:q">
                                    <ul data-oid="tnl0yx8">
                                        {subCollections.map(
                                            (collection: {
                                                id: React.Key | null | undefined;
                                                slug: any;
                                                name:
                                                    | string
                                                    | number
                                                    | boolean
                                                    | React.ReactElement<
                                                          any,
                                                          string | React.JSXElementConstructor<any>
                                                      >
                                                    | Iterable<React.ReactNode>
                                                    | React.ReactPortal
                                                    | null
                                                    | undefined;
                                            }) => (
                                                <Link
                                                    className="w-fit flex relative after:bg-black after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                                    key={collection.id}
                                                    to={`/products/${collection.slug}`}
                                                    data-oid="pc7-ep."
                                                >
                                                    <li data-oid="pjiaoi6">{collection.name}</li>
                                                </Link>
                                            ),
                                        )}
                                    </ul>

                                    <div className="font-[600] uppercase mt-4" data-oid="5zs6-ct">
                                        Categories&nbsp;&nbsp;
                                    </div>
                                    <div data-oid="_j_9.w8">
                                        <ul
                                            // className="opacity-90"
                                            data-oid="tnl0yx8"
                                        >
                                            {categories.map((category) => (
                                                <Link
                                                    className="w-fit flex relative after:bg-black after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                                    key={category.id}
                                                    to={`/products/${category.slug}`}
                                                    data-oid="eyqy_2e"
                                                >
                                                    <li className="text-md" data-oid="snkgn2p">
                                                        {category.name}
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 md:w-1/2 mb-[2rem] pl-4">
                                <ul className={styles.navList}>
                                    <li>
                                        <NavLink
                                            to="/terms-and-conditions"
                                            className={navItemStyle}
                                        >
                                            Terms & Conditions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/privacy-policy" className={navItemStyle}>
                                            Privacy Policy
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/shipping-policy" className={navItemStyle}>
                                            Shipping Policy
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/refund-policy" className={navItemStyle}>
                                            Refund Policy
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/4 md:w-1/2 mb-[2rem] pl-4">
                                <ul className={styles.navList}>
                                    <li>
                                        <Link
                                            to="https://www.facebook.com/WixStudio"
                                            className={styles.navItem}
                                            target="_blank"
                                        >
                                            Facebook
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="https://www.instagram.com/wixstudio"
                                            className={styles.navItem}
                                            target="_blank"
                                        >
                                            Instagram
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="https://www.pinterest.com/wixcom"
                                            className={styles.navItem}
                                            target="_blank"
                                        >
                                            Pinterest
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/4 md:w-1/2 mb-[2rem]">
                                <div className="mx-auto">
                                    {/* <LogoTwoLines
                fill="#fff"
                className="-ml-2 mr-auto max-h-[5rem]"
              /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <LastRow />
                </div>
            </FadeIn>
            {/* <FadeIn className={styles.bottomBar} duration={1.8}>
                    
                    <div className="w-full flex flex-row">© 2025 by DiscoBabes </div>
                </FadeIn> */}
        </footer>
    );
};
