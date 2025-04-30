import React, { useState, useEffect } from 'react';
import type { MotionValue } from 'framer-motion';
import {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '~/src/components/ui/sheet';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '~/src/components/ui/accordion';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Link } from '@remix-run/react';
import { invertBy } from 'lodash';

type MobileMenuProps = {
    collections: Array<any>;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ collections }) => {
    const [isOpen, setIsOpen] = useState(false);

    const categories = collections?.filter((collection) => collection.parentId === '15');
    const subCollections = collections?.filter((collection) => collection?.parentId === '12');

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('prevent-scroll');
        } else {
            document.body.classList.remove('prevent-scroll');
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} data-oid="39896ch">
            <SheetTrigger asChild data-oid="x5hlo1o">
                <button
                    className=" group relative border-[var(--ui1)] flex mr-[4px] p-2 h-9 w-9 items-center justify-center overflow-hidden rounded-full  shadow-md shadow-gray-200 transition-all duration-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MenuIcon className="relative z-10 mx-auto transition-all duration-300 group-hover:fill-white" />
                    <div className="absolute left-0 top-full z-0 h-full w-full rounded-full bg-[var(--ui1)] transition-all duration-500 group-hover:top-0"></div>
                </button>

                {/* 
                <button
                    className="flex flex-col bg-opacity-90 shadow-none cursor-pointer justify-center rounded-full items-center py-2 text-sm transition-all px-4 duration-300 ease-out hover:opacity-70"
                    data-oid="f7okb41"
                > 
                    <MenuIcon onClick={() => setIsOpen(!isOpen)} data-oid="lzx_6d5" />
                 </button>
                 */}
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll no-scrollbar pt-0" data-oid="a3.st13">
                {/* <img
                    className="absolute opacity-70 inset-0 w-full h-full object-cover rounded-2xl backdrop-blur-[4px]"
                    src="/bgmobile.webp"
                    alt=""
                /> */}
                <div className="my-gradient absolute opacity-80 inset-0 w-full h-full object-cover rounded-2xl"></div>
                <div className="px-4 bg-white/20 absolute inset-0 ">
                    <SheetHeader data-oid="xoj-50q">
                        <SheetTitle data-oid="m1hho67"></SheetTitle>
                        <SheetDescription data-oid="1rjl1kx"></SheetDescription>
                    </SheetHeader>
                    <div
                        className="flex justify-between items-center px-2 py-3 mb-4 border-b-[2px] border-black"
                        data-oid="j9sp_km"
                    >
                        <h2 className="text-md " data-oid="_2nt9kt">
                            Menu
                        </h2>
                        <SheetClose asChild>
                            <X
                                className="h-6 w-6 z-50 pointer-events-auto cursor-pointer opacity-70 transition-opacity hover:opacity-100 data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-800"
                                data-oid="-oyfs60"
                            />
                        </SheetClose>
                    </div>

                    <Accordion type="multiple" className="" data-oid="-rxad3d">
                        <AccordionItem className="px-2" value="collections" data-oid="ug-4g6f">
                            <AccordionTrigger className="" data-oid="3e0_.y8">
                                Collections&nbsp;&nbsp;
                            </AccordionTrigger>
                            <AccordionContent data-oid="isc2l:q">
                                <ul className="" data-oid="tnl0yx8">
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
                                            <SheetClose key={collection.id} asChild>
                                                <Link
                                                    key={collection.id}
                                                    to={`/products/${collection.slug}`}
                                                    data-oid="pc7-ep."
                                                >
                                                    <li
                                                        className="heading4 w-fit flex relative after:bg-black after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                                        data-oid="pjiaoi6"
                                                    >
                                                        {collection.name}
                                                    </li>
                                                </Link>
                                            </SheetClose>
                                        ),
                                    )}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="px-2" value="categories" data-oid="9:ond4q">
                            <AccordionTrigger className="" data-oid="5zs6-ct">
                                Categories&nbsp;&nbsp;
                            </AccordionTrigger>
                            <AccordionContent data-oid="_j_9.w8">
                                <ul className="" data-oid="tnl0yx8">
                                    {categories.map((category) => (
                                        <SheetClose key={category.id} asChild>
                                            <Link
                                                key={category.id}
                                                to={`/products/${category.slug}`}
                                                data-oid="eyqy_2e"
                                            >
                                                <li
                                                    className="heading4 w-fit flex relative after:bg-black after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                                                    data-oid="snkgn2p"
                                                >
                                                    {category.name}
                                                </li>
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
