import { createContext, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { observer } from 'mobx-react-lite';

import { Locale, messages } from 'i18n';
import localeStore, { LocaleStore } from 'store/locale';

export const LocalizationContext = createContext<LocaleStore>(localeStore);

export const LocalizationProvider = observer(
  ({ children }: PropsWithChildren) => {
    return (
      <LocalizationContext.Provider value={localeStore}>
        <IntlProvider
          messages={messages[localeStore.locale]}
          locale={localeStore.locale}
          defaultLocale={Locale.RUSSIAN}
        >
          {children}
        </IntlProvider>
      </LocalizationContext.Provider>
    );
  },
);
