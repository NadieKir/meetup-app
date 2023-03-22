import { FormattedDate, FormattedTime, useIntl } from 'react-intl';

import { SpeakersCount } from 'components/SpeakersCount';
import { VotesCount } from 'components/VotesCount';
import { UserPreview, UserPreviewVariant } from 'components/UserPreview';
import { Typography, TypographyComponent } from 'components/Typography';
import { ConfirmedMeetup } from 'common/model';
import { FORMATTED_WEEKDAYS_RU } from 'common/constants';
import { isTopic, removeHTMLTags } from 'common/helpers';
import { TopicWithVotedUsers } from 'common/types';
import { Locale } from 'i18n';

import styles from './MeetupCard.module.scss';

interface MeetupCardProps {
  meetup: TopicWithVotedUsers | ConfirmedMeetup;
}

export const MeetupCard = ({ meetup }: MeetupCardProps) => {
  const intl = useIntl();

  const getFormattedWeekday = (date: string) => {
    switch (intl.locale) {
      case Locale.RUSSIAN:
        const weekday = intl.formatDate(date, {
          weekday: 'short',
        }) as keyof typeof FORMATTED_WEEKDAYS_RU;

        return FORMATTED_WEEKDAYS_RU[weekday];
      case Locale.ENGLISH:
      default:
        return intl.formatDate(date, {
          weekday: 'short',
        });
    }
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        {isTopic(meetup) ? (
          <UserPreview user={meetup.author} variant={UserPreviewVariant.Card} />
        ) : (
          <ul className={styles.appointment}>
            <li className={styles.appointmentItem} key="date">
              <Typography className={styles.date}>
                {getFormattedWeekday(meetup.start)},{' '}
                <FormattedDate
                  value={meetup.start}
                  day="numeric"
                  month="long"
                />
              </Typography>
            </li>
            <li className={styles.appointmentItem} key="time">
              <Typography className={styles.time}>
                <FormattedTime value={meetup.start} />
              </Typography>
            </li>
            {meetup.place && (
              <li className={styles.appointmentItem} key="location">
                <Typography className={styles.location}>
                  {meetup.place}
                </Typography>
              </li>
            )}
          </ul>
        )}
      </header>

      <div className={styles.body}>
        <Typography
          component={TypographyComponent.Heading2}
          className={styles.subject}
        >
          {meetup.subject}
        </Typography>

        <Typography
          component={TypographyComponent.Paragraph}
          className={styles.excerpt}
        >
          {removeHTMLTags(meetup.excerpt)}
        </Typography>
      </div>

      <footer className={styles.footer}>
        {isTopic(meetup) ? (
          <VotesCount votesCount={meetup.votedUsers.length} />
        ) : (
          <SpeakersCount speakers={meetup.speakers} />
        )}
      </footer>
    </article>
  );
};
