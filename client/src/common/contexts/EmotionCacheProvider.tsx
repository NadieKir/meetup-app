import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export const EmotionCacheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = React.useMemo(
    () =>
      createCache({
        key: 'with-tailwind',
        insertionPoint: document.querySelector('title')!,
      }),
    [],
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
