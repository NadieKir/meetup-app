import { makeAutoObservable } from 'mobx';
import { Locale } from 'i18n';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import en from 'date-fns/locale/en-US';

const getInitialLocale = () => {
  const allAppLocales = Object.values(Locale);
  const savedLocale = localStorage.getItem('locale') as Locale;
  const browserLocale = navigator.language as Locale;
  const isBrowserLocaleExist = allAppLocales.includes(browserLocale);

  return (
    savedLocale || (isBrowserLocaleExist && browserLocale) || Locale.RUSSIAN
  );
};

const htmlElement = window.document.documentElement;

export class LocaleStore {
  locale: Locale = getInitialLocale();

  constructor() {
    makeAutoObservable(this);

    htmlElement.lang = this.locale;

    registerLocale(Locale.RUSSIAN, ru);
    registerLocale(Locale.ENGLISH, en);
  }

  updateLocale(newLocale: Locale) {
    this.locale = newLocale;
    localStorage.setItem('locale', newLocale);

    htmlElement.lang = newLocale;
  }
}

export const localeStore = new LocaleStore();
