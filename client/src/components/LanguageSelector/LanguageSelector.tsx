import React, { useContext } from 'react';

import { LocalizationContext } from 'common/contexts';
import { Locale } from 'i18n';
import { LANGUAGES } from 'common/constants';

import styles from './LanguageSelector.module.scss';

export const LanguageSelector = () => {
  const localeStore = useContext(LocalizationContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localeStore.updateLocale(e.target.value as Locale);
  };

  return (
    <select
      className={styles.select}
      value={localeStore.locale}
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
