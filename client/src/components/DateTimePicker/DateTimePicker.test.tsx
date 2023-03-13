import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateTimePicker } from './DateTimePicker';

import {
  FormikPropsWithOptionalSubmit,
  FormikWrapper,
  renderWithIntl,
} from 'common/utils';
import { get2DigitMonth } from 'common/helpers';

const dateTimeFormikProps: FormikPropsWithOptionalSubmit = {
  initialValues: { birthday: '' },
};

it('Stores chosen value', async () => {
  renderWithIntl()(
    <FormikWrapper formikProps={dateTimeFormikProps}>
      <DateTimePicker
        name="birtday"
        labelText="Bithday"
        placeholderText="Enter your bithday"
      />
    </FormikWrapper>,
  );

  const dateTimeInput = screen.getByPlaceholderText('Enter your bithday');

  userEvent.click(dateTimeInput);
  userEvent.click(
    screen.getByText((content, element) =>
      element!.classList.contains('react-datepicker__day--015'),
    ),
  );

  await waitFor(() =>
    expect(dateTimeInput).toHaveValue(
      get2DigitMonth(new Date()) + '/15/2023, 12:00 AM',
    ),
  );
});

it('Doew not store past dates when excludePastDateTime prop is used', async () => {
  renderWithIntl()(
    <FormikWrapper formikProps={dateTimeFormikProps}>
      <DateTimePicker
        name="birtday"
        labelText="Bithday"
        placeholderText="Enter your bithday"
        excludePastDateTime
      />
    </FormikWrapper>,
  );

  const dateTimeInput = screen.getByPlaceholderText('Enter your bithday');

  userEvent.click(dateTimeInput);
  userEvent.click(
    screen.getAllByText((content, element) =>
      element!.classList.contains('react-datepicker__day--001'),
    )[0],
  );

  await waitFor(() =>
    expect(dateTimeInput).not.toHaveValue(
      get2DigitMonth(new Date()) + '/01/2023, 12:00 AM',
    ),
  );
});
