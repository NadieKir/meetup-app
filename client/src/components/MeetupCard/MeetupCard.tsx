import { useContext } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { FormattedDate, FormattedTime, useIntl } from 'react-intl';

import {
  EditButton,
  Typography,
  TypographyComponent,
  UserPreview,
  UserPreviewVariant,
  VotesCount,
} from 'components';
import { Meetup, MeetupStatus, UserRole } from 'model';
import { FORMATTED_WEEKDAYS_RU } from 'common/constants/constants';
import { Locale } from 'i18n';
import { LocalizationContext, UserContext } from 'common/contexts';

import styles from './MeetupCard.module.scss';

interface MeetupCardProps {
  meetup: Meetup;
}

export enum MeetupCardVariant {
  Topic = 'topic',
  OnModeration = 'onModeration',
  Upcoming = 'upcoming',
  Finished = 'finished',
}

export const MeetupCard = ({ meetup }: MeetupCardProps): JSX.Element => {
  const {
    status,
    author,
    start,
    place,
    subject,
    excerpt,
    goCount,
    isOver,
    id,
  } = meetup;

  const localeStore = useContext(LocalizationContext);
  const userStore = useContext(UserContext);
  const navigate = useNavigate();
  const intl = useIntl();

  const getVariant = (): MeetupCardVariant => {
    switch (status) {
      case MeetupStatus.DRAFT:
      default:
        return MeetupCardVariant.Topic;
      case MeetupStatus.REQUEST:
        return MeetupCardVariant.OnModeration;
      case MeetupStatus.CONFIRMED:
        return isOver ? MeetupCardVariant.Finished : MeetupCardVariant.Upcoming;
    }
  };

  const variant = getVariant();

  const getFormattedWeekday = (): string => {
    switch (localeStore.locale) {
      case Locale.RUSSIAN:
        const weekday = intl.formatDate(start, {
          weekday: 'short',
        }) as keyof typeof FORMATTED_WEEKDAYS_RU;

        return FORMATTED_WEEKDAYS_RU[weekday];
      case Locale.ENGLISH:
        return intl.formatDate(start, {
          weekday: 'short',
        });
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`/meetups/${id}/edit`);
  };

  return (
    <article className={classNames(styles.card, styles[variant])}>
      <header className={styles.header}>
        {status === MeetupStatus.DRAFT ? (
          <UserPreview user={author} variant={UserPreviewVariant.Card} />
        ) : (
          <ul className={styles.appointment}>
            {start !== undefined ? (
              <>
                <li className={styles.appointmentItem} key="date">
                  <Typography className={styles.date}>
                    {getFormattedWeekday()},{' '}
                    <FormattedDate value={start} day="numeric" month="long" />
                  </Typography>
                </li>
                <li className={styles.appointmentItem} key="time">
                  <Typography className={styles.time}>
                    <FormattedTime value={start} />
                  </Typography>
                </li>
              </>
            ) : (
              '—'
            )}
            {place !== undefined && (
              <li className={styles.appointmentItem} key="location">
                <Typography className={styles.location}>{place}</Typography>
              </li>
            )}
          </ul>
        )}
        {status !== MeetupStatus.DRAFT &&
          userStore.user?.roles === UserRole.CHIEF && (
            <EditButton onClick={handleEdit} />
          )}
      </header>

      <div className={styles.body}>
        <Typography
          component={TypographyComponent.Heading2}
          className={styles.subject}
        >
          {subject}
        </Typography>
        {excerpt !== undefined && (
          <Typography
            component={TypographyComponent.Paragraph}
            className={styles.excerpt}
          >
            {excerpt}
          </Typography>
        )}
      </div>

      <footer className={styles.footer}>
        {status === MeetupStatus.DRAFT ? (
          goCount > 0 && <VotesCount votesCount={goCount} />
        ) : (
          <UserPreview user={author} variant={UserPreviewVariant.Card} />
        )}
      </footer>
    </article>
  );
};
