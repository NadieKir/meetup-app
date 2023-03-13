import { FormattedMessage } from 'react-intl';

import { Typography, TypographyComponent } from 'components/Typography';

import styles from './VotesCount.module.scss';
import { ReactComponent as ProfileIcon } from './profile.svg';

interface VotesCountProps {
  votesCount: number;
}

export const VotesCount = ({ votesCount }: VotesCountProps): JSX.Element => (
  <div className={styles.wrapper}>
    <ProfileIcon className={styles.icon} />
    <Typography
      component={TypographyComponent.Paragraph}
      className={styles.text}
    >
      <FormattedMessage id="supportUsers" values={{ votesCount }} />
    </Typography>
  </div>
);
