import { useNavigate, useParams } from 'react-router';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
  UserPreview,
  UserPreviewVariant,
} from 'components';
import { MeetupStatus, ShortUser } from 'model';
import { capitalizeFirstLetter } from 'common/helpers';
import { useMeetupQuery } from 'common/hooks';
import { NotFoundPage } from 'pages';

import styles from './ViewMeetupPage.module.scss';
import defaultImage from 'assets/images/default-image.jpg';
import calendar from './assets/calendar.svg';
import clock from './assets/clock.svg';
import pin from './assets/pin.svg';

const MAX_PREVIEW_USERS = 8;

export const ViewMeetupPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { id } = useParams();
  const { meetup, isLoading } = useMeetupQuery(id!);

  const votedUsers = meetup?.votedUsers ?? [];

  if (isLoading || meetup === undefined) {
    return <div>Загрузка...</div>;
  }

  if (meetup === null) {
    return <NotFoundPage />;
  }

  const renderHeader = () => {
    if (meetup.status === MeetupStatus.DRAFT) {
      return (
        <div className={styles.data}>
          <Typography
            component={TypographyComponent.Span}
            className={styles.dataName}
          >
            <FormattedMessage id="name" />
          </Typography>
          <div className={styles.dataContent}>
            <Typography
              className={styles.meetupHeading}
              component={TypographyComponent.Heading2}
            >
              {meetup.subject}
            </Typography>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.headerData}>
        <img
          className={styles.image}
          src={defaultImage}
          alt={intl.formatMessage({ id: 'meetupPhotoAlt' })}
        />
        <div className={styles.headerDataContent}>
          <Typography
            className={styles.meetupHeading}
            component={TypographyComponent.Heading2}
          >
            {meetup.subject}
          </Typography>
        </div>
      </div>
    );
  };

  const renderTimePlace = () => {
    if (meetup.status === MeetupStatus.DRAFT) {
      return null;
    }

    let date, time;

    if (meetup.start) {
      const capitalizedWeekday = capitalizeFirstLetter(
        intl.formatDate(meetup.start, {
          weekday: 'long',
        }),
      );

      date = `${capitalizedWeekday}, ${intl.formatDate(meetup.start, {
        day: 'numeric',
        month: 'long',
      })}`;
      time = intl.formatTime(meetup.start);

      if (meetup.finish)
        time = time.concat(` — ${intl.formatTime(meetup.finish)}`);
    }

    return (
      <div className={styles.data}>
        <Typography
          component={TypographyComponent.Span}
          className={styles.dataName}
        >
          <FormattedMessage id="timeAndLocation" />
        </Typography>
        <div className={styles.dataContent}>
          <div className={styles.timePlaceInfo}>
            <div className={styles.info}>
              <img
                className={styles.image}
                src={calendar}
                alt={intl.formatMessage({ id: 'dateAlt' })}
              />
              <Typography component={TypographyComponent.Span}>
                {date || '—'}
              </Typography>
            </div>
            <div className={styles.info}>
              <img
                className={styles.image}
                src={clock}
                alt={intl.formatMessage({ id: 'timeAlt' })}
              />
              <Typography component={TypographyComponent.Span}>
                {time || '—'}
              </Typography>
            </div>
            <div className={styles.info}>
              <img
                className={styles.image}
                src={pin}
                alt={intl.formatMessage({ id: 'locationAlt' })}
              />
              <Typography component={TypographyComponent.Span}>
                {meetup.place || '—'}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAuthor = () => (
    <div className={styles.data}>
      <Typography
        component={TypographyComponent.Span}
        className={styles.dataName}
      >
        {meetup.status === MeetupStatus.DRAFT ? (
          <FormattedMessage id="author" />
        ) : (
          <FormattedMessage id="speaker" />
        )}
      </Typography>
      <div className={styles.dataContent}>
        {meetup.status === MeetupStatus.DRAFT ? (
          <UserPreview user={meetup.author} />
        ) : (
          <div className={styles.speakerWrapper}>
            {meetup.speakers.map((speaker) => (
              <UserPreview key={speaker.id} user={speaker} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderVotedUsers = () => {
    if (votedUsers?.length === 0) {
      return null;
    }

    const previewVotedUsers = votedUsers.slice(0, MAX_PREVIEW_USERS);

    return (
      <div className={styles.data}>
        <Typography
          component={TypographyComponent.Span}
          className={styles.dataName}
        >
          <FormattedMessage id="support" />
        </Typography>
        <div className={classNames(styles.dataContent, styles.votedUsers)}>
          {previewVotedUsers.map((user: ShortUser) => (
            <UserPreview
              key={user.id}
              variant={UserPreviewVariant.Image}
              user={user}
            />
          ))}
          {votedUsers.length - MAX_PREVIEW_USERS > 0 && (
            <div className={styles.restCounter}>
              +{votedUsers.length - MAX_PREVIEW_USERS}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div className={classNames(styles.dataContent, styles.actions)}>
        <Button variant={ButtonVariant.Default} onClick={() => navigate(-1)}>
          <FormattedMessage id="goBackButton" />
        </Button>
        {meetup.status === MeetupStatus.DRAFT && (
          <div className={styles.actionsWrapper}>
            <Button variant={ButtonVariant.Secondary}>
              <FormattedMessage id="deleteButton" />
            </Button>
            <Button variant={ButtonVariant.Primary}>
              <FormattedMessage id="approveTopicButton" />
            </Button>
          </div>
        )}
        {meetup.status === MeetupStatus.REQUEST && (
          <div className={styles.actionsWrapper}>
            <Button variant={ButtonVariant.Secondary}>
              <FormattedMessage id="deleteButton" />
            </Button>
            <Button variant={ButtonVariant.Primary}>
              <FormattedMessage id="publishButton" />
            </Button>
          </div>
        )}
        {meetup.status === MeetupStatus.CONFIRMED && (
          <Button variant={ButtonVariant.Secondary}>
            <FormattedMessage id="deleteButton" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <section className={styles.container}>
      <Typography
        className={styles.heading}
        component={TypographyComponent.Heading1}
      >
        {meetup.status === MeetupStatus.DRAFT ? (
          <FormattedMessage id="topicView" />
        ) : (
          <FormattedMessage id="meetupView" />
        )}
      </Typography>
      <div className={styles.dataWrapper}>
        {renderHeader()}
        {renderTimePlace()}
        {renderAuthor()}
        <div className={styles.data}>
          <Typography
            component={TypographyComponent.Span}
            className={styles.dataName}
          >
            <FormattedMessage id="description" />
          </Typography>
          <div className={styles.dataContent}>
            <Typography
              component={TypographyComponent.Paragraph}
              className={styles.excerpt}
            >
              {meetup.excerpt}
            </Typography>
          </div>
        </div>
        {renderVotedUsers()}
        {renderActions()}
      </div>
    </section>
  );
};
