import React from 'react';

import { Locale } from 'common/i18n';
import { LANGUAGES } from 'common/constants';
import { localeStore } from 'store';

import styles from './LanguageSelector.module.scss';

export const LanguageSelector = () => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localeStore.updateLocale(e.target.value as Locale);
  };

  return (
    <select
      className={styles.select}
      value={localeStore.locale}
      onChange={handleChange}
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
