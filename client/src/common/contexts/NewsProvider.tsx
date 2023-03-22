import { createContext, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import newsListStore, { NewsListStore } from 'stores/NewsListStore';

export const NewsListContext = createContext<NewsListStore>(newsListStore);

export const NewsListProvider = observer(({ children }: PropsWithChildren) => {
  return (
    <NewsListContext.Provider value={newsListStore}>
      {children}
    </NewsListContext.Provider>
  );
});
