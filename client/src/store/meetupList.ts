import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { getMeetups } from 'api';
import { Meetup, MeetupStatus } from 'model';
import { MeetupCardVariant } from 'components';

export class MeetupListStore {
  meetups: Meetup[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor() {
    makeAutoObservable(this);
    this.getMeetups();
  }

  setMeetups(newMeetups: Meetup[]) {
    this.meetups = newMeetups;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  get topicMeetups() {
    return this.meetups
    .filter(meetup => meetup.status === MeetupStatus.DRAFT)
    .sort((a, b) => Date.parse(b.modified) - Date.parse(a.modified))
  }

  get onModerationMeetups() {
    return this.meetups
    .filter(meetup => meetup.status === MeetupStatus.REQUEST)
    .sort((a, b) => Date.parse(b.modified) - Date.parse(a.modified))
  }

  get upcomingMeetups() {
    return this.meetups
    .filter((meetup) => !meetup.isOver && meetup.status === MeetupStatus.CONFIRMED)
    .sort((a, b) => Date.parse(a.start!) - Date.parse(b.start!));
  }

  get finishedMeetups() {
    return this.meetups
    .filter((meetup) => meetup.isOver && meetup.status === MeetupStatus.CONFIRMED)
    .sort((a, b) => Date.parse(a.start!) - Date.parse(b.start!));
  }

  getTabMeetups = (variant: MeetupCardVariant) => {
    switch (variant) {
      case MeetupCardVariant.Topic:
        return this.topicMeetups;
      case MeetupCardVariant.OnModeration:
        return this.onModerationMeetups;
      case MeetupCardVariant.Upcoming:
        return this.upcomingMeetups;
      case MeetupCardVariant.Finished:
        return this.finishedMeetups;
      default:
        throw Error;
    } 
  }

  async getMeetups() {
    this.setIsLoading(true);

    try {
      this.setMeetups(await getMeetups());
    }
    catch (error) {
      this.setError(error as AxiosError);
      throw this.error;
    } 
    finally {
      this.setIsLoading(false);
    }
  }
}

export default new MeetupListStore();
