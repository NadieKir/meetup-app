import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { NewsForm } from 'forms';
import { NewsStore } from 'stores/NewsStore';
import { NewsFormData } from 'common/model';
import { usePushNotification } from 'common/hooks';

export const EditNewsForm = observer(() => {
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushSuccess } = usePushNotification();

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
    pushSuccess(intl.formatMessage({ id: 'changesSaved' }));
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
