import { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { observer } from 'mobx-react-lite';

import { Locale, messages } from 'common/i18n';
import { localeStore } from 'store';

export const InternationalizationProvider = observer(
  ({ children }: PropsWithChildren) => {
    return (
      <IntlProvider
        messages={messages[localeStore.locale]}
        locale={localeStore.locale}
        defaultLocale={Locale.RUSSIAN}
      >
        {children}
      </IntlProvider>
    );
  },
);
