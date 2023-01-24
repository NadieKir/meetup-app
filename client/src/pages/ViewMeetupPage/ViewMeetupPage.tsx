import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
  UserPreview,
  UserPreviewVariant,
} from 'components';
import { MeetupStatus, ShortUser, UserRole } from 'model';
import { NotFoundPage } from 'pages';
import { capitalizeFirstLetter } from 'common/helpers';
import { useMeetupQuery } from 'common/hooks';
import { UserContext, MeetupContext } from 'common/contexts';

import styles from './ViewMeetupPage.module.scss';
import defaultImage from 'assets/images/default-image.jpg';
import calendar from './assets/calendar.svg';
import clock from './assets/clock.svg';
import pin from './assets/pin.svg';

const MAX_PREVIEW_USERS = 8; // will be changed

export const ViewMeetupPage = observer(() => {
  const intl = useIntl();
  const navigate = useNavigate();

  const userStore = useContext(UserContext);
  const meetupStore = useContext(MeetupContext);

  const { id } = useParams();
  const { meetup, isLoading } = useMeetupQuery(id!);

  if (isLoading || meetup === undefined)
    return <FormattedMessage id="loading" />;

  if (meetup === null) return <></>;

  const handleDelete = () => {
    meetupStore.deleteMeetup(meetup.id);
    navigate(-1);
  };
  const handleApprove = () => {
    meetupStore.approveMeetup(meetup);
    navigate('/meetups/moderation');
  };
  const handlePublish = () => {
    meetupStore.publishMeetup(meetup);
    navigate('/meetups/upcoming');
  };

  const handleSupport = () =>
    meetupStore.supportMeetup(meetup, userStore.user!);
  const handleUnsupport = () =>
    meetupStore.unsupportMeetup(meetup, userStore.user!);
  const handleEnroll = () => meetupStore.enrollMeetup(meetup, userStore.user!);
  const handleDisenroll = () =>
    meetupStore.disenrollMeetup(meetup, userStore.user!);

  const handleGoBack = () => navigate(-1);

  const isUserVoted = () => {
    const users =
      meetup.status === MeetupStatus.CONFIRMED
        ? meetup.participants
        : meetup.votedUsers;

    if (userStore.user) {
      return users?.map((user) => user.id).includes(userStore.user.id);
    }
    return false;
  };

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
    if (meetup.status === MeetupStatus.DRAFT) return null;

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

  const renderUsers = () => {
    const users =
      meetup.status === MeetupStatus.CONFIRMED
        ? meetup.participants
        : meetup.votedUsers;

    if (users?.length === 0) return null;

    const previewUsers = users!.slice(0, MAX_PREVIEW_USERS);

    return (
      <div className={styles.data}>
        <Typography
          component={TypographyComponent.Span}
          className={styles.dataName}
        >
          {meetup.status === MeetupStatus.CONFIRMED ? (
            <FormattedMessage id="enrolled" />
          ) : (
            <FormattedMessage id="support" />
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
        <Button variant={ButtonVariant.Primary} onClick={handlePublish}>
          <FormattedMessage id="publishButton" />
        </Button>
      )}
    </div>
  );

  const renderEmployeeActions = () => (
    <>
      {meetup.status === MeetupStatus.DRAFT && !isUserVoted() && (
        <Button variant={ButtonVariant.Primary} onClick={handleSupport}>
          <FormattedMessage id="supportTopicButton" />
        </Button>
      )}
      {meetup.status === MeetupStatus.DRAFT && isUserVoted() && (
        <Button variant={ButtonVariant.Primary} onClick={handleUnsupport}>
          <FormattedMessage id="unsupportTopicButton" />
        </Button>
      )}
      {meetup.status === MeetupStatus.CONFIRMED &&
        !meetup.isOver &&
        !isUserVoted() && (
          <Button variant={ButtonVariant.Primary} onClick={handleEnroll}>
            <FormattedMessage id="enrollMeetup" />
          </Button>
        )}
      {meetup.status === MeetupStatus.CONFIRMED &&
        !meetup.isOver &&
        isUserVoted() && (
          <Button variant={ButtonVariant.Primary} onClick={handleDisenroll}>
            <FormattedMessage id="disenrollMeetup" />
          </Button>
        )}
    </>
  );

  const renderActions = () => {
    switch (userStore.user?.roles) {
      case UserRole.CHIEF:
        return renderChiefActions();
      case UserRole.EMPLOYEE:
        return renderEmployeeActions();
      case undefined:
        return;
    }
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
        {renderUsers()}
        <div className={classNames(styles.dataContent, styles.actions)}>
          <Button variant={ButtonVariant.Default} onClick={handleGoBack}>
            <FormattedMessage id="goBackButton" />
          </Button>
          {renderActions()}
        </div>
      </div>
    </section>
  );
});
