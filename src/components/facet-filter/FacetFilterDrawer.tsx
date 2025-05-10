import { Settings2, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/src/components/ui/sheet';
import { FacetValueFilters } from './FacetValueFilters';

export default function FacetFilterDrawer({
    results,
    filterIds,
    updateFilterIds,
}: {
    results: any[];
    filterIds: string[];
    updateFilterIds: (ids: string[]) => void;
}) {
    return (
        <Sheet data-oid="im5ygot">
            <SheetTrigger asChild data-oid="u8l2fs1">
                <button className="top-0 mt-[20px] z-[100] group fixed border-[var(--ui1)] flex right-[116px] p-2 h-9 w-9 items-center justify-center overflow-hidden rounded-full  shadow-md shadow-gray-200 transition-all duration-300">
                    <Settings2
                        className="relative z-[100] transition-all duration-300"
                        data-oid="-cle7y0"
                    />
                    <div className="z-[99] absolute top-full h-full w-full rounded-full bg-[var(--ui1)] transition-all duration-300 group-hover:top-0"></div>
                </button>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll no-scrollbar pt-0" data-oid="esxop__">
                {/* <div className="my-gradient absolute opacity-80 inset-0 w-full h-full object-cover rounded-2xl backdrop-blur-sm"></div> */}
                <div className="px-4 bg-background absolute inset-0">
                    <SheetHeader data-oid="0:isoka">
                        <SheetTitle data-oid="wawaw-l"></SheetTitle>
                        <SheetDescription data-oid="z:b.evb"></SheetDescription>
                    </SheetHeader>
                    <div
                        className="flex justify-between items-center px-2 py-3 mb-4"
                        data-oid="wenv:j_"
                    >
                        <h2 className="text-md text-foreground" data-oid="e.og80m">
                            Filter
                        </h2>
                        <SheetClose asChild>
                            <X
                                className="h-6 w-6 z-50 pointer-events-auto cursor-pointer opacity-70 transition-opacity hover:opacity-100 data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-800"
                                data-oid="-oyfs60"
                            />
                        </SheetClose>
                    </div>
                    <FacetValueFilters
                        results={results}
                        filterIds={filterIds}
                        updateFilterIds={updateFilterIds}
                        data-oid="_0r730s"
                    />

                    <SheetFooter className="my-5" data-oid="43nnvli">
                        <SheetClose asChild data-oid=".ae65u6">
                            <Button className="my-gradient border-[2px] border-foreground w-full text-foreground">
                                Results
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
}
