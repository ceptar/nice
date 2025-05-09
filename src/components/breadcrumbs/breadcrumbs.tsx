import React from 'react';
import { Link } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';
import { ChevronRightIcon } from '~/src/components/icons';

import styles from './breadcrumbs.module.scss';

export interface BreadcrumbData {
    title: string;
    to: string;
    /**
     * If true, renders the breadcrumb link and the separator icon only on the client side.
     * Useful when the breadcrumb is displayed based on the client-side data, e.g. browser history.
     */
    clientOnly?: boolean;
}

export interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbData[];
}

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
    return (
        <div className={styles.breadcrumbs} data-oid="ysf_ffh">
            {breadcrumbs.map((breadcrumb, index, arr) => {
                const content = (
                    <React.Fragment key={breadcrumb.to}>
                        <Link to={breadcrumb.to} data-oid="svyxo62">
                            {breadcrumb.title}
                        </Link>
                        {index !== arr.length - 1 && (
                            <ChevronRightIcon className={styles.separatorIcon} data-oid=":wgr3ih" />
                        )}
                    </React.Fragment>
                );

                if (breadcrumb.clientOnly) {
                    return (
                        <ClientOnly key={breadcrumb.to} data-oid="k2eolhr">
                            {() => content}
                        </ClientOnly>
                    );
                }

                return content;
            })}
        </div>
    );
};
