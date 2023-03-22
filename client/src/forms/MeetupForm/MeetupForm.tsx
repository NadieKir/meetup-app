import { useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';
import { useIntl } from 'react-intl';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';

import { DateTimeRangePicker } from 'components/DateTimeRangePicker';
import { ImagePreviewMode } from 'components/ImagePreview';
import { ImageUploader } from 'components/ImageUploader';
import { MultiSelect } from 'components/MultiSelect';
import { FormikStepper } from 'components/FormikStepper';
import { TextField } from 'components/TextField';
import { RichTextInput } from 'components/RichTextInput';
import { getShortUsers } from 'api';
import {
  AdditionalMeetupFields,
  MeetupFormData,
  RequiredMeetupFields,
  RequiredMeetupFieldsFormData,
} from 'common/types';
import { ShortUser } from 'common/model';

import styles from './MeetupForm.module.scss';

interface MeetupFormProps {
  initialValuesRequiredStep:
    | RequiredMeetupFields
    | RequiredMeetupFieldsFormData;
  initialValuesAdditionalStep: AdditionalMeetupFields;
  handleSubmit: (
    values: MeetupFormData,
    actions: FormikHelpers<MeetupFormData>,
  ) => Promise<void>;
  touchedNotRequired?: boolean;
}

export const MeetupForm = observer(
  ({
    initialValuesRequiredStep,
    initialValuesAdditionalStep,
    handleSubmit,
    touchedNotRequired = false,
  }: MeetupFormProps) => {
    const intl = useIntl();

    const [options, setOptions] = useState<ShortUser[]>([]);

    useEffect(() => {
      (async function () {
        const users = await getShortUsers();
        setOptions(users);
      })();
    }, []);

    const requiredMeetupFieldsSchema = Yup.object().shape({
      subject: Yup.string()
        .min(3, intl.formatMessage({ id: 'subjectMinError' }))
        .max(100, intl.formatMessage({ id: 'subjectMaxError' }))
        .required(intl.formatMessage({ id: 'subjectRequiredError' })),
      excerpt: Yup.string().required(
        intl.formatMessage({ id: 'excerptRequiredError' }),
      ),
      start: Yup.date()
        .min(new Date(), intl.formatMessage({ id: 'startMinError' }))
        .required(intl.formatMessage({ id: 'startRequiredError' })),
      finish: Yup.date()
        .min(Yup.ref('start'), intl.formatMessage({ id: 'finishMinError' }))
        .required(intl.formatMessage({ id: 'finishRequiredError' })),
      speakers: Yup.array()
        .min(1, intl.formatMessage({ id: 'speakersRequiredError' }))
        .required(intl.formatMessage({ id: 'speakersRequiredError' })),
    });

    const additionalMeetupFieldsSchema = Yup.object().shape({
      place: Yup.string().max(50, intl.formatMessage({ id: 'placeMaxError' })),
    });

    const renderRequiredFields = () => (
      <>
        <TextField
          name="subject"
          labelText={intl.formatMessage({ id: 'subjectLabel' })}
          multiline={false}
        />
        <RichTextInput
          name="excerpt"
          labelText={intl.formatMessage({ id: 'excerptLabel' })}
        />
        <MultiSelect
          name="speakers"
          labelText={intl.formatMessage({ id: 'speakersLabel' })}
          options={options}
          getOptionLabel={(option) => `${option.name} ${option.surname}`}
          getOptionValue={(option) => option.id}
        />
        <DateTimeRangePicker
          startRangeName="start"
          endRangeName="finish"
          excludePastDateTime
          className={styles.datesInputWrapper}
        />
      </>
    );

    const renderAdditionalFields = () => (
      <>
        <TextField
          name="place"
          labelText={intl.formatMessage({ id: 'placeLabel' })}
          multiline={false}
        />
        <ImageUploader
          name="image"
          variant={ImagePreviewMode.Thumbnail}
          labelText={intl.formatMessage({ id: 'imageLabel' })}
        />
      </>
    );

    const steps = [
      {
        title: 'Обязательные поля',
        initialValues: initialValuesRequiredStep,
        validateSchema: requiredMeetupFieldsSchema,
        fields: renderRequiredFields,
        noVerify: touchedNotRequired,
      },
      {
        title: 'Дополнительные поля',
        initialValues: initialValuesAdditionalStep,
        validateSchema: additionalMeetupFieldsSchema,
        fields: renderAdditionalFields,
        noVerify: true,
      },
    ];

    return <FormikStepper steps={steps} onFinish={handleSubmit} />;
  },
);
