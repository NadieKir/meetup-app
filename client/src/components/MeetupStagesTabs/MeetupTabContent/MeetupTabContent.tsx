import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { computed } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';

import {
  Button,
  ButtonVariant,
  CardsCounter,
  MeetupCard,
  MeetupCardVariant,
} from 'components';
import { MeetupListStore } from 'store';
import { UserContext } from 'common/contexts';

import styles from './MeetupTabContent.module.scss';

interface MeetupTabContentProps {
  variant: MeetupCardVariant;
}

export const MeetupTabContent = observer(
  ({ variant }: MeetupTabContentProps) => {
    const navigate = useNavigate();

    const userStore = useContext(UserContext);
    const { isLoading, getTabMeetups } = useLocalObservable(
      () => new MeetupListStore(),
    );
    const tabMeetups = computed(() => getTabMeetups(variant)).get();

    if (isLoading) return <FormattedMessage id="loading" />;

    const handleCreate = () => navigate('/meetups/create');

    return (
      <section className={styles.meetupsTab}>
        <div className={styles.wrapper}>
          <CardsCounter amount={tabMeetups.length} variant={variant} />
          {variant === MeetupCardVariant.Topic && userStore.user && (
            <Button variant={ButtonVariant.Secondary} onClick={handleCreate}>
              <FormattedMessage id="createMeetupButton" />
            </Button>
          )}
        </div>
        <div className={styles.meetups}>
          {tabMeetups.map((meetup) => (
            <NavLink to={`/meetups/${meetup.id}`} key={meetup.id}>
              <MeetupCard meetup={meetup} />
            </NavLink>
          ))}
        </div>
      </section>
    );
  },
);
