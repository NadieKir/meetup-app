import { UserRole } from "common/model";

export enum MeetupTab {
  Topics = 'topics',
  OnModeration = 'moderation',
  Upcoming = 'upcoming',
  Finished = 'finished',
}

export type MeetupTabDescriptor = {
  label: string | JSX.Element;
  link: MeetupTab;
  component: JSX.Element;
  canAccess: UserRole[];
};

