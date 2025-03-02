import { Link, NavLink } from '@remix-run/react';
import classNames from 'classnames';
import { CategoryLink } from '~/src/components/category-link/category-link';
import { FadeIn } from '~/src/components/visual-effects';

import styles from './footer.module.scss';

export interface FooterProps {
    className?: string;
}

export const Footer = ({ className }: FooterProps) => {
    const navItemStyle = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.navItem, {
            [styles.active]: isActive,
        });

    return (
        <footer className={classNames(styles.root, className)} data-oid="xl0ysw4">
            <FadeIn className={styles.navigation} duration={1.8} data-oid=".80hw7s">
                <nav data-oid="sv_vehb">
                    <ul className={styles.navList} data-oid="nx3iqu3">
                        <li data-oid="uhkhu1p">
                            <CategoryLink
                                categorySlug="all-products"
                                className={navItemStyle}
                                data-oid=".xo4v18"
                            >
                                Shop All
                            </CategoryLink>
                        </li>
                        <li data-oid="wfsgy_q">
                            <CategoryLink
                                categorySlug="kitchen-essentials"
                                className={navItemStyle}
                                data-oid="379qgo-"
                            >
                                Kitchen
                            </CategoryLink>
                        </li>
                        <li data-oid="r3ckkru">
                            <CategoryLink
                                categorySlug="bath"
                                className={navItemStyle}
                                data-oid="--h.pg."
                            >
                                Bath
                            </CategoryLink>
                        </li>
                        <li data-oid="f0nv-93">
                            <CategoryLink
                                categorySlug="on-the-go"
                                className={navItemStyle}
                                data-oid="okd26so"
                            >
                                On the Go
                            </CategoryLink>
                        </li>
                        <li data-oid="s0ie4sb">
                            <CategoryLink
                                categorySlug="new-in"
                                className={navItemStyle}
                                data-oid="adlnzis"
                            >
                                New In
                            </CategoryLink>
                        </li>
                        <li data-oid="in.mra4">
                            <CategoryLink
                                categorySlug="best-sellers"
                                className={navItemStyle}
                                data-oid="vtr:lgs"
                            >
                                Best Sellers
                            </CategoryLink>
                        </li>
                        <li data-oid=":4hfs3j">
                            <NavLink to="/about-us" className={navItemStyle} data-oid="c3xkeh_">
                                About Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <ul className={styles.navList} data-oid="_w8qnpl">
                    <li data-oid="o5k3xje">
                        <NavLink
                            to="/terms-and-conditions"
                            className={navItemStyle}
                            data-oid="1k08j8_"
                        >
                            Terms & Conditions
                        </NavLink>
                    </li>
                    <li data-oid="wmlk-1l">
                        <NavLink to="/privacy-policy" className={navItemStyle} data-oid="x0k9c:s">
                            Privacy Policy
                        </NavLink>
                    </li>
                    <li data-oid="j:u3d1e">
                        <NavLink to="/shipping-policy" className={navItemStyle} data-oid="pl8qpcp">
                            Shipping Policy
                        </NavLink>
                    </li>
                    <li data-oid="cm2vf.i">
                        <NavLink to="/refund-policy" className={navItemStyle} data-oid="auhrq3q">
                            Refund Policy
                        </NavLink>
                    </li>
                </ul>
                <ul className={styles.navList} data-oid="0piv41d">
                    <li data-oid="d48fnc-">
                        <Link
                            to="https://www.facebook.com/WixStudio"
                            className={styles.navItem}
                            target="_blank"
                            data-oid="e.auw2g"
                        >
                            Facebook
                        </Link>
                    </li>
                    <li data-oid="jv6l267">
                        <Link
                            to="https://www.instagram.com/wixstudio"
                            className={styles.navItem}
                            target="_blank"
                            data-oid="8hd_9ug"
                        >
                            Instagram
                        </Link>
                    </li>
                    <li data-oid="xgmdpr_">
                        <Link
                            to="https://www.pinterest.com/wixcom"
                            className={styles.navItem}
                            target="_blank"
                            data-oid="-3:v.vu"
                        >
                            Pinterest
                        </Link>
                    </li>
                </ul>
            </FadeIn>
            <FadeIn className={styles.bottomBar} duration={1.8} data-oid="4m.fsrv">
                <Link to="/" className={styles.logo} data-oid="8e-0ww.">
                    ReClaim
                </Link>
                <div className={styles.copyright} data-oid="_4m1-e4">
                    <span data-oid="6cgk2v3">© 2035 by ReClaim. Made with </span>
                    <Link
                        to="https://www.codux.com/"
                        className={styles.coduxLink}
                        data-oid="482lc99"
                    >
                        Codux™
                    </Link>
                </div>
            </FadeIn>
        </footer>
    );
};
