import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Locale } from 'i18n';

import { checkLogin } from 'api';
import { AuthoraizedUser } from 'model';

export const AppContext = createContext<AppContextType | null>(null);

export type AppContextType = {
  user: AuthoraizedUser | null;
  setUser: Dispatch<SetStateAction<AuthoraizedUser | null>>;
  currentLocale: Locale;
  setCurrentLocale: Dispatch<SetStateAction<Locale>>;
};

const getInitialLocale = () => {
  const allAppLocales = Object.values(Locale);
  const savedLocale = localStorage.getItem('locale') as Locale;
  const browserLocale = navigator.language as Locale;
  const isBrowserLocaleExist = allAppLocales.includes(browserLocale);

  return (
    savedLocale || (isBrowserLocaleExist && browserLocale) || Locale.RUSSIAN
  );
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthoraizedUser | null>(null);
  const [currentLocale, setCurrentLocale] = useState<Locale>(
    getInitialLocale(),
  );

  useEffect(() => {
    checkLogin().then(
      (user) => {
        setUser(user);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentLocale,
        setCurrentLocale,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
