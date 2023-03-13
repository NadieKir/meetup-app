import { screen } from '@testing-library/react';

import { SpeakersCount } from './SpeakersCount';
import { renderWithIntl } from 'common/utils';
import { getInitials } from 'common/helpers';

const mockSomeSpeakers = [
  {
    id: 'e4e5f24f-d526-4e3e-ad3a-15b9cf1fbfe6',
    name: 'Haley',
    surname: 'Keeling',
  },
  {
    id: '926e6e58-380b-4181-b4f4-f08b1b2475a2',
    name: 'Durward',
    surname: 'West',
  },
  {
    id: 'aacf3064-a0d6-405c-9489-e04eefc92211',
    name: 'Jevon',
    surname: 'Schulist',
  },
];

const mockOneSpeaker = mockSomeSpeakers.slice(0, 1);

it('Renders one speaker preview and counter with a number of rest speakers if more than 1 speaker provided', () => {
  renderWithIntl()(<SpeakersCount speakers={mockSomeSpeakers} />);

  expect(
    screen.getByText(
      getInitials(mockSomeSpeakers[0].name, mockSomeSpeakers[0].surname),
    ),
  ).toBeInTheDocument();

  expect(
    screen.getByText((content, element) =>
      element!.classList.contains('restSpeakers'),
    ),
  ).toBeInTheDocument();
});

it('Does not render a counter with rest speakers when 1 speaker provided', () => {
  renderWithIntl()(<SpeakersCount speakers={mockOneSpeaker} />);

  expect(
    screen.getByText(
      getInitials(mockOneSpeaker[0].name, mockOneSpeaker[0].surname),
    ),
  ).toBeInTheDocument();

  expect(
    screen.queryByText((content, element) =>
      element!.classList.contains('restSpeakers'),
    ),
  ).not.toBeInTheDocument();
});
