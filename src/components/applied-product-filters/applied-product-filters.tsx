import { useMemo } from 'react';
import classNames from 'classnames';
import { ProductFilter, IProductFilters } from '~/src/wix/ecom';
import { formatPrice } from '~/src/wix/products';
import { AppliedFilter } from '../applied-filter/applied-filter';

import styles from './applied-product-filters.module.scss';

interface AppliedProductFiltersProps {
    appliedFilters: IProductFilters;
    onClearFilters: (filters: ProductFilter[]) => void;
    onClearAllFilters: () => void;
    currency: string;
    // Min and max prices in the current category.
    // Used to replace missing bounds ("$5 - ?" or "? - $25") when only one filter bound is set.
    minPriceInCategory: number;
    maxPriceInCategory: number;
    className?: string;
}

export const AppliedProductFilters = ({
    appliedFilters,
    onClearFilters,
    onClearAllFilters,
    currency,
    minPriceInCategory,
    maxPriceInCategory,
    className,
}: AppliedProductFiltersProps) => {
    const { search, minPrice, maxPrice } = appliedFilters;

    const priceFilter = useMemo<JSX.Element | null>(() => {
        if (minPrice === undefined && maxPrice === undefined) {
            return null;
        } else {
            return (
                <span data-oid="cqckp2b">
                    {formatPrice(minPrice ?? minPriceInCategory, currency)}&ndash;
                    {formatPrice(maxPrice ?? maxPriceInCategory, currency)}
                </span>
            );
        }
    }, [minPrice, maxPrice, currency, minPriceInCategory, maxPriceInCategory]);

    return (
        <div className={classNames(styles.root, className)} data-oid="mbsrtm7">
            {search && (
                <AppliedFilter
                    onClick={() => {
                        onClearFilters([ProductFilter.search]);
                    }}
                    data-oid="1fs5m98"
                >
                    {search}
                </AppliedFilter>
            )}
            {priceFilter && (
                <AppliedFilter
                    onClick={() => {
                        onClearFilters([ProductFilter.minPrice, ProductFilter.maxPrice]);
                    }}
                    data-oid="cu_vqgw"
                >
                    {priceFilter}
                </AppliedFilter>
            )}

            <button
                className={classNames(styles.clearAllButton, 'linkButton')}
                onClick={onClearAllFilters}
                data-oid="-cw4o8p"
            >
                Clear All
            </button>
        </div>
    );
};
