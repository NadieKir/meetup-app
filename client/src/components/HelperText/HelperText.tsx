import { PropsWithChildren, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { Typography, TypographyComponent } from 'components/Typography';
import { InputFieldVariant } from 'components/InputField';

import styles from './HelperText.module.scss';

type HelperTextProps = {
  variant: InputFieldVariant;
} & PropsWithChildren &
  HTMLAttributes<HTMLParagraphElement>;

export const HelperText = ({
  variant = InputFieldVariant.Default,
  children,
  ...nativeHtmlProps
}: HelperTextProps): JSX.Element => (
  <Typography
    component={TypographyComponent.Paragraph}
    {...nativeHtmlProps}
    className={classNames(
      nativeHtmlProps.className,
      styles.container,
      styles[variant],
    )}
  >
    {children}
  </Typography>
);
