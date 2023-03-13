import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateTimeRangePicker } from './DateTimeRangePicker';

import {
  FormikPropsWithOptionalSubmit,
  FormikWrapper,
  renderWithIntl,
} from 'common/utils';
import { get2DigitMonth } from 'common/helpers';

const dateTimeFormikProps: FormikPropsWithOptionalSubmit = {
  initialValues: { start: '', finish: '' },
};

it('Finish input stores the first available datetime after choosing start date', async () => {
  renderWithIntl()(
    <FormikWrapper formikProps={dateTimeFormikProps}>
      <DateTimeRangePicker startRangeName="start" endRangeName="finish" />
    </FormikWrapper>,
  );

  const startInput = screen.getAllByRole('textbox')[0];
  const finishInput = screen.getAllByRole('textbox')[1];

  userEvent.click(startInput);

  /* Choose random (in this case 15th) day */
  userEvent.click(
    screen.getByText((content, element) =>
      element!.classList.contains('react-datepicker__day--015'),
    ),
  );

  /* Expect finish input stores the first available
     datetime (by default 15 minutes later from start value) */
  await waitFor(() =>
    expect(finishInput).toHaveValue(
      get2DigitMonth(new Date()) + '/15/2023, 12:15 AM',
    ),
  );
});

it('Finish input duplicates date of start input', async () => {
  renderWithIntl()(
    <FormikWrapper formikProps={dateTimeFormikProps}>
      <DateTimeRangePicker startRangeName="start" endRangeName="finish" />
    </FormikWrapper>,
  );

  const startInput = screen.getAllByRole('textbox')[0];
  const finishInput = screen.getAllByRole('textbox')[1];

  userEvent.click(startInput);

  userEvent.click(
    screen.getByText((content, element) =>
      element!.classList.contains('react-datepicker__day--015'),
    ),
  );

  userEvent.click(
    screen.getByText((content, element) =>
      element!.classList.contains('react-datepicker__day--025'),
    ),
  );

  await waitFor(() =>
    expect(finishInput).toHaveValue(
      get2DigitMonth(new Date()) + '/25/2023, 12:15 AM',
    ),
  );
});
