import { makeAutoObservable } from 'mobx';

import { meetupTabs } from 'components';
import { getUser, logout } from 'api';
import { getMeetupTab } from 'common/helpers';
import { Meetup, ShortUser, User, UserRole } from 'model';

export class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  setUser(newUser: User | null) {
    this.user = newUser;
  }

  get shortUser() {
    if (this.user) {
      const shortUser: ShortUser = { 
        id: this.user.id, 
        name: this.user.name, 
        surname: this.user.surname 
      };
      
      return shortUser;
    }

    return null;
  }

  get isChief() {
    return this.user ? this.user?.roles === UserRole.CHIEF : false;
  }

  get isGuest() {
    return this.user === null;
  }

  get currentUserMeetupTabs() {
    return meetupTabs.filter((tab) =>
      this.user
        ? tab.canAccess.includes(this.user.roles)
        : tab.canAccess.includes(UserRole.GUEST),
    );
  }

  canUserAccessMeetup = (meetup: Meetup): boolean => {
    const meetupTab = getMeetupTab(meetup);
    
    return this.currentUserMeetupTabs.map(tab => tab.link).includes(meetupTab);
  }

  async loadUser() {
    const savedUserId = localStorage.getItem('user');

    if (!savedUserId) return;

    const savedUser = await getUser(savedUserId);
    this.setUser(savedUser);
  }

  async logout() {
    await logout();
    this.setUser(null);
    localStorage.removeItem('user');
  }
}

export default new UserStore();
