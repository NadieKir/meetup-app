import { makeAutoObservable } from 'mobx';

import { ShortUser, User, Meetup, MeetupStatus } from 'model';
import { addParticipant, addVotedUser, deleteMeetup, deleteParticipant, deleteVotedUser, updateMeetup } from 'api';

export class MeetupStore {
  meetup: Meetup | null = null;
  meetups: Meetup[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setMeetup(newMeetup: Meetup | null) {
    this.meetup = newMeetup;
  }

  setMeetups(newMeetups: Meetup[]) {
    this.meetups = newMeetups;
  }

  async supportMeetup(meetup: Meetup, user: User) {
    const shortUser: ShortUser = {id: user.id, name: user.name, surname: user.surname};
    const updatedVotedUsers = await addVotedUser(meetup.id, shortUser);
    const updatedMeetup = await updateMeetup({...meetup, votedUsers: updatedVotedUsers});

    this.setMeetup(updatedMeetup);
  }

  async unsupportMeetup(meetup: Meetup, user: User) {
    const shortUser: ShortUser = {id: user.id, name: user.name, surname: user.surname};
    const updatedVotedUsers = await deleteVotedUser(meetup.id, shortUser);
    const updatedMeetup = await updateMeetup({...meetup, votedUsers: updatedVotedUsers});
    
    this.setMeetup(updatedMeetup);
  }

  async enrollMeetup(meetup: Meetup, user: User) {
    const shortUser: ShortUser = {id: user.id, name: user.name, surname: user.surname};
    const updatedParticipants = await addParticipant(meetup.id, shortUser);
    const updatedMeetup = await updateMeetup({...meetup, participants: updatedParticipants});

    this.setMeetup(updatedMeetup);
  }

  async disenrollMeetup(meetup: Meetup, user: User) {
    const shortUser: ShortUser = {id: user.id, name: user.name, surname: user.surname};
    const updatedParticipants = await deleteParticipant(meetup.id, shortUser);
    const updatedMeetup = await updateMeetup({...meetup, participants: updatedParticipants});

    this.setMeetup(updatedMeetup);
  }

  async approveMeetup(meetup: Meetup) {
    await updateMeetup({...meetup, status: MeetupStatus.REQUEST});
  }

  async publishMeetup(meetup: Meetup) {
    await updateMeetup({...meetup, status: MeetupStatus.CONFIRMED});
  }

  async deleteMeetup(id: string) {
    await deleteMeetup(id);
  }
}

export default new MeetupStore();
