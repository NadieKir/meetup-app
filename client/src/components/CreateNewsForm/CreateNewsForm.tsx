import { useNavigate } from 'react-router';
import { FormikHelpers } from 'formik';

import { NewsForm } from 'components';
import { NewsFormData } from 'common/model';
import { createNewsArticle } from 'api';

export const CreateNewsForm = () => {
  const navigate = useNavigate();

  const initialValues: NewsFormData = { title: '', content: '', image: null };

  const handleSubmit = async (
    values: NewsFormData,
    actions: FormikHelpers<NewsFormData>,
  ) => {
    await createNewsArticle(values);

    actions.setSubmitting(false);
    navigate(-1);
  };

  return <NewsForm initialValues={initialValues} handleSubmit={handleSubmit} />;
};
