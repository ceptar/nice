import { createRemixStub } from '@remix-run/testing';
import { PropsWithChildren } from 'react';
import { EcomApiContextProvider } from '~/src/wix/ecom';

export interface ComponentWrapperProps extends PropsWithChildren {
    loaderData?: Record<string, unknown>;
}

export default function ComponentWrapper({ children, loaderData }: ComponentWrapperProps) {
    const RemixStub = createRemixStub([
        {
            Component: () => children,
            ErrorBoundary: () => children,
        },
    ]);

    return (
        <EcomApiContextProvider data-oid="x35qwi8">
            <RemixStub hydrationData={{ loaderData }} data-oid="itz69.c" />
        </EcomApiContextProvider>
    );
}
