import { useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/app/root';

export function useRootLoader(): RootLoaderData {
  return useMatches().find((match) => match.id === 'root')!
    .data as RootLoaderData;
}
