import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { getMeetups, getAllVotedUsers } from 'api';
import { MeetupStatus, AllVotedUsers } from 'common/model';
import { isConfirmedMeetup, isInThePast } from 'common/helpers';
import { Meetup, MeetupTab, TopicWithVotedUsers } from 'common/types';

export class MeetupListStore {
  meetups: Meetup[] = [];
  votedUsers: AllVotedUsers = {};
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor() {
    makeAutoObservable(this);

    this.getMeetups();
    this.getAllVotedUsers();
  }

  setMeetups(newMeetups: Meetup[]) {
    this.meetups = newMeetups;
  }

  setVotedUsers(newVotedUsers: AllVotedUsers) {
    this.votedUsers = newVotedUsers;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  get topicMeetups() {
    return this.getSortedTopics(MeetupStatus.DRAFT);
  }

  get onModerationMeetups() {
    return this.getSortedTopics(MeetupStatus.REQUEST);
  }

  get upcomingMeetups() {
    return this.getSortedMeetups(false);
  }

  get finishedMeetups() {
    return this.getSortedMeetups(true);
  }

  getSortedTopics = (status: MeetupStatus.DRAFT | MeetupStatus.REQUEST) => {
    return this.meetups
    .filter(meetup => meetup.status === status)
    .map<TopicWithVotedUsers>(meetup => ({...meetup, votedUsers: this.votedUsers[meetup.id] || []}) as TopicWithVotedUsers)
    .sort((a, b) => Date.parse(b.modified) - Date.parse(a.modified))
  }

  getSortedMeetups = (isFinished: boolean) => {
    return this.meetups
    .filter(isConfirmedMeetup)
    .filter(meetup => isInThePast(meetup.start) === isFinished)
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  }

  getTabMeetups = (variant: MeetupTab) => {
    switch (variant) {
      case MeetupTab.Topics:
        return this.topicMeetups;
      case MeetupTab.OnModeration:
        return this.onModerationMeetups;
      case MeetupTab.Upcoming:
        return this.upcomingMeetups;
      case MeetupTab.Finished:
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

  async getAllVotedUsers() {
    this.setIsLoading(true);

    try {
      this.setVotedUsers(await getAllVotedUsers());
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
