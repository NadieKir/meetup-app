import React, { useContext } from 'react';

import { AppContext, AppContextType } from 'common/contexts';
import { Locale } from 'i18n';
import { LANGUAGES } from 'common/constants/constants';

import styles from './LanguageSelector.module.scss';

export const LanguageSelector = () => {
  const { currentLocale, setCurrentLocale } = useContext(
    AppContext,
  ) as AppContextType;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value as Locale;

    setCurrentLocale(locale);
    localStorage.setItem('locale', locale);
  };

  return (
    <select
      className={styles.select}
      value={currentLocale}
      onChange={(e) => handleChange(e)}
    >
      {LANGUAGES.map((language) => (
        <option
          className={styles.option}
          key={language.code}
          value={language.code}
        >
          {language.name}
        </option>
      ))}
    </select>
  );
};
