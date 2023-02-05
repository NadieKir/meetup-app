import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  ButtonVariant,
  ImagePreviewMode,
  ImageUploader,
  TextField,
} from 'components';
import { NewNews } from 'model';

import styles from './NewsForm.module.scss';

interface NewsFormProps {
  initialValues: NewNews;
  handleSubmit: (
    values: NewNews,
    actions: FormikHelpers<NewNews>,
  ) => Promise<void>;
  isEdit?: boolean;
}

export const NewsForm = observer(
  ({ handleSubmit, initialValues, isEdit = false }: NewsFormProps) => {
    const intl = useIntl();
    const navigate = useNavigate();

    const createNewsSchema = Yup.object().shape({
      title: Yup.string()
        .min(3, intl.formatMessage({ id: 'titleMinError' }))
        .max(100, intl.formatMessage({ id: 'titleMaxError' }))
        .required(intl.formatMessage({ id: 'titleRequiredError' })),
      content: Yup.string().required(
        intl.formatMessage({ id: 'contentRequiredError' }),
      ),
    });

    const handleReset = (nativeHandleResetFn: () => void) => {
      nativeHandleResetFn();
      navigate(-1);
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={createNewsSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(props) => (
          <Form className={styles.form}>
            <div className={styles.formInputs}>
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
            </div>

            <div className={styles.formActions}>
              <Button
                type="button"
                variant={ButtonVariant.Default}
                onClick={() => handleReset(props.handleReset)}
              >
                <FormattedMessage id="goBackButton" />
              </Button>

              {isEdit ? (
                <Button
                  type="submit"
                  variant={ButtonVariant.Primary}
                  disabled={!props.isValid}
                >
                  <FormattedMessage id="saveButton" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant={ButtonVariant.Primary}
                  disabled={
                    !props.isValid ||
                    (!props.touched.title && !props.touched.content)
                  }
                >
                  <FormattedMessage id="createButton" />
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    );
  },
);
