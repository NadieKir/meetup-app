import { PropsWithChildren, useState } from 'react';
import classNames from 'classnames';

import { Typography, TypographyComponent } from 'components/Typography';

import styles from './Tooltip.module.scss';

export enum TooltipVariant {
  Dark = 'dark',
  Colored = 'colored',
  Outline = 'outline',
  White = 'white',
}

interface TooltipProps {
  variant?: TooltipVariant;
  title?: string;
  description?: string;
  element?: JSX.Element;
}

export const Tooltip = ({
  children,
  variant = TooltipVariant.Dark,
  title,
  description,
  element,
}: PropsWithChildren<TooltipProps>) => {
  const [visible, setVisible] = useState<boolean>(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <div
        className={classNames(styles.tooltipPad, {
          [styles.visible]: visible,
        })}
        data-testid="tooltip"
      >
        <div className={classNames(styles.tooltip, styles[variant])}>
          {title && (
            <Typography
              component={TypographyComponent.Heading3}
              className={styles.title}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              component={TypographyComponent.Paragraph}
              className={styles.description}
            >
              {description}
            </Typography>
          )}
          {element}
        </div>
      </div>
    </div>
  );
};
