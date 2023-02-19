import { useIntl } from 'react-intl';

import styles from './ForbiddenPage.module.scss';

export const ForbiddenPage = () => {
  const intl = useIntl();

  return (
    <div className={styles.wrapper}>
      <div className={styles.numbers}>403</div>
      <div className={styles.description}>
        {intl.formatMessage({ id: 'forbidden' })}{' '}
        <span className={styles.blink}>_</span>
      </div>
    </div>
  );
};
