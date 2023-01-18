import { Typography, MeetupStagesTabs, TypographyComponent } from 'components';
import { FormattedMessage } from 'react-intl';

import styles from './MeetupPage.module.scss';

export const MeetupPage = () => (
  <div>
    <Typography
      component={TypographyComponent.Heading1}
      className={styles.heading}
    >
      <FormattedMessage id="meetups" />
    </Typography>
    <MeetupStagesTabs />
  </div>
);
