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
  results: any;
  filterIds: string[];
  updateFilterIds: (newFilterIds: string[]) => void;
}

// Add this CSS class to your global styles or component-specific styles
const noSelectClass = `
  .no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export function FacetValueFilters({ results, filterIds, updateFilterIds }: FacetValueFiltersProps) {
  const onTagClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    event.preventDefault();
    event.stopPropagation();


    const newFilterIds = filterIds.includes(id)
      ? filterIds.filter((fid) => fid !== id)
      : [...filterIds, id];
    updateFilterIds(newFilterIds);
  };

    // Sort and group facets

    // Sort the facets by name
    const facetOrder = Object.keys(
        results.reduce((groups, item) => {
            const facetName = item.facetValue.facet.name;
            if (!groups[facetName]) {
                groups[facetName] = [];
            }
            groups[facetName].push(item);
            return groups;
        }, {}),
    );

    // Sort the facets by name
    facetOrder.sort((a, b) => a.localeCompare(b));

    const groupedFacets = results.reduce((groups, item) => {
        const facetName = item.facetValue.facet.name;
        if (!groups[facetName]) {
            groups[facetName] = [];
        }
        groups[facetName].push(item);
        return groups;
    }, {});


    return (
      <Form method="get" data-oid=":sg.f3e">
            <div style={{ alignContent: 'center' }} data-oid="us5yrw5">
                {/* <h3 style={{
          fontSize: '18px',
          lineHeight: '27px',
          fontWeight: '400',
          textAlign: 'center',
          }}>
          Filter
          </h3> */}

                {facetOrder.map((group) => (
                    <Accordion key={group} type="multiple" className="" data-oid="-rxad3d">
                        <AccordionItem className="px-2" value="groups" data-oid="ug-4g6f">
                            <AccordionTrigger className="" data-oid="3e0_.y8">
                            {group}
                            </AccordionTrigger>
                            <AccordionContent data-oid="isc2l:q">
                             
                    {/* <div
                        key={group}
                        style={
                            {
                                // paddingTop: '20px',
                                // paddingLeft: '16px',
                                // paddingRight: '16px',
                            }
                        }
                        data-oid="4n3f9rw"
                    >
                        <h3
                            style={{
                                fontSize: '18px',
                                lineHeight: '27px',
                                fontWeight: '600',
                                // textAlign: 'center',
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                textTransform: 'uppercase',
                            }}
                            data-oid="nxlxjqd"
                        >
                            {group}
                        </h3> */}
                        <div
                            className="no-select"
                            style={{
                                paddingTop: '8px',
                                paddingBottom: '16px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px',
                            }}
                            data-oid="zcrnrj3"
                        >
          

                            {groupedFacets[group].map((f) => {
                                const isSelected = filterIds.includes(f.facetValue.id);
                                const colorClass =
                                    group.toLowerCase() === 'colors'
                                        ? getTailwindColorClass(f.facetValue.name)
                                        : '';

                                return (
                                    <div
                                        key={f.facetValue.id}
                                        onClick={(e) => onTagClick(e, f.facetValue.id)}
                                        className={`no-select cursor-pointer text-sm rounded-full px-2 py-1 ${isSelected ? 'outline outline-[2px] outline-offset-[2px] mx-1' : ' outline-none'} ${group.toLowerCase() === 'colors' ? colorClass : isSelected ? 'text-background bg-foreground' : 'bg-stone-200 text-foreground'}`}
                                        data-oid="o2799:t"
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
