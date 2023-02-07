import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer, useLocalObservable } from 'mobx-react-lite';
import classNames from 'classnames';

import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
  UserPreview,
  UserPreviewVariant,
} from 'components';
import { MeetupStatus, ShortUser, isTopic, isUpcomingMeetup } from 'model';
import { capitalizeFirstLetter } from 'common/helpers';
import { UserContext } from 'common/contexts';
import { MeetupStore } from 'store';

import styles from './ViewMeetupPage.module.scss';
import defaultImage from 'assets/images/default-image.jpg';
import calendar from './assets/calendar.svg';
import clock from './assets/clock.svg';
import pin from './assets/pin.svg';

const MAX_PREVIEW_USERS = 8; // will be changed

export const ViewMeetupPage = observer(() => {
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();

  const userStore = useContext(UserContext);
  const {
    meetup,
    votedUsers,
    participants,
    error,
    isLoading,
    isUserVoted,
    supportMeetup,
    unsupportMeetup,
    enrollMeetup,
    disenrollMeetup,
    approveMeetup,
    deleteMeetup,
  } = useLocalObservable(() => new MeetupStore(id!, userStore));

  if (isLoading) return <FormattedMessage id="loading" />;
  if (!meetup) throw error;

  const { user, isChief, canUserAccessMeetup } = userStore;

  if (!canUserAccessMeetup(meetup)) return <Navigate to="/forbidden" />;

  const handleGoBack = () => navigate(-1);

  const handleDelete = () => {
    deleteMeetup();
    handleGoBack();
  };

  const handleApprove = () => {
    approveMeetup();
    navigate('/meetups/moderation');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/meetups/${id}/edit`);
  };

  const handleSupport = () => supportMeetup();
  const handleUnsupport = () => unsupportMeetup();
  const handleEnroll = () => enrollMeetup();
  const handleDisenroll = () => disenrollMeetup();

  const renderHeader = () => {
    if (isTopic(meetup)) {
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
    if (isTopic(meetup)) return null;

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
        {isTopic(meetup) ? (
          <FormattedMessage id="author" />
        ) : (
          <FormattedMessage id="speaker" />
        )}
      </Typography>
      <div className={styles.dataContent}>
        {isTopic(meetup) ? (
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

  const renderUsers = () => {
    const users = isTopic(meetup) ? votedUsers : participants;

    if (users?.length === 0) return null;

    const previewUsers = users!.slice(0, MAX_PREVIEW_USERS);

    return (
      <div className={styles.data}>
        <Typography
          component={TypographyComponent.Span}
          className={styles.dataName}
        >
          {isTopic(meetup) ? (
            <FormattedMessage id="support" />
          ) : (
            <FormattedMessage id="enrolled" />
          )}
        </Typography>
        <div className={classNames(styles.dataContent, styles.users)}>
          {previewUsers.map((user: ShortUser) => (
            <UserPreview
              key={user.id}
              variant={UserPreviewVariant.Image}
              user={user}
            />
          ))}
          {users!.length - MAX_PREVIEW_USERS > 0 && (
            <div className={styles.restCounter}>
              +{users!.length - MAX_PREVIEW_USERS}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChiefActions = () => (
    <div className={styles.actionsWrapper}>
      <Button variant={ButtonVariant.Secondary} onClick={handleDelete}>
        <FormattedMessage id="deleteButton" />
      </Button>
      {meetup.status === MeetupStatus.DRAFT && (
        <Button variant={ButtonVariant.Primary} onClick={handleApprove}>
          <FormattedMessage id="approveTopicButton" />
        </Button>
      )}
      {meetup.status === MeetupStatus.REQUEST && (
        <Button variant={ButtonVariant.Primary} onClick={handleEdit}>
          <FormattedMessage id="editButton" />
        </Button>
      )}
      {isUpcomingMeetup(meetup) && (
        <Button variant={ButtonVariant.Primary} onClick={handleEdit}>
          <FormattedMessage id="editButton" />
        </Button>
      )}
    </div>
  );

  const renderActions = () => (
    <>
      {meetup.status === MeetupStatus.DRAFT && !isUserVoted && (
        <Button variant={ButtonVariant.Primary} onClick={handleSupport}>
          <FormattedMessage id="supportTopicButton" />
        </Button>
      )}
      {meetup.status === MeetupStatus.DRAFT && isUserVoted && (
        <Button variant={ButtonVariant.Primary} onClick={handleUnsupport}>
          <FormattedMessage id="unsupportTopicButton" />
        </Button>
      )}
      {isUpcomingMeetup(meetup) && !isUserVoted && (
        <Button variant={ButtonVariant.Primary} onClick={handleEnroll}>
          <FormattedMessage id="enrollMeetup" />
        </Button>
      )}
      {isUpcomingMeetup(meetup) && isUserVoted && (
        <Button variant={ButtonVariant.Primary} onClick={handleDisenroll}>
          <FormattedMessage id="disenrollMeetup" />
        </Button>
      )}
    </>
  );

  return (
    <section className={styles.container}>
      <div className={styles.headingWrapper}>
        <Typography
          className={styles.heading}
          component={TypographyComponent.Heading1}
        >
          {isTopic(meetup) ? (
            <FormattedMessage id="topicView" />
          ) : (
            <FormattedMessage id="meetupView" />
          )}
        </Typography>
        {isChief && renderChiefActions()}
      </div>

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
        {renderUsers()}
        <div className={classNames(styles.dataContent, styles.actions)}>
          <Button variant={ButtonVariant.Default} onClick={handleGoBack}>
            <FormattedMessage id="goBackButton" />
          </Button>
          {user && renderActions()}
        </div>
      </div>
    </section>
  );
});
