import { isInThePast } from 'common/helpers';
import { ShortUser } from 'model';

export enum MeetupStatus {
  DRAFT = 'DRAFT',
  REQUEST = 'REQUEST',
  CONFIRMED = 'CONFIRMED',
}

interface MeetupBase {
  id: string;
  modified: string; // DateTime string
  author: ShortUser;
  subject: string;
  excerpt: string;
}

export interface Topic extends MeetupBase {
  status: MeetupStatus.REQUEST | MeetupStatus.DRAFT;
}

export interface ConfirmedMeetup extends MeetupBase {
  status: MeetupStatus.CONFIRMED,
  start: string; // DateTime string
  finish: string; // DateTime string
  speakers: ShortUser[];
  place: string;
  image: string | null;
}

export const isTopic = (meetup: Meetup): meetup is Topic => {
  return [MeetupStatus.REQUEST, MeetupStatus.DRAFT].includes((meetup as Topic).status);
}

export const isConfirmedMeetup = (meetup: Meetup): meetup is ConfirmedMeetup => {
  return (meetup as ConfirmedMeetup).status === MeetupStatus.CONFIRMED;
}

export const isUpcomingMeetup = (meetup: Meetup): meetup is ConfirmedMeetup => {
  return isConfirmedMeetup(meetup) && !isInThePast(meetup.finish);
}

export const isFinishedMeetup = (meetup: Meetup): meetup is ConfirmedMeetup => {
  return isConfirmedMeetup(meetup) && isInThePast(meetup.finish);
}

export type TopicFormData = Omit<Topic, 'id' | 'modified' | 'status'>;
export type MeetupFormData = Omit<ConfirmedMeetup, 'id' | 'modified' | 'status' | 'author'>;

export type TopicWithVotedUsers = Topic & { votedUsers: ShortUser[] };
export type ConfirmedMeetupWithParticipants = ConfirmedMeetup & { participants: ShortUser[] };

export type Meetup = Topic | ConfirmedMeetup;
export type MeetupWithUsers = TopicWithVotedUsers | ConfirmedMeetupWithParticipants;
