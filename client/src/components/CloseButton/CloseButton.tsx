import { ComponentPropsWithoutRef } from 'react';
import { useIntl } from 'react-intl';

import { IconButton } from 'components/IconButton';

import closeIcon from './close.svg';

export const CloseButton = (
  props: Omit<ComponentPropsWithoutRef<typeof IconButton>, 'children'>,
): JSX.Element => {
  const intl = useIntl();

  return (
    <IconButton {...props}>
      <img src={closeIcon} alt={intl.formatMessage({ id: 'closeAlt' })} />
    </IconButton>
  );
};
