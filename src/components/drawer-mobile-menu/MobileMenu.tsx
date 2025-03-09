import React, { useState, useEffect } from 'react';
import type { MotionValue } from 'framer-motion';
import {
    Sheet,
    SheetTrigger,
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
import { Menu as MenuIcon } from 'lucide-react';
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

            <button className="group relative border-[#954eff3b] flex mr-8 p-2 h-9 w-9 items-center justify-center overflow-hidden rounded-full  shadow-md shadow-gray-200 transition-all duration-500" onClick={() => setIsOpen(!isOpen)} >
                <MenuIcon 
                className="relative z-10 transition-all duration-300 group-hover:fill-white"
              />
                            <div className="absolute left-0 top-full z-0 h-full w-full rounded-full bg-[#954eff3b] transition-all duration-500 group-hover:top-0">
                                </div>
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
                <SheetHeader data-oid="xoj-50q">
                    <SheetTitle data-oid="m1hho67"></SheetTitle>
                    <SheetDescription data-oid="1rjl1kx"></SheetDescription>
                </SheetHeader>
                <div
                    className="flex justify-between items-center px-2 py-2 mb-4 border-b-[1px] border-gray-500"
                    data-oid="5:ywe8q"
                >
                    <h2 className="text-md text-gray-900" data-oid=".7h.3gt">
                        Menu
                    </h2>
                </div>

                <Accordion type="multiple" data-oid="-rxad3d">
                    <AccordionItem value="collections" data-oid="ug-4g6f">
                        <AccordionTrigger
                            className="text-xl pt-3 pb-2 px-2"
                            data-oid="3e0_.y8"
                        >
                            Collections&nbsp;&nbsp;
                        </AccordionTrigger>
                        <AccordionContent data-oid="isc2l:q">
                            <ul className="bg-black text-white rounded-2xl py-1" data-oid="tnl0yx8">
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
                                            <li
                                                className="text-lg px-4"
                                                data-oid="pjiaoi6"
                                            >
                                                {collection.name}
                                            </li>
                                        </Link>
                                    ),
                                )}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="categories" data-oid="9:ond4q">
                        <AccordionTrigger
                            className="text-xl pt-3 pb-2 px-2"
                            data-oid="5zs6-ct"
                        >
                            Categories&nbsp;&nbsp;
                        </AccordionTrigger>
                        <AccordionContent data-oid="_j_9.w8">
                        <ul className="bg-black text-white rounded-2xl py-1" data-oid="tnl0yx8">
                        {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/products/${category.slug}`}
                                        data-oid="eyqy_2e"
                                    >
                                        <li className="text-lg px-4 py-2" data-oid="snkgn2p">
                                            {category.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
