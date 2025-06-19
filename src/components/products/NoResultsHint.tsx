import { FacetFilterTracker } from '~/src/components/facet-filter/facet-filter-tracker';
import { ComponentProps } from 'react';
// import { useTranslation } from 'react-i18next';

export function NoResultsHint({
    facetFilterTracker,
    ...props
}: { facetFilterTracker?: FacetFilterTracker } & ComponentProps<'div'>) {
    // const { t } = useTranslation();

    return (
        <div {...props} data-oid="m37eq43">
            <h2
                className="text-2xl sm:text-4xl font-light tracking-tight text-gray-900"
                data-oid="t738659"
            >
                {'product.noResults'}
            </h2>
            {facetFilterTracker?.facetsWithValues.some((f) => f.values.some((v) => v.selected)) && (
                <h3
                    className="text-lg sm:text-2xl font-light tracking-tight text-gray-900"
                    data-oid="fcrxt6v"
                >
                    {'product.filterTip'}
                </h3>
            )}
        </div>
    );
}
