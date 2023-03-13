import { render, screen } from '@testing-library/react';

import { Typography, TypographyComponent } from './Typography';

it('Renders heading tag with right level', () => {
  render(
    <Typography component={TypographyComponent.Heading1}>Text</Typography>,
  );

  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

  render(
    <Typography component={TypographyComponent.Heading5}>Text</Typography>,
  );

  expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
});

it('Renders <span> tag', () => {
  render(<Typography component={TypographyComponent.Span}>Text</Typography>);

  expect(
    screen.getByText(
      (content, element) => element!.tagName.toLowerCase() === 'span',
    ),
  ).toBeInTheDocument();
});

it('Renders <p> tag', () => {
  render(
    <Typography component={TypographyComponent.Paragraph}>Text</Typography>,
  );

  expect(
    screen.getByText(
      (content, element) => element!.tagName.toLowerCase() === 'p',
    ),
  ).toBeInTheDocument();
});
