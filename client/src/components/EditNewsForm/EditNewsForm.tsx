import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  ButtonVariant,
  ImagePreviewMode,
  ImageUploader,
  TextField,
  Form,
} from 'components';
import { NewNews } from 'model';
import { converStringToFileWithUrl, readFileAsBase64 } from 'common/helpers';
import { NewsStore } from 'store/news';

export const EditNewsForm = observer(() => {
  const { id } = useParams();
  const intl = useIntl();
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

  const createNewsSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, intl.formatMessage({ id: 'titleMinError' }))
      .max(100, intl.formatMessage({ id: 'titleMaxError' }))
      .required(intl.formatMessage({ id: 'titleRequiredError' })),
    content: Yup.string().required(
      intl.formatMessage({ id: 'contentRequiredError' }),
    ),
  });

  const renderFields = () => {
    return (
      <>
        <ImageUploader
          name="image"
          variant={ImagePreviewMode.Large}
          labelText={intl.formatMessage({ id: 'imageLabel' })}
        />
        <TextField
          name="title"
          labelText={intl.formatMessage({ id: 'titleLabel' })}
          multiline={false}
        />
        <TextField
          name="content"
          labelText={intl.formatMessage({ id: 'contentLabel' })}
          multiline={true}
          maxLetterCount={1000}
        />
      </>
    );
  };

  const renderButton = (props: FormikProps<NewNews>) => (
    <Button
      type="submit"
      variant={ButtonVariant.Primary}
      disabled={!props.isValid}
    >
      <FormattedMessage id="saveButton" />
    </Button>
  );

  return (
    <Form
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      validateSchema={createNewsSchema}
      fields={renderFields}
      submitButton={renderButton}
    />
  );
});
