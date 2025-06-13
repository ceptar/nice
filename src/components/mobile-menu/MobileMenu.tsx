import React, { useState, useEffect } from 'react';
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
import { X } from 'lucide-react';
import { MenuIcon as MenuIcon2 } from '../icons';
import { Link } from '@remix-run/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '~/src/components/ui/carousel';
import { Button } from '~/src/components/ui/button';
import { useRootLoader } from '~/src/vendure/utils/use-root-loader';

type MobileMenuProps = {
    collections: Array<any>;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ collections }) => {
    const [isOpen, setIsOpen] = useState(false);

        const RootLoaderData = useRootLoader();
    const carouselCollections = RootLoaderData.featuredCollections;

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
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MenuIcon2 className="z-10 w-9 h-9 flex" />
                </Button>
            </SheetTrigger>
            <SheetContent
                className="overflow-y-scroll bg-background  no-scrollbar pt-0"
                data-oid="a3.st13"
            >
                <div className="absolute inset-0 ">
                    <div className="relative flex flex-col p-4 h-full w-full">
                        <SheetHeader data-oid="xoj-50q">
                            <SheetTitle data-oid="m1hho67"></SheetTitle>
                            <SheetDescription data-oid="1rjl1kx"></SheetDescription>
                        </SheetHeader>
                        <div
                            className="flex justify-between items-center px-2 py-3 mb-4"
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
                        <div className="flex flex-col w-full h-full ">
                            <Accordion
                                type="multiple"
                                className="flex flex-col w-full flex-grow"
                                data-oid="-rxad3d"
                            >
                                <AccordionItem
                                    className="px-2"
                                    value="collections"
                                    data-oid="ug-4g6f"
                                >
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
                                                              | string
                                                              | React.JSXElementConstructor<any>
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
                                <AccordionItem
                                    className="px-2"
                                    value="categories"
                                    data-oid="9:ond4q"
                                >
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
                            <div className="object-cover flex flex-col w-full min-h-fit max-h-fit p-2 rounded-sm">
                                <Carousel
                                    opts={{ align: 'start' }}
                                    className="w-full bg-background"
                                    positionArrows="side"
                                >
                     
                                    <CarouselContent className="-ml-[0px] gap-2  mt-2 z-[9]">
                                        {carouselCollections
                                            .filter(collection => 
                                                collection.slug !== 'featured-items' && 
                                                collection.slug !== 'new-in'
                                            )
                                            .map((collection) => (
                                            <CarouselItem key={collection.id} className="block basis-[40%]">
                                                <div className="flex flex-col w-full h-full">
                                                    <div className="relative bg-secondary rounded-lg flex w-full h-full">
                                                        {collection.featuredAsset && (
                                                            <img
                                                                src={collection.featuredAsset.source}
                                                                className="object-cover w-full h-full opacity-90 rounded-lg"
                                                                alt={collection.name}
                                                                data-oid="-i3pz2e"
                                                            />
                                                        )}
                                                        <div className="flex flex-col text-left overflow-hidden absolute p-5 inset-0">
                                                                <div className="uppercase font-semibold text-white" data-oid="xfoe18hh">
                                                                {collection.name}
                                                            </div>
                                                            <div className="w-full h-full flex-col justify-end items-end flex">
                                                                <div className="justify-end flex flex-col w-full">
                                                                    <Button
                                                                        asChild
                                                                        variant="secondary"
                                                                        className="w-full flex flex-col"
                                                                        data-oid="_ns2d22"
                                                                    >
                                                                        <Link to={`/products/${collection.slug}`}>
                                                                            Shop Collection
                                                                        </Link>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    {/* <div className="w-full flex h-full flex-row"></div> */}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
