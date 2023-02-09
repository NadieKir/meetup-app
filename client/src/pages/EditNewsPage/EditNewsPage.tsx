import { FormattedMessage } from 'react-intl';

import { Typography, TypographyComponent, EditNewsForm } from 'components';

import styles from './EditNewsPage.module.scss';

export const EditNewsPage = () => {
  return (
    <section className={styles.container}>
      <Typography
        className={styles.heading}
        component={TypographyComponent.Heading1}
      >
        <FormattedMessage id="editNews" />
      </Typography>
      <EditNewsForm />
    </section>
  );
};
