import classNames from 'classnames';

import { Typography } from 'components/Typography';
import { getInitials } from 'common/helpers';
import { ShortUser } from 'common/model';

import styles from './UserPreview.module.scss';

export enum UserPreviewVariant {
  Default = 'default',
  Card = 'card',
  Header = 'header',
  Image = 'image',
}

interface UserPreviewProps {
  user: ShortUser;
  variant?: UserPreviewVariant;
}

export const UserPreview = ({
  user,
  variant = UserPreviewVariant.Default,
}: UserPreviewProps): JSX.Element => {
  const { name, surname } = user;

  const userInitials = getInitials(name, surname);

  return (
    <div
      className={classNames(styles.user, styles[variant])}
      title={
        variant === UserPreviewVariant.Image ? `${name} ${surname}` : undefined
      }
    >
      <div className={styles.avatar}>
        <Typography className={styles.initials}>{userInitials}</Typography>
      </div>
      {variant !== UserPreviewVariant.Image && (
        <Typography className={styles.name}>{`${name} ${surname}`}</Typography>
      )}
    </div>
  );
};
