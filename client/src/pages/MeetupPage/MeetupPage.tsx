import { FormattedMessage } from 'react-intl';

import { Typography, MeetupStagesTabs, TypographyComponent } from 'components';

import styles from './MeetupPage.module.scss';

export const MeetupPage = () => (
  <section>
    <Typography
      component={TypographyComponent.Heading1}
      className={styles.heading}
    >
      <FormattedMessage id="meetups" />
    </Typography>
    <MeetupStagesTabs />
  </section>
);
