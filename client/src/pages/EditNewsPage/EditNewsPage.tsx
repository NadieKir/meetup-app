import { useNavigate, useParams } from 'react-router-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';
import { FormikHelpers } from 'formik';

import { NewsForm, Typography, TypographyComponent } from 'components';
import { converStringToFileWithUrl, readFileAsBase64 } from 'common/helpers';
import { NewsStore } from 'store/news';
import { NewNews } from 'model';

import styles from './EditNewsPage.module.scss';

export const EditNewsPage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { newsArticle, isLoading, error, updateNews } = useLocalObservable(
    () => new NewsStore(id!),
  );

  if (isLoading) return <FormattedMessage id="loading" />;
  if (!newsArticle) throw error;

  const initialValues = {
    title: newsArticle?.title,
    content: newsArticle?.content,
    image: converStringToFileWithUrl(newsArticle?.image),
  };

  const handleSubmit = async (
    values: NewNews,
    actions: FormikHelpers<NewNews>,
  ) => {
    if (values.image) {
      if (values.image.arrayBuffer.length === 0) {
        updateNews(id!, { ...values, image: values.image.url as string });
      } else {
        const fileAsBase64 = await readFileAsBase64(values.image);
        await updateNews(id!, {
          ...values,
          image: fileAsBase64,
        });
      }
    } else {
      await updateNews(id!, { ...values, image: null });
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
        <FormattedMessage id="editNews" />
      </Typography>
      <NewsForm
        isEdit
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      />
    </section>
  );
});
