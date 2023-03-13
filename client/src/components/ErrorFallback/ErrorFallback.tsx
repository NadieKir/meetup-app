import { FormattedMessage } from 'react-intl';

import {
  Typography,
  TypographyComponent,
  Button,
  ButtonVariant,
} from 'components';

import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => (
  <div className={styles.wrapper} role="alert">
    <Typography
      component={TypographyComponent.Heading1}
      className={styles.heading}
    >
      <FormattedMessage id="somethingIsWrong" />
    </Typography>
    <Typography className={styles.message}>{error.message}</Typography>
    <Button variant={ButtonVariant.Primary} onClick={resetErrorBoundary}>
      <FormattedMessage id="tryAgainButton" />
    </Button>
  </div>
);
