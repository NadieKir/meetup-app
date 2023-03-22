import { screen } from '@testing-library/react';

import { CardsCounter } from './CardsCounter';
import { renderWithIntl } from 'common/utils';
import { MeetupTab } from 'common/types';
import { Locale } from 'i18n';

it('Renders correct ending for topics', async () => {
  renderWithIntl()(<CardsCounter variant={MeetupTab.Topics} amount={7} />);

  expect(screen.getByText(/тем предложено/)).toBeInTheDocument();

  renderWithIntl(Locale.ENGLISH)(
    <CardsCounter variant={MeetupTab.Topics} amount={1} />,
  );

  expect(screen.getByText(/suggested topic/)).toBeInTheDocument();
});

it('Renders correct ending for meetups on moderation', async () => {
  renderWithIntl()(
    <CardsCounter variant={MeetupTab.OnModeration} amount={22} />,
  );

  expect(screen.getByText(/митапа на модерации/)).toBeInTheDocument();

  renderWithIntl(Locale.ENGLISH)(
    <CardsCounter variant={MeetupTab.OnModeration} amount={11} />,
  );

  expect(screen.getByText(/on moderation meetups/)).toBeInTheDocument();
});

it('Renders correct ending for upcoming meetups', async () => {
  renderWithIntl()(<CardsCounter variant={MeetupTab.Upcoming} amount={1} />);

  expect(screen.getByText(/митап опубликован/)).toBeInTheDocument();

  renderWithIntl(Locale.ENGLISH)(
    <CardsCounter variant={MeetupTab.Upcoming} amount={4} />,
  );

  expect(screen.getByText(/upcoming meetups/)).toBeInTheDocument();
});

it('Renders correct ending for finished meetups', async () => {
  renderWithIntl()(<CardsCounter variant={MeetupTab.Finished} amount={13} />);

  expect(screen.getByText(/митапов прошло/)).toBeInTheDocument();

  renderWithIntl(Locale.ENGLISH)(
    <CardsCounter variant={MeetupTab.Finished} amount={21} />,
  );

  expect(screen.getByText(/published meetups/)).toBeInTheDocument();
});
