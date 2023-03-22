import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { parseISO } from 'date-fns';

import { MeetupForm } from 'forms';
import { updateMeetup } from 'api';
import { UserContext } from 'common/contexts';
import { isConfirmedMeetup } from 'common/helpers';
import { ConfirmedMeetup } from 'common/model';
import { MeetupStore } from 'stores';
import {
  AdditionalMeetupFields,
  MeetupFormData,
  RequiredMeetupFieldsFormData,
} from 'common/types';
import { usePushNotification } from 'common/hooks';

export const EditMeetupForm = observer(() => {
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushSuccess } = usePushNotification();

  const userStore = useContext(UserContext);
  const { meetup, isLoading, error } = useLocalObservable(
    () => new MeetupStore(id!, userStore),
  );

  if (isLoading) return <FormattedMessage id="loading" />;
  if (!meetup || !isConfirmedMeetup(meetup)) throw error;

  const initialValuesRequiredStep: RequiredMeetupFieldsFormData = {
    start: parseISO(meetup.start),
    finish: parseISO(meetup.finish),
    speakers: meetup.speakers,
    subject: meetup.subject,
    excerpt: meetup.excerpt,
  };

  const initialValuesAdditionalStep: AdditionalMeetupFields = {
    place: meetup.place,
    image: meetup.image,
  };

  const handleSubmit = async (
    values: MeetupFormData,
    actions: FormikHelpers<MeetupFormData>,
  ) => {
    await updateMeetup({
      ...meetup,
      ...values,
    } as ConfirmedMeetup);

    actions.setSubmitting(false);
    pushSuccess(intl.formatMessage({ id: 'changesSaved' }));
    navigate(`/meetups/${id}`);
  };

  return (
    <MeetupForm
      initialValuesRequiredStep={initialValuesRequiredStep}
      initialValuesAdditionalStep={initialValuesAdditionalStep}
      handleSubmit={handleSubmit}
      touchedNotRequired
    />
  );
});
