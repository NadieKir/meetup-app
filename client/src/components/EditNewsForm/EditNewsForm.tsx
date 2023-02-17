import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { NewsForm } from 'components';
import { NewsFormData } from 'model';
import { NewsStore } from 'store/news';

export const EditNewsForm = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { newsArticle, isLoading, error, updateNews } = useLocalObservable(
    () => new NewsStore(id!),
  );

  if (isLoading) return <FormattedMessage id="loading" />;
  if (!newsArticle) throw error;

  const initialValues = {
    title: newsArticle.title,
    content: newsArticle.content,
    image: newsArticle.image,
  };

  const handleSubmit = async (
    values: NewsFormData,
    actions: FormikHelpers<NewsFormData>,
  ) => {
    await updateNews(id!, values);

    actions.setSubmitting(false);
    navigate(-1);
  };

  return (
    <NewsForm
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      touchedNotRequired
    />
  );
});
