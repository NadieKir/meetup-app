import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Navigate, NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { computed } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { MeetupListStore } from 'stores';
import { Button, ButtonVariant, CardsCounter, MeetupCard } from 'components';
import { UserContext } from 'common/contexts';
import { MeetupTab } from 'common/types';

import styles from './MeetupTabContent.module.scss';

interface MeetupTabContentProps {
  variant: MeetupTab;
}

export const MeetupTabContent = observer(
  ({ variant }: MeetupTabContentProps) => {
    const navigate = useNavigate();

    const { user, currentUserMeetupTabs } = useContext(UserContext);
    const { isLoading, getTabMeetups } = useLocalObservable(
      () => new MeetupListStore(),
    );

    const tabMeetups = computed(() => getTabMeetups(variant)).get();

    if (isLoading) return <FormattedMessage id="loading" />;

    if (currentUserMeetupTabs.find((tab) => tab.link === variant) === undefined)
      return <Navigate to="/forbidden" />;

    const handleCreate = () => navigate('/meetups/create');

    return (
      <section className={styles.meetupsTab}>
        <div className={styles.wrapper}>
          <CardsCounter amount={tabMeetups.length} variant={variant} />
          {variant === MeetupTab.Topics && user && (
            <Button variant={ButtonVariant.Secondary} onClick={handleCreate}>
              <FormattedMessage id="createTopicButton" />
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
