import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Button,
  ButtonVariant,
  TextField,
  Typography,
  TypographyComponent,
} from 'components';
import { login } from 'api';
import { Credentials } from 'model';
import { AppContext, AppContextType } from 'common/contexts';

import styles from './LoginPage.module.scss';
import logo from 'assets/images/logo.svg';

export const LoginPage = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  const { setUser } = useContext(AppContext) as AppContextType;

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
          setUser(user);
          navigate('/');
        },
        (error) => {
          if (error.response.data === 'Unauthorized')
            alert(intl.formatMessage({ id: 'noUserError' }));
        },
      )
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleGuestLogin = () => {
    setUser(null);
    navigate('/');
  };

  return (
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
                <TextField
                  name="password"
                  labelText={intl.formatMessage({ id: 'passwordLabel' })}
                  multiline={false}
                />
                <div className={styles.formActions}>
                  <Button
                    type="submit"
                    variant={ButtonVariant.Primary}
                    disabled={!props.isValid || !props.dirty}
                  >
                    <FormattedMessage id="signInButton" />
                  </Button>
                  <Button
                    variant={ButtonVariant.Default}
                    onClick={handleGuestLogin}
                  >
                    <FormattedMessage id="signInAsGuestButton" />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};