import { makeAutoObservable } from 'mobx';
import { Locale } from 'i18n';

const getInitialLocale = () => {
  const allAppLocales = Object.values(Locale);
  const savedLocale = localStorage.getItem('locale') as Locale;
  const browserLocale = navigator.language as Locale;
  const isBrowserLocaleExist = allAppLocales.includes(browserLocale);

  return (
    savedLocale || (isBrowserLocaleExist && browserLocale) || Locale.RUSSIAN
  );
};

export class LocaleStore {
  locale: Locale = getInitialLocale();

  constructor() {
    makeAutoObservable(this);
  }

  updateLocale(newLocale: Locale) {
    this.locale = newLocale;
    localStorage.setItem('locale', newLocale);
  }
}

export default new LocaleStore();
