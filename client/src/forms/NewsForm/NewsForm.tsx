import { FormattedMessage, useIntl } from 'react-intl';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  ButtonVariant,
  ImagePreviewMode,
  ImageUploader,
  TextField,
  Form,
  RichTextInput,
} from 'components';
import { NewsFormData } from 'common/model';

interface NewsFormProps {
  initialValues: NewsFormData;
  handleSubmit: (
    values: NewsFormData,
    actions: FormikHelpers<NewsFormData>,
  ) => void;
  touchedNotRequired?: boolean;
}

export const NewsForm = ({
  initialValues,
  handleSubmit,
  touchedNotRequired = false,
}: NewsFormProps) => {
  const intl = useIntl();

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
        <RichTextInput
          name="content"
          labelText={intl.formatMessage({ id: 'contentLabel' })}
        />
      </>
    );
  };

  const renderButton = (props: FormikProps<NewsFormData>) => (
    <Button
      type="submit"
      variant={ButtonVariant.Primary}
      disabled={
        touchedNotRequired
          ? !props.isValid
          : !props.isValid || (!props.touched.title && !props.touched.content)
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
