import { screen } from '@testing-library/react';

import { MeetupCard } from './MeetupCard';
import { renderWithIntl } from 'common/utils';
import { TopicWithVotedUsers } from 'common/types';
import { ConfirmedMeetup, MeetupStatus } from 'common/model';

const mockTopic: TopicWithVotedUsers = {
  id: 'd297c006-2497-406e-b98a-9651110c7e36',
  modified: '2022-11-09T16:23:39.447Z',
  author: {
    id: 'uuu-aaa',
    name: 'employee',
    surname: 'Gerlach',
  },
  subject: 'Versatile explicit task-force',
  excerpt:
    'Adipisci excepturi unde aut est. Nostrum repudiandae quibusdam nostrum sed ipsum. Qui deserunt dolor quasi et tempore. Et molestias soluta est dolorem deleniti.',
  status: MeetupStatus.DRAFT,
  votedUsers: [],
};

const mockMeetup: ConfirmedMeetup = {
  id: '4e718e40-d344-46d4-9a69-70431b4e0c3c',
  modified: '2023-03-14T13:24:24.158Z',
  start: '2023-09-09T11:37:23.990Z',
  finish: '2023-09-09T18:37:23.990Z',
  author: {
    id: 'uuu-aaa',
    name: 'employee',
    surname: 'Gerlach',
  },
  speakers: [
    {
      id: 'uuu-aaa',
      name: 'employee',
      surname: 'Gerlach',
    },
  ],
  subject: 'Virtual composite support',
  excerpt:
    'Fugit fuga quia perspiciatis ut quis rerum ducimus ut est. Alias modi enim molestiae repellendus reprehenderit eum maiores. Numquam aliquam magnam harum voluptatem dolore. Eos voluptatem ipsa sit totam laudantium. Libero saepe omnis. Ea harum quisquam consequatur sed quia.',
  place: '7954 Jaden Mills',
  status: MeetupStatus.CONFIRMED,
  image: null,
};

it('Renders topic variant of card', () => {
  renderWithIntl()(<MeetupCard meetup={mockTopic} />);

  expect(
    screen.queryByText((content, element) =>
      element!.classList.contains('appointment'),
    ),
  ).not.toBeInTheDocument();
});

it('Renders meetup variant of card', () => {
  renderWithIntl()(<MeetupCard meetup={mockMeetup} />);

  expect(
    screen.getByText((content, element) =>
      element!.classList.contains('appointment'),
    ),
  ).toBeInTheDocument();
});

it('Renders custom russian day of week spelling', () => {
  renderWithIntl()(<MeetupCard meetup={mockMeetup} />);

  expect(screen.getByText(/Субб./)).toBeInTheDocument();
});
