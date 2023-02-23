import { IntlProvider } from 'react-intl';

import { NotificationsProvider } from 'common/contexts';
import { Locale, messages } from 'common/i18n';
import localeStore from 'store/LocaleStore';

import '../src/style/index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
    ],
  },
};

export const decorators = [
  (Story) => (
    <IntlProvider
    messages={messages[localeStore.locale]}
    locale={localeStore.locale}
    defaultLocale={Locale.RUSSIAN}
    >
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    </IntlProvider>
  ),
];
