import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { FormikHelpers } from 'formik';

import { NewsForm } from 'forms';
import { NewsFormData } from 'common/model';
import { usePushNotification } from 'common/hooks';
import { createNewsArticle } from 'api';

export const CreateNewsForm = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { pushSuccess } = usePushNotification();

  const initialValues: NewsFormData = { title: '', content: '', image: null };

  const handleSubmit = async (
    values: NewsFormData,
    actions: FormikHelpers<NewsFormData>,
  ) => {
    await createNewsArticle(values);

    actions.setSubmitting(false);
    pushSuccess(intl.formatMessage({ id: 'newsCreated' }));
    navigate(-1);
  };

  return <NewsForm initialValues={initialValues} handleSubmit={handleSubmit} />;
};
