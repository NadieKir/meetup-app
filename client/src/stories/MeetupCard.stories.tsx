import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { MeetupCard } from 'components';
import { MeetupStatus, ShortUser } from 'common/model';
import {
  ConfirmedMeetupWithParticipants,
  TopicWithVotedUsers,
} from 'common/types';

export default {
  title: 'Components/MeetupCard',
  component: MeetupCard,
  decorators: [withRouter],
} as ComponentMeta<typeof MeetupCard>;

const Template: ComponentStory<typeof MeetupCard> = (args) => (
  <div
    style={{
      width: '100%',
      maxWidth: '550px',
      margin: '0 auto',
    }}
  >
    <MeetupCard {...args} />
  </div>
);

const user: ShortUser = {
  id: 'AAA-AAA',
  name: 'Joe',
  surname: 'Jackson',
};

const topic: TopicWithVotedUsers = {
  id: 'AAA-AAA',
  status: MeetupStatus.DRAFT,
  author: user,
  subject: 'EF Core от практикующих',
  modified: new Date().toLocaleString(),
  votedUsers: [],
  excerpt:
    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. ',
};

const meetup: ConfirmedMeetupWithParticipants = {
  id: 'AAA-AAA',
  status: MeetupStatus.CONFIRMED,
  author: user,
  subject: 'EF Core от практикующих',
  modified: new Date().toLocaleString(),
  speakers: [user, user],
  start: '2023-09-19T16:00:00.113Z',
  finish: '2023-09-19T17:30:00.113Z',
  place: '77818 Harber Villages',
  participants: [],
  image: null,
  excerpt:
    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. ',
};

export const MeetupCard_Topic = Template.bind({});

MeetupCard_Topic.args = {
  meetup: topic,
};

export const MeetupCard_ConfirmedMeetup = Template.bind({});

MeetupCard_ConfirmedMeetup.args = {
  meetup: meetup,
};
