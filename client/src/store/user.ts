import { makeAutoObservable } from 'mobx';

import { getUser, logout } from 'api';
import { ShortUser, User, UserRole } from 'model';

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
    return this.user ? this.user?.roles === UserRole.CHIEF : null;
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
