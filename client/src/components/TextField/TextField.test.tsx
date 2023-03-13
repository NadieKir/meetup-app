import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

import { TextField } from './TextField';
import { FormikPropsWithOptionalSubmit, renderWithFormik } from 'common/utils';

const formikNameFieldProps: FormikPropsWithOptionalSubmit = {
  initialValues: { name: '' },
  validationSchema: Yup.object().shape({
    name: Yup.string().max(10, 'Your name is too big'),
  }),
};

const formikTextFieldProps: FormikPropsWithOptionalSubmit = {
  initialValues: { text: '' },
};

it('Renders hint text on initialization', async () => {
  renderWithFormik(formikNameFieldProps)(
    <TextField
      name="name"
      labelText="Name"
      placeholderText="Enter name"
      multiline={false}
      hintText="Write your real name"
    />,
  );

  const hintText = await screen.findByText('Write your real name');

  expect(hintText).toBeInTheDocument();
});

it('Updates input value', async () => {
  renderWithFormik(formikNameFieldProps)(
    <TextField
      name="name"
      labelText="Name"
      placeholderText="Enter name"
      multiline={false}
      hintText="Write your real name"
    />,
  );

  const nameInput = screen.getByPlaceholderText('Enter name');
  fireEvent.change(nameInput, { target: { value: 'John' } });

  await waitFor(() => {
    expect(nameInput).toHaveValue('John');
  });
});

it('Validates input value and shows error message', async () => {
  renderWithFormik(formikNameFieldProps)(
    <TextField
      name="name"
      labelText="Name"
      placeholderText="Enter name"
      multiline={false}
    />,
  );

  const nameInput = screen.getByPlaceholderText('Enter name');

  fireEvent.focusIn(nameInput);
  fireEvent.change(nameInput, { target: { value: 'Jonathan-junior' } });
  fireEvent.focusOut(nameInput);

  await waitFor(() => {
    expect(screen.getByText('Your name is too big')).toBeInTheDocument();
  });
});

it('Validates input value and shows success message', async () => {
  renderWithFormik(formikNameFieldProps)(
    <TextField
      name="name"
      labelText="Name"
      placeholderText="Enter name"
      multiline={false}
      successText="Your name is perfect"
    />,
  );

  const nameInput = screen.getByPlaceholderText('Enter name');

  fireEvent.change(nameInput, { target: { value: 'John' } });
  fireEvent.focusOut(nameInput);

  await waitFor(() => {
    expect(screen.queryByText('Your name is too big')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('Your name is perfect')).toBeInTheDocument();
  });
});

it('Does not allow to write more than maxLetterCount symbols', async () => {
  const text = 'John is a famous front-end developer';
  const maxLetterCount = 20;

  renderWithFormik(formikTextFieldProps)(
    <TextField
      name="text"
      placeholderText="Enter text"
      multiline={true}
      maxLetterCount={maxLetterCount}
    />,
  );

  const textInput = screen.getByPlaceholderText('Enter text');

  userEvent.type(textInput, text);

  await waitFor(() => {
    expect(textInput).toHaveValue(text.slice(0, maxLetterCount));
  });
});
