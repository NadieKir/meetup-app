import { FormattedMessage } from 'react-intl';

import { UserPreview, UserPreviewVariant } from 'components';
import { ConfirmedMeetup } from 'common/model';

import styles from './SpeakersCount.module.scss';

interface SpeakersCountProps {
  meetup: ConfirmedMeetup;
}

export const SpeakersCount = ({ meetup }: SpeakersCountProps) => {
  return (
    <div className={styles.speakers}>
      <UserPreview
        user={meetup.speakers[0]}
        variant={UserPreviewVariant.Card}
      />
      {meetup.speakers.length > 1 && (
        <span className={styles.restSpeakers}>
          <FormattedMessage
            id="restSpeakers"
            values={{ restSpeakers: meetup.speakers.length - 1 }}
          />
        </span>
      )}
    </div>
  );
};
