import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FacetValueFilters } from "~/app/components/FacetFilters/FacetValueFilters";


export default function FacetFilterDrawer({
    results,
    filterIds,
    updateFilterIds
  }: {
    results: any[];
    filterIds: string[];
    updateFilterIds: (ids: string[]) => void;
  }) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Settings2 className="fixed pointer-events-auto cursor-pointer top-[62px] right-4 w-6 h-[62px] isolate z-[100]" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <FacetValueFilters
                 results={results}
                 filterIds={filterIds}
                 updateFilterIds={updateFilterIds}
               />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
