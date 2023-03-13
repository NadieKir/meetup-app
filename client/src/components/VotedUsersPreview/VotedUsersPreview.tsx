import { UserPreviewVariant, UserPreview } from 'components/UserPreview';
import { useVisibleUsersAmount } from 'common/hooks';
import { ShortUser } from 'common/model';

import styles from './VotedUsersPreview.module.scss';

interface VotedUsersPreviewProps {
  users: ShortUser[];
}

export const VotedUsersPreview = ({ users }: VotedUsersPreviewProps) => {
  const visibleUsersAmount = useVisibleUsersAmount();

  const isCounterNeeded = users.length - visibleUsersAmount > 0;
  const usersToPreview = users.slice(
    0,
    isCounterNeeded ? visibleUsersAmount - 1 : visibleUsersAmount,
  );

  return (
    <div className={styles.wrapper}>
      {usersToPreview.map((user: ShortUser) => (
        <UserPreview
          key={user.id}
          variant={UserPreviewVariant.Image}
          user={user}
        />
      ))}
      {isCounterNeeded && (
        <div className={styles.restCounter} data-testid="counter">
          +{users!.length - visibleUsersAmount}
        </div>
      )}
    </div>
  );
};
