import { ComponentProps, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';

import { LocalizationContext } from 'common/contexts';
import {
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
} from 'components';

import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.scss';

type DateTimePickerConstraints = Pick<
  ComponentProps<typeof DatePicker>,
  | 'filterDate'
  | 'filterTime'
  | 'startDate'
  | 'endDate'
  | 'minDate'
  | 'minTime'
  | 'maxDate'
  | 'maxTime'
  | 'allowSameDay'
  | 'required'
>;

type DateTimePickerProps = InputFieldExternalProps & {
  excludePastDateTime?: boolean;
  placeholderText?: string;
  constraints?: DateTimePickerConstraints;
};

export const DateTimePicker = ({
  excludePastDateTime = false,
  placeholderText = '',
  constraints = {},
  ...inputFieldProps
}: DateTimePickerProps): JSX.Element => {
  const intl = useIntl();
  const localeStore = useContext(LocalizationContext);

  return (
    <InputField
      {...inputFieldProps}
      containerAttributes={{ style: { width: 'min-content' } }}
    >
      {({
        field: { name, value },
        form: { setFieldValue, setFieldTouched, handleBlur },
        className,
      }: InputRenderProps): JSX.Element => {
        const now = new Date();
        const isSelectedDateToday = now.getDate() === new Date(value).getDate();

        const minTimeHour = isSelectedDateToday ? now.getHours() : 0;
        const minTimeMinutes = isSelectedDateToday ? now.getMinutes() : 0;

        const excludeProps = excludePastDateTime
          ? {
              minDate: now,
              minTime: new Date(
                now.setHours(minTimeHour, minTimeMinutes, 0, 0),
              ),
              maxTime: new Date(now.setHours(23, 59, 0, 0)),
            }
          : undefined;

        const handleChange = (date: Date | null): void => {
          setFieldValue(name, date);
        };

        const adjustTimeListHeight = () => {
          const dayNamesHeight = document.querySelector<HTMLDivElement>(
            '.react-datepicker__day-names',
          )?.clientHeight;
          const monthHeight = document.querySelector<HTMLDivElement>(
            '.react-datepicker__month',
          )?.clientHeight;
          const timeList = document.querySelector<HTMLDivElement>(
            '.react-datepicker__time-list',
          );

          if (timeList && dayNamesHeight && monthHeight) {
            timeList.style.setProperty(
              '--time-list-height',
              `${dayNamesHeight + monthHeight}px`,
            );
          }
        };

        return (
          <DatePicker
            className={className}
            locale={localeStore.locale}
            timeCaption={intl.formatMessage({ id: 'time' })}
            name={name}
            selected={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onCalendarClose={() => setFieldTouched(name, true, false)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText={placeholderText}
            onMonthChange={adjustTimeListHeight}
            autoComplete="off"
            closeOnScroll
            {...constraints}
            {...excludeProps}
          />
        );
      }}
    </InputField>
  );
};
