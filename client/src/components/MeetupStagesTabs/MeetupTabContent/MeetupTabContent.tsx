import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  ButtonVariant,
  CardsCounter,
  MeetupCard,
  MeetupCardVariant,
} from 'components';
import { getMeetups } from 'api';
import { Meetup, MeetupStatus } from 'model';

import styles from './MeetupTabContent.module.scss';

interface MeetupTabContentProps {
  variant: MeetupCardVariant;
}

export const MeetupTabContent = ({ variant }: MeetupTabContentProps) => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);

  const navigate = useNavigate();

  const openCreateMeetupPage = () => navigate('/meetups/create');

  useEffect(() => {
    (async () => {
      const meetups = await getMeetups();

      switch (variant) {
        case MeetupCardVariant.Topic:
          setMeetups(
            meetups.filter((meetup) => meetup.status === MeetupStatus.DRAFT),
          );
          break;
        case MeetupCardVariant.OnModeration:
          setMeetups(
            meetups.filter((meetup) => meetup.status === MeetupStatus.REQUEST),
          );
          break;
        case MeetupCardVariant.Upcoming:
        case MeetupCardVariant.Finished:
          setMeetups(
            meetups.filter(
              (meetup) =>
                meetup.status === MeetupStatus.CONFIRMED &&
                meetup.isOver === (variant === MeetupCardVariant.Finished),
            ),
          );
          break;
      }
    })();
  }, [variant]);

  return (
    <section className={styles.topicsTab}>
      <div className={styles.wrapper}>
        <CardsCounter amount={meetups.length} variant={variant} />
        {variant === MeetupCardVariant.Topic && (
          <Button
            variant={ButtonVariant.Secondary}
            onClick={openCreateMeetupPage}
          >
            <FormattedMessage id="createMeetupButton" />
          </Button>
        )}
      </div>
      <div className={styles.topics}>
        {meetups.map((meetup) => (
          <NavLink to={`/meetups/${meetup.id}`} key={meetup.id}>
            <MeetupCard meetup={meetup} />
          </NavLink>
        ))}
      </div>
    </section>
  );
};
