import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

import ButtonContent from 'assets/images/logo.svg';

it('Renders appropriate image content', () => {
  render(
    <Button>
      <img src={ButtonContent} alt="Logo" />
    </Button>,
  );

  expect(screen.getByAltText('Logo')).toBeInTheDocument();
});

it('Calls a function on click', () => {
  const fn = jest.fn();

  render(<Button onClick={fn}>Test</Button>);

  userEvent.click(screen.getByText('Test'));

  expect(fn).toBeCalled();
});
