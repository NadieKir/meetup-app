import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tooltip } from './Tooltip';

it('Visible on hover and not visible on unhover', () => {
  render(<Tooltip title="Tooltip">Hover</Tooltip>);

  const textToHover = screen.getByText('Hover');
  const tooltip = screen.getByTestId('tooltip');

  userEvent.hover(textToHover);
  expect(tooltip).toHaveClass('visible');

  userEvent.unhover(textToHover);
  expect(tooltip).not.toHaveClass('visible');
});
