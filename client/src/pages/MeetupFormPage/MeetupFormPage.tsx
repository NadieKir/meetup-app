import { FormattedMessage } from 'react-intl';

import {
  CreateMeetupForm,
  Typography,
  TypographyComponent,
  EditMeetupForm,
} from 'components';

import styles from './MeetupFormPage.module.scss';

interface MeetupFormPageProps {
  isEdit?: boolean;
}

export const MeetupFormPage = ({ isEdit = false }: MeetupFormPageProps) => {
  return (
    <section className={styles.container}>
      <Typography
        component={TypographyComponent.Heading1}
        className={styles.heading}
      >
        {isEdit ? (
          <FormattedMessage id="editMeetup" />
        ) : (
          <FormattedMessage id="createMeetup" />
        )}
      </Typography>
      {isEdit ? <EditMeetupForm /> : <CreateMeetupForm />}
    </section>
  );
};
