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
        <div
        style={{
            "opacity": "80%",
         "backgroundImage": "linear-gradient(180deg, #bfadcc 0%, #ffe1f5 100%), radial-gradient(60.91% 100% at 50% 0%, #dfbbda 0%, #896790 100%), linear-gradient(127.43deg, #00FFFF 0%, #FFFFFF 100%), radial-gradient(100.22% 100% at 70.57% 0%, #FF0000 0%, #00FFE0 100%), linear-gradient(64.82deg, #f2bae4 0%, #3300FF 100%)",
         "backgroundBlendMode": "multiply, overlay, color-burn, color-dodge, normal"
        }}
        className={"relative text-neutral-800 w-full h-full flex flex-col justify-center"}
       >
      <div className={"z-[-1] absolute bg-[#bfadcc] bg-opacity-70 w-full h-full flex flex-col justify-center"}
       ></div>

      
        <footer className={classNames(styles.root, className)}>
            <FadeIn className="" duration={1.8}>
           

            <div className="div flex flex-col flex-wrap mx-auto md:flex-no-wrap md:flex-row md:items-center">
      <div className="flex flex-wrap flex-grow md:text-left mb-[30px]">
        <div className="w-full lg:w-1/4 md:w-1/2 mt-[2rem]">


                            <div className={styles.navItem} data-oid="3e0_.y8">
                                Collections&nbsp;&nbsp;
                            </div>
                            <div data-oid="isc2l:q">
                                <ul
                                    className="font-[var(--heading-font)] leading-[1.6rem] text-white opacity-90"
                                    data-oid="tnl0yx8"
                                >
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
                                                key={collection.id}
                                                to={`/products/${collection.slug}`}
                                                data-oid="pc7-ep."
                                            >
                                                <li className="text-md" data-oid="pjiaoi6">
                                                    {collection.name}
                                                </li>
                                            </Link>
                                        ),
                                    )}
                                </ul>
    
                            <div className={styles.navItem} data-oid="5zs6-ct">
                                Categories&nbsp;&nbsp;
                            </div>
                            <div data-oid="_j_9.w8">
                                <ul
                                    className="font-[var(--heading-font)] leading-[1.6rem] text-white opacity-90"
                                    data-oid="tnl0yx8"
                                >
                                    {categories.map((category) => (
                                        <Link
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
        <div className="w-full lg:w-1/4 md:w-1/2 mt-[2rem]">
        <ul className={styles.navList}>
                    <li>
                        <NavLink to="/terms-and-conditions" className={navItemStyle}>
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
        <div className="w-full lg:w-1/4 md:w-1/2 mt-[2rem]">
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
        <div className="w-full lg:w-1/4 md:w-1/2 mt-[2rem]">

        <div className="mx-auto">
              {/* <LogoTwoLines
                fill="#fff"
                className="-ml-2 mr-auto max-h-[5rem]"
              /> */}
            </div>


        </div>
      </div>
    </div>


            </FadeIn>
            <FadeIn className={styles.bottomBar} duration={1.8}>
                <LastRow />
                <div className="w-full flex flex-row">© 2035 by DiscoBabes </div>
            </FadeIn>
        </footer>
        </div>

        
    );
};
