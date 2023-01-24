import { createContext, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import newsStore, { NewsStore } from 'store/news';

export const NewsContext = createContext<NewsStore>(newsStore);

export const NewsProvider = observer(({ children }: PropsWithChildren) => {
  return (
    <NewsContext.Provider value={newsStore}>{children}</NewsContext.Provider>
  );
});
