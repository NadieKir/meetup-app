import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer } from 'mobx-react-lite';

import {
  Button,
  ButtonVariant,
  ErrorFallback,
  PasswordField,
  TextField,
  Typography,
  TypographyComponent,
} from 'components';
import { login } from 'api';
import { Credentials } from 'common/model';
import { UserContext } from 'common/contexts';
import { usePushNotification } from 'common/hooks';

import styles from './LoginPage.module.scss';
import logo from 'assets/images/logo.svg';

export const LoginPage = observer(() => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { pushError } = usePushNotification();

  const userStore = useContext(UserContext);

  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, intl.formatMessage({ id: 'usernameMinError' }))
      .max(30, intl.formatMessage({ id: 'usernameMaxError' }))
      .matches(
        /^[а-яa-z]+([-\s][а-яa-z]+)*\s*$/i,
        intl.formatMessage({ id: 'usernameMatchError' }),
      )
      .required(intl.formatMessage({ id: 'usernameRequiredError' })),
    password: Yup.string()
      .min(6, intl.formatMessage({ id: 'passwordMinError' }))
      .max(40, intl.formatMessage({ id: 'passwordMaxError' }))
      .required(intl.formatMessage({ id: 'passwordRequiredError' })),
  });

  const handleSubmit = (
    values: Credentials,
    actions: FormikHelpers<Credentials>,
  ) => {
    login(values)
      .then(
        (user) => {
          userStore.setUser(user);
          localStorage.setItem('user', user.id);
          navigate('/');
        },
        (error) => {
          if (error.response.data === 'Unauthorized')
            pushError(
              intl.formatMessage({ id: 'noUserErrorHeading' }),
              intl.formatMessage({ id: 'noUserErrorDescription' }),
            );
        },
      )
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleGuestLogin = () => {
    userStore.setUser(null);
    navigate('/');
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className={styles.loginSection}>
        <div className={styles.container}>
          <img
            className={styles.logo}
            src={logo}
            alt={intl.formatMessage({ id: 'logoAlt' })}
          />
          <div className={styles.formWrapper}>
            <Typography
              className={styles.heading}
              component={TypographyComponent.Heading1}
            >
              <FormattedMessage id="login" />
            </Typography>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={signInSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form className={styles.form}>
                  <TextField
                    name="username"
                    labelText={intl.formatMessage({ id: 'usernameLabel' })}
                    multiline={false}
                  />
                  <PasswordField
                    name="password"
                    labelText={intl.formatMessage({ id: 'passwordLabel' })}
                  />
                  <div className={styles.formActions}>
                    <Button
                      type="button"
                      variant={ButtonVariant.Default}
                      onClick={handleGuestLogin}
                    >
                      <FormattedMessage id="signInAsGuestButton" />
                    </Button>
                    <Button
                      type="submit"
                      variant={ButtonVariant.Primary}
                      disabled={!props.isValid || !props.dirty}
                    >
                      <FormattedMessage id="signInButton" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
});
