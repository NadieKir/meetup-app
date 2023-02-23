import { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './IconButton.module.scss';

export const IconButton = ({
  children,
  className,
  ...nativeButtonProps
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>): JSX.Element => (
  <button
    className={classNames(styles.button, className)}
    {...nativeButtonProps}
  >
    {children}
  </button>
);
