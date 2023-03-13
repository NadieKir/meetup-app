import { FormattedMessage } from 'react-intl';

import { UserPreview, UserPreviewVariant } from 'components/UserPreview';
import { ShortUser } from 'common/model';

import styles from './SpeakersCount.module.scss';

interface SpeakersCountProps {
  speakers: ShortUser[];
}

export const SpeakersCount = ({ speakers }: SpeakersCountProps) => (
  <div className={styles.speakers}>
    <UserPreview user={speakers[0]} variant={UserPreviewVariant.Card} />
    {speakers.length > 1 && (
      <span className={styles.restSpeakers}>
        <FormattedMessage
          id="restSpeakers"
          values={{ restSpeakers: speakers.length - 1 }}
        />
      </span>
    )}
  </div>
);
