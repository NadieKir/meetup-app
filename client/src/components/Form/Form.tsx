import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';
import {
  Form as FormikForm,
  Formik,
  FormikHelpers,
  FormikProps,
  FormikValues,
} from 'formik';
import * as Yup from 'yup';

import { Button, ButtonVariant } from 'components';

import styles from './Form.module.scss';

interface FormProps<T extends FormikValues> {
  initialValues: T;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => Promise<void>;
  validateSchema: Yup.AnySchema;
  fields: () => JSX.Element;
  submitButton: (props: FormikProps<T>) => JSX.Element;
}

export function Form<T extends FormikValues>({
  handleSubmit,
  initialValues,
  validateSchema,
  fields,
  submitButton,
}: FormProps<T>) {
  const navigate = useNavigate();

  const handleReset = (nativeHandleResetFn: () => void) => {
    nativeHandleResetFn();
    navigate(-1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(props) => (
        <FormikForm className={styles.form}>
          <div className={styles.formInputs}>{fields()}</div>
          <div className={styles.formActions}>
            <Button
              type="button"
              variant={ButtonVariant.Default}
              onClick={() => handleReset(props.handleReset)}
            >
              <FormattedMessage id="goBackButton" />
            </Button>

            {submitButton(props)}
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}
