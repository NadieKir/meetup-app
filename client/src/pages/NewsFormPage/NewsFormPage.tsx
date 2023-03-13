import { FormattedMessage } from 'react-intl';

import { Typography, TypographyComponent } from 'components';
import { CreateNewsForm, EditNewsForm } from 'forms';

import styles from './NewsFormPage.module.scss';

interface NewsFormPageProps {
  isEdit?: boolean;
}

export const NewsFormPage = ({ isEdit = false }: NewsFormPageProps) => {
  return (
    <section className={styles.container}>
      <Typography
        className={styles.heading}
        component={TypographyComponent.Heading1}
      >
        {isEdit ? (
          <FormattedMessage id="editNews" />
        ) : (
          <FormattedMessage id="createNews" />
        )}
      </Typography>
      {isEdit ? <EditNewsForm /> : <CreateNewsForm />}
    </section>
  );
};
