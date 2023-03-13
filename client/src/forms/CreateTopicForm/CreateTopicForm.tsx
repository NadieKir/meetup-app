import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer } from 'mobx-react-lite';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { Button, ButtonVariant, TextField, Form } from 'components';
import { ShortUser } from 'common/model';
import { UserContext } from 'common/contexts';
import { createMeetup } from 'api';
import { TopicFormData } from 'common/types';
import { usePushNotification } from 'common/hooks';

export const CreateTopicForm = observer(() => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { shortUser } = useContext(UserContext);
  const { pushSuccess } = usePushNotification();

  const initialValues = {
    subject: '',
    excerpt: '',
    author: shortUser as ShortUser,
  };

  const handleSubmit = async (
    values: TopicFormData,
    actions: FormikHelpers<TopicFormData>,
  ) => {
    await createMeetup(values);

    actions.setSubmitting(false);
    pushSuccess(intl.formatMessage({ id: 'topicCreated' }));
    navigate(-1);
  };

  const createTopicSchema = Yup.object().shape({
    subject: Yup.string()
      .min(2, intl.formatMessage({ id: 'subjectMinError' }))
      .max(100, intl.formatMessage({ id: 'subjectMaxError' }))
      .required(intl.formatMessage({ id: 'subjectRequiredError' })),
    excerpt: Yup.string().required(
      intl.formatMessage({ id: 'excerptRequiredError' }),
    ),
  });

  const renderFields = () => {
    return (
      <>
        <TextField
          name="subject"
          labelText={intl.formatMessage({ id: 'subjectLabel' })}
          multiline={false}
        />
        <TextField
          name="excerpt"
          labelText={intl.formatMessage({ id: 'excerptLabel' })}
          multiline={true}
          maxLetterCount={500}
        />
      </>
    );
  };

  const renderButton = (props: FormikProps<TopicFormData>) => (
    <Button
      type="submit"
      variant={ButtonVariant.Primary}
      disabled={!props.isValid || !props.dirty}
    >
      <FormattedMessage id="createButton" />
    </Button>
  );

  return (
    <Form
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      validateSchema={createTopicSchema}
      fields={renderFields}
      submitButton={renderButton}
    />
  );
});
