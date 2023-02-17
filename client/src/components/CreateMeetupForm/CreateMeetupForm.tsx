import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { FormattedMessage } from 'react-intl';
import { observer, useLocalObservable } from 'mobx-react-lite';

import {
  AdditionalMeetupFields,
  MeetupForm,
  RequiredMeetupFields,
} from 'components';
import { UserContext } from 'common/contexts';
import { MeetupFormData } from 'model';
import { MeetupStore } from 'store';

export const CreateMeetupForm = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

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
