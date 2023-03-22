import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { addParticipant, addVotedUser, deleteMeetup, deleteParticipant, deleteVotedUser, getMeetup, updateMeetup, getParticipants, getVotedUsers } from 'api';
import { MeetupStatus, ShortUser } from 'common/model';
import { UserStore } from 'stores';
import { getMeetupTab, isConfirmedMeetup } from 'common/helpers';
import { Meetup, MeetupFormData } from 'common/types';

export class MeetupStore {
  meetup: Meetup | undefined;
  votedUsers: ShortUser[] | undefined;
  participants: ShortUser[] | undefined;
  userStore: UserStore;
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor(meetupId: string, userStore: UserStore) {
    makeAutoObservable(this);
    this.userStore = userStore;
    this.getFullMeetupData(meetupId);
  }

  setMeetup(newMeetup: Meetup) {
    this.meetup = newMeetup;
  }

  setVotedUsers(newVotedUsers: ShortUser[]) {
    this.votedUsers = newVotedUsers;
  }

  setParticipants(newParticipants: ShortUser[] | undefined) {
    this.participants = newParticipants;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  get isUserVoted() {
    if (this.meetup && this.userStore.user) {
      const actedUsers = isConfirmedMeetup(this.meetup)
      ? this.participants
      : this.votedUsers;

      return actedUsers ? actedUsers.map((user) => user.id).includes(this.userStore.user.id) : false;
    }  
    return false;
  }

  get isUserAuthor() {
    return this.meetup && this.userStore.user 
      ? this.userStore.user.id === this.meetup.author.id 
      : false;
  }

  get canUserAccessMeetup() {
    if (this.meetup) {
      const meetupTab = getMeetupTab(this.meetup);
    
      return this.userStore.currentUserMeetupTabs.map(tab => tab.link).includes(meetupTab);
    }

    return false;
  }

  async getFullMeetupData(id: string) {
    this.setIsLoading(true);
    
    try {
      this.setMeetup(await getMeetup(id));
      this.setVotedUsers(await getVotedUsers(id)); 
      this.setParticipants(await getParticipants(id));
    }
    catch (error) {
      this.setError(error as AxiosError);
    } 
    finally {
      this.setIsLoading(false);
    }
  }

  supportMeetup = async () =>  {
    if (this.meetup && this.userStore.shortUser) {
      const updatedVotedUsers = await addVotedUser(this.meetup.id, this.userStore.shortUser);
      
      this.setVotedUsers(updatedVotedUsers);
    }
  }

  unsupportMeetup = async () =>  {
    if (this.meetup && this.userStore.shortUser) {
      const updatedVotedUsers = await deleteVotedUser(this.meetup.id, this.userStore.shortUser);
      
      this.setVotedUsers(updatedVotedUsers);
    }
  }

  enrollMeetup = async () => {
    if (this.meetup && this.userStore.shortUser) {
      const updatedParticipants = await addParticipant(this.meetup.id, this.userStore.shortUser);
      
      this.setParticipants(updatedParticipants);
    }
  }

   disenrollMeetup = async () => {
    if (this.meetup && this.userStore.shortUser) {
      const updatedParticipants = await deleteParticipant(this.meetup.id, this.userStore.shortUser);
      
      this.setParticipants(updatedParticipants);
    }
  }

  approveMeetup = async () =>  {
    if (this.meetup) {
      await updateMeetup({...this.meetup, status: MeetupStatus.REQUEST});
    }
  }

  publishMeetup = async (meetupData: MeetupFormData) =>  {
    if (this.meetup) {
      await updateMeetup({...this.meetup, ...meetupData, status: MeetupStatus.CONFIRMED});
    }
  }

  deleteMeetup = async () =>  {
    if (this.meetup) {
      await deleteMeetup(this.meetup.id); 
    }
  }
}
