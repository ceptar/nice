import * as React from 'react';
import { Form, useSubmit, useNavigation } from '@remix-run/react';
import { getTailwindColorClass } from './GetTailwindColorClass';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '~/src/components/ui/accordion';

interface FacetValueFiltersProps {
    results: Array<{
        facetValue: {
            id: string;
            name: string;
            facet: {
                id: string;
                name: string;
            };
        };
        count: number;
    }>;
    filterIds: string[];
    updateFilterIds: (newFilterIds: string[]) => void;
}

export function FacetValueFilters({ results, filterIds, updateFilterIds }: FacetValueFiltersProps) {
    const submit = useSubmit();
    const navigation = useNavigation();
    const isFiltering = navigation.state === "submitting";

    const onTagClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
        event.preventDefault();
        event.stopPropagation();

        const newFilterIds = filterIds.includes(id)
            ? filterIds.filter((fid) => fid !== id)
            : [...filterIds, id];

        // Update the URL with new filter params
        submit(
            { filterIds: newFilterIds.join(',') },
            { method: 'get', replace: true }
        );

        // Update local state
        updateFilterIds(newFilterIds);
    };

    // Sort and group facets
    const groupedFacets = React.useMemo(() => {
        return results.reduce((groups, item) => {
            const facetName = item.facetValue.facet.name;
            if (!groups[facetName]) {
                groups[facetName] = [];
            }
            groups[facetName].push(item);
            return groups;
        }, {} as Record<string, typeof results>);
    }, [results]);

    const facetOrder = React.useMemo(() => {
        return Object.keys(groupedFacets).sort((a, b) => a.localeCompare(b));
    }, [groupedFacets]);

    return (
        <Form method="get" preventScrollReset>
            <div className="space-y-2">
                {facetOrder.map((group) => (
                    <Accordion 
                        key={group} 
                        type="multiple" 
                        className="border-none"
                    >
                        <AccordionItem 
                            value={group} 
                            className="border-b border-border/50"
                        >
                            <AccordionTrigger className="hover:no-underline">
                                {group}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-wrap gap-2 pt-2 pb-4">
                                    {groupedFacets[group].map((f) => {
                                        const isSelected = filterIds.includes(f.facetValue.id);
                                        const colorClass = group.toLowerCase() === 'colors'
                                            ? getTailwindColorClass(f.facetValue.name)
                                            : '';

                                        return (
                                            <div
                                                key={f.facetValue.id}
                                                onClick={(e) => onTagClick(e, f.facetValue.id)}
                                                className={`
                                                    cursor-pointer text-sm rounded-full px-2 py-1 
                                                    transition-all duration-200 
                                                    ${isSelected ? 'outline outline-[2px] outline-offset-[2px] mx-1' : 'outline-none'} 
                                                    ${group.toLowerCase() === 'colors' 
                                                        ? colorClass 
                                                        : isSelected 
                                                            ? 'text-background bg-foreground' 
                                                            : 'bg-stone-200 text-foreground'
                                                    }
                                                    ${isFiltering ? 'opacity-50 pointer-events-none' : ''}
                                                `}
                                                aria-disabled={isFiltering}
                                            >
                                                {f.facetValue.name} ({f.count})
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </Form>
    );
}