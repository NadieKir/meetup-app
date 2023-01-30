import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { NewsForm, Typography, TypographyComponent } from 'components';
import { createNewsArticle } from 'api';
import { NewNews } from 'model';
import { readFileAsBase64 } from 'common/helpers';

import styles from './CreateNewsPage.module.scss';

const initialValues = { title: '', content: '', image: null };

export const CreateNewsPage = observer(() => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: NewNews,
    actions: FormikHelpers<NewNews>,
  ) => {
    if (values.image) {
      const fileAsBase64 = await readFileAsBase64(values.image);
      await createNewsArticle({
        ...values,
        image: fileAsBase64,
      });
    } else {
      await createNewsArticle({ ...values, image: null });
    }

    actions.setSubmitting(false);
    navigate(-1);
  };

  return (
    <section className={styles.container}>
      <Typography
        className={styles.heading}
        component={TypographyComponent.Heading1}
      >
        <FormattedMessage id="createNews" />
      </Typography>
      <NewsForm initialValues={initialValues} handleSubmit={handleSubmit} />
    </section>
  );
});
