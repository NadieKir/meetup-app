import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { MeetupForm } from 'forms';
import { UserContext } from 'common/contexts';
import { MeetupStore } from 'stores';
import {
  AdditionalMeetupFields,
  MeetupFormData,
  RequiredMeetupFields,
} from 'common/types';
import { usePushNotification } from 'common/hooks';

export const CreateMeetupForm = observer(() => {
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushSuccess } = usePushNotification();

  const userStore = useContext(UserContext);
  const { meetup, isLoading, error, publishMeetup } = useLocalObservable(
    () => new MeetupStore(id!, userStore),
  );

  if (isLoading) return <FormattedMessage id="loading" />;
  if (!meetup) throw error;

  const initialValuesRequiredStep: RequiredMeetupFields = {
    start: '',
    finish: '',
    speakers: [],
    subject: meetup.subject,
    excerpt: meetup.excerpt,
  };

  const initialValuesAdditionalStep: AdditionalMeetupFields = {
    place: '',
    image: null,
  };

  const handleSubmit = async (
    values: MeetupFormData,
    actions: FormikHelpers<MeetupFormData>,
  ) => {
    await publishMeetup(values);

    actions.setSubmitting(false);
    pushSuccess(intl.formatMessage({ id: 'meetupCreated' }));
    navigate('/meetups/upcoming');
  };

  return (
    <MeetupForm
      initialValuesRequiredStep={initialValuesRequiredStep}
      initialValuesAdditionalStep={initialValuesAdditionalStep}
      handleSubmit={handleSubmit}
    />
  );
});
