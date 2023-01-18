import { PropsWithChildren, useContext } from 'react';
import { IntlProvider } from 'react-intl';

import { Locale, messages } from 'i18n';
import { AppContext, AppContextType } from './AppProvider';

export const LocalizationProvider = ({ children }: PropsWithChildren) => {
  const { currentLocale } = useContext(AppContext) as AppContextType;

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={Locale.RUSSIAN}
    >
      {children}
    </IntlProvider>
  );
};
