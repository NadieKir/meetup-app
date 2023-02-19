import { ConfirmedMeetup, ShortUser, Topic } from "common/model";

export type TopicFormData = Omit<Topic, 'id' | 'modified' | 'status'>;
export type MeetupFormData = Omit<ConfirmedMeetup, 'id' | 'modified' | 'status' | 'author'>;

export type TopicWithVotedUsers = Topic & { votedUsers: ShortUser[] };
export type ConfirmedMeetupWithParticipants = ConfirmedMeetup & { participants: ShortUser[] };

export type Meetup = Topic | ConfirmedMeetup;
export type MeetupWithUsers = TopicWithVotedUsers | ConfirmedMeetupWithParticipants;

export type RequiredMeetupFields = Pick<
  MeetupFormData,
  'start' | 'finish' | 'speakers' | 'subject' | 'excerpt'
>;

export type RequiredMeetupFieldsFormData = Pick<
  MeetupFormData,
  'subject' | 'excerpt' | 'speakers'
> & {
  start: Date;
  finish: Date;
};

export type AdditionalMeetupFields = Omit<
  MeetupFormData,
  keyof RequiredMeetupFields
>;