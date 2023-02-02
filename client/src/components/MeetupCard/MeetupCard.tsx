import { useContext } from 'react';
import { FormattedDate, FormattedTime, useIntl } from 'react-intl';

import {
  Typography,
  TypographyComponent,
  UserPreview,
  UserPreviewVariant,
  VotesCount,
} from 'components';
import {
  ConfirmedMeetup,
  isConfirmedMeetup,
  isTopic,
  TopicWithVotedUsers,
} from 'model';
import { Locale } from 'i18n';
import { FORMATTED_WEEKDAYS_RU } from 'common/constants';
import { LocalizationContext } from 'common/contexts';

import styles from './MeetupCard.module.scss';

interface MeetupCardProps {
  meetup: TopicWithVotedUsers | ConfirmedMeetup;
}

export const MeetupCard = ({ meetup }: MeetupCardProps) => {
  const { locale } = useContext(LocalizationContext);
  const intl = useIntl();

  const getFormattedWeekday = (date: string): string => {
    switch (locale) {
      case Locale.RUSSIAN:
        const weekday = intl.formatDate(date, {
          weekday: 'short',
        }) as keyof typeof FORMATTED_WEEKDAYS_RU;

        return FORMATTED_WEEKDAYS_RU[weekday];
      case Locale.ENGLISH:
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
            {isConfirmedMeetup(meetup) ? (
              <>
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
              </>
            ) : (
              '—'
            )}
            <li className={styles.appointmentItem} key="location">
              <Typography className={styles.location}>
                {meetup.place}
              </Typography>
            </li>
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
          {meetup.excerpt}
        </Typography>
      </div>

      <footer className={styles.footer}>
        {isTopic(meetup) ? (
          meetup.votedUsers.length > 0 && (
            <VotesCount votesCount={meetup.votedUsers.length} />
          )
        ) : (
          <UserPreview user={meetup.author} variant={UserPreviewVariant.Card} />
        )}
      </footer>
    </article>
  );
};
