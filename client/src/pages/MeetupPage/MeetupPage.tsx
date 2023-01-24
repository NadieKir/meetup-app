import { MeetupProvider } from 'common/contexts';
import { Typography, MeetupStagesTabs, TypographyComponent } from 'components';
import { FormattedMessage } from 'react-intl';

import styles from './MeetupPage.module.scss';

export const MeetupPage = () => (
  <MeetupProvider>
    <Typography
      component={TypographyComponent.Heading1}
      className={styles.heading}
    >
      <FormattedMessage id="meetups" />
    </Typography>
    <MeetupStagesTabs />
  </MeetupProvider>
);
