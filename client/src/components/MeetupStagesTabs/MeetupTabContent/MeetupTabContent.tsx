import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';

import {
  Button,
  ButtonVariant,
  CardsCounter,
  MeetupCard,
  MeetupCardVariant,
} from 'components';
import { NotFoundPage } from 'pages';
import { UserContext } from 'common/contexts';
import { useMeetupsQuery } from 'common/hooks';

import styles from './MeetupTabContent.module.scss';

interface MeetupTabContentProps {
  variant: MeetupCardVariant;
}

export const MeetupTabContent = observer(
  ({ variant }: MeetupTabContentProps) => {
    const userStore = useContext(UserContext);
    const navigate = useNavigate();

    const { meetups, isLoading } = useMeetupsQuery(variant);

    if (isLoading || meetups === undefined)
      return <FormattedMessage id="loading" />;

    if (meetups === null) return <></>;

    const handleCreate = () => navigate('/meetups/create');

    return (
      <section className={styles.topicsTab}>
        <div className={styles.wrapper}>
          <CardsCounter amount={meetups.length} variant={variant} />
          {variant === MeetupCardVariant.Topic && userStore.user && (
            <Button variant={ButtonVariant.Secondary} onClick={handleCreate}>
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
  },
);
