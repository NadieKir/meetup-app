import { FormattedMessage } from 'react-intl';

import { CreateTopicForm, Typography, TypographyComponent } from 'components';

import styles from './CreateTopicPage.module.scss';

export const CreateTopicPage = () => {
  return (
    <section className={styles.container}>
      <Typography
        component={TypographyComponent.Heading1}
        className={styles.heading}
      >
        <FormattedMessage id="suggestTopic" />
      </Typography>
      <CreateTopicForm />
    </section>
  );
};
