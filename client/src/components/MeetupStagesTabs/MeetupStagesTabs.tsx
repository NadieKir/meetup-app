import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Typography, NavTabs, MeetupTabContent } from 'components';

import styles from './MeetupStagesTabs.module.scss';

export enum MeetupTab {
  Topics = 'topics',
  OnModeration = 'moderation',
  Upcoming = 'upcoming',
  Finished = 'finished',
}

export const meetupTabsLinks = Object.values(MeetupTab);

type MeetupTabDescriptor = {
  label: string | JSX.Element;
  component: JSX.Element;
};

export const meetupTabToDescriptor: Record<MeetupTab, MeetupTabDescriptor> = {
  [MeetupTab.Topics]: {
    label: <FormattedMessage id="topics" />,
    component: <MeetupTabContent variant={MeetupTab.Topics} />,
  },
  [MeetupTab.OnModeration]: {
    label: <FormattedMessage id="onModeration" />,
    component: <MeetupTabContent variant={MeetupTab.OnModeration} />,
  },
  [MeetupTab.Upcoming]: {
    label: <FormattedMessage id="upcoming" />,
    component: <MeetupTabContent variant={MeetupTab.Upcoming} />,
  },
  [MeetupTab.Finished]: {
    label: <FormattedMessage id="finished" />,
    component: <MeetupTabContent variant={MeetupTab.Finished} />,
  },
};

export function MeetupStagesTabs() {
  return (
    <>
      <NavTabs className={styles.tabs}>
        {meetupTabsLinks.map(
          (tab: MeetupTab): JSX.Element => (
            <NavLink
              key={tab}
              to={tab}
              className={({ isActive }) =>
                classNames(styles.tab, {
                  [styles.active]: isActive,
                })
              }
            >
              <Typography>{meetupTabToDescriptor[tab].label}</Typography>
            </NavLink>
          ),
        )}
      </NavTabs>
      <Outlet />
    </>
  );
}
