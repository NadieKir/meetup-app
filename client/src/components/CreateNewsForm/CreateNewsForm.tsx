import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
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
import { readFileAsBase64 } from 'common/helpers';
import { createNewsArticle } from 'api';

export const CreateNewsForm = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const initialValues: NewNews = { title: '', content: '', image: null };

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
          multiline
          maxLetterCount={1000}
        />
      </>
    );
  };

  const renderButton = (props: FormikProps<NewNews>) => (
    <Button
      type="submit"
      variant={ButtonVariant.Primary}
      disabled={
        !props.isValid || (!props.touched.title && !props.touched.content)
      }
    >
      <FormattedMessage id="createButton" />
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
};
