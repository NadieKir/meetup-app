import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { addParticipant, addVotedUser, deleteMeetup, deleteParticipant, deleteVotedUser, getMeetup, updateMeetup } from 'api';
import { Meetup, MeetupStatus } from 'model';
import { UserStore } from 'store';

export class MeetupStore {
  meetup: Meetup | undefined;
  userStore: UserStore;
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor(meetupId: string, userStore: UserStore) {
    makeAutoObservable(this);
    this.userStore = userStore;
    this.getMeetup(meetupId);
  }

  setMeetup(newMeetup: Meetup) {
    this.meetup = newMeetup;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  get isUserVoted() {
    if (this.meetup && this.userStore.user) {
      const actedUsers = this.meetup.status === MeetupStatus.CONFIRMED
      ? this.meetup.participants
      : this.meetup.votedUsers;

      return actedUsers!.map((user) => user.id).includes(this.userStore.user.id);
    }  
    return false;
  }

  async getMeetup(id: string) {
    this.setIsLoading(true);

    try {
      this.setMeetup(await getMeetup(id));
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
      const updatedMeetup = await updateMeetup({...this.meetup, votedUsers: updatedVotedUsers});
  
      this.setMeetup(updatedMeetup);
    }
  }

  unsupportMeetup = async () =>  {
    if (this.meetup && this.userStore.shortUser) {
      const updatedVotedUsers = await deleteVotedUser(this.meetup.id, this.userStore.shortUser);
      const updatedMeetup = await updateMeetup({...this.meetup, votedUsers: updatedVotedUsers});
      
      this.setMeetup(updatedMeetup);
    }
  }

  enrollMeetup = async () => {
    if (this.meetup && this.userStore.shortUser) {
      const updatedParticipants = await addParticipant(this.meetup.id, this.userStore.shortUser);
      const updatedMeetup = await updateMeetup({...this.meetup, participants: updatedParticipants});

      this.setMeetup(updatedMeetup);
    }
  }

   disenrollMeetup = async () => {
    if (this.meetup && this.userStore.shortUser) {
      const updatedParticipants = await deleteParticipant(this.meetup.id, this.userStore.shortUser);
      const updatedMeetup = await updateMeetup({...this.meetup, participants: updatedParticipants});

      this.setMeetup(updatedMeetup); 
    }
  }

  approveMeetup = async () =>  {
    if (this.meetup) {
      await updateMeetup({...this.meetup, status: MeetupStatus.REQUEST});
    }
  }

  publishMeetup = async () =>  {
    if (this.meetup) {
      await updateMeetup({...this.meetup, status: MeetupStatus.CONFIRMED});
    }
  }

  deleteMeetup = async () =>  {
    if (this.meetup) {
      await deleteMeetup(this.meetup.id); 
    }
  }
}
