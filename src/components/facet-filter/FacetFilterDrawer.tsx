import { Settings2 } from 'lucide-react';
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
                <Settings2
                    className="fixed pointer-events-auto cursor-pointer rounded-full bg-secondary top-[79px] right-4 w-[28px] h-[28px] p-1 isolate z-[100]"
                    data-oid="-cle7y0"
                />
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll no-scrollbar pt-0" data-oid="esxop__">
                <SheetHeader data-oid="0:isoka">
                    <SheetTitle data-oid="wawaw-l"></SheetTitle>
                    <SheetDescription data-oid="z:b.evb"></SheetDescription>
                </SheetHeader>
                <div
                    className="flex justify-between items-center px-2 py-2 mb-4 border-b-[1px] border-gray-500"
                    data-oid="wenv:j_"
                >
                    <h2 className="text-md text-gray-900" data-oid="e.og80m">
                        Filter
                    </h2>
                </div>
                <FacetValueFilters
                    results={results}
                    filterIds={filterIds}
                    updateFilterIds={updateFilterIds}
                    data-oid="_0r730s"
                />

                <SheetFooter data-oid="43nnvli">
                    <SheetClose asChild data-oid=".ae65u6"></SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
