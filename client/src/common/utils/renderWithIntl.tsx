import { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { render as rtlRender, RenderOptions } from '@testing-library/react';

import { Locale, messages } from 'i18n';

export const renderWithIntl =
  (locale = Locale.RUSSIAN) =>
  (
    ui: JSX.Element,
    renderOptions?: Partial<Omit<RenderOptions, 'wrapper'>>,
  ) => {
    function Wrapper({ children }: PropsWithChildren) {
      return (
        <IntlProvider locale={locale} messages={messages[locale]}>
          {children}
        </IntlProvider>
      );
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  };
