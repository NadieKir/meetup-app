import { HTMLAttributes, useEffect } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { useIntl } from 'react-intl';

import { DateTimePicker } from 'components/DateTimePicker';

interface DateTimeRangePickerProps extends HTMLAttributes<unknown> {
  startRangeName: string;
  endRangeName: string;
  excludePastDateTime?: boolean;
  timeIntervals?: number;
}

export function DateTimeRangePicker<T extends FormikValues>({
  startRangeName,
  endRangeName,
  excludePastDateTime = false,
  timeIntervals = 15,
  ...nativeHtmlProps
}: DateTimeRangePickerProps) {
  const intl = useIntl();

  const { values, setFieldValue, setFieldTouched } = useFormikContext<T>();

  const startValue = values[startRangeName] as Date | null;
  const endValue = values[endRangeName] as Date | null;
  const now = new Date();

  useEffect(() => {
    setFieldTouched(startRangeName, true, true);
  }, [startValue]);

  useEffect(() => {
    setFieldTouched(endRangeName, true, true);
  }, [endValue]);

  const setStartDate = (date: Date) => {
    setFieldValue(startRangeName, date, true);
  };

  const setEndDate = (date: Date) => {
    setFieldValue(endRangeName, date, true);
  };

  const handleStartChange = (date: Date | null) => {
    const newStartDate = date as Date;
    const newEndDate = new Date(newStartDate);

    if (!endValue || endValue <= newStartDate) {
      newEndDate.setMinutes(newStartDate.getMinutes() + 15);
    } else {
      newEndDate.setHours(endValue.getHours());
      newEndDate.setMinutes(endValue.getMinutes());
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleFinishChange = (date: Date | null) => {
    setEndDate(date as Date);
  };

  return (
    <div className={nativeHtmlProps.className}>
      <DateTimePicker
        name={startRangeName}
        labelText={intl.formatMessage({ id: 'startLabel' })}
        customHandleChange={handleStartChange}
        excludePastDateTime={excludePastDateTime}
        constraints={{
          selected: startValue,
          timeIntervals: timeIntervals,
        }}
      />
      <DateTimePicker
        name={endRangeName}
        labelText={intl.formatMessage({ id: 'finishLabel' })}
        customHandleChange={handleFinishChange}
        constraints={{
          showTimeSelectOnly: true,
          selected: endValue,
          timeIntervals: timeIntervals,
          minTime: new Date(
            !startValue
              ? now.setHours(0, 0, 0, 0)
              : new Date(startValue).setMinutes(startValue.getMinutes() + 15),
          ),
          maxTime: new Date(now.setHours(23, 59, 0, 0)),
        }}
      />
    </div>
  );
}
