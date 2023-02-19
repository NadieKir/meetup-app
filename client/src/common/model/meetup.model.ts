import { ShortUser } from 'common/model';

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


