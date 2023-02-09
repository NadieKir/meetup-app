import { FormattedMessage } from 'react-intl';

import { CreateNewsForm, Typography, TypographyComponent } from 'components';

import styles from './CreateNewsPage.module.scss';

export const CreateNewsPage = () => {
  return (
    <section className={styles.container}>
      <Typography
        className={styles.heading}
        component={TypographyComponent.Heading1}
      >
        <FormattedMessage id="createNews" />
      </Typography>
      <CreateNewsForm />
    </section>
  );
};
