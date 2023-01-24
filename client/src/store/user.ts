import { makeAutoObservable } from 'mobx';

import { getUser, logout } from 'api';
import { User } from 'model';

export class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  async loadUser() {
    const savedUserId = localStorage.getItem('user');

    if (!savedUserId) return;

    const savedUser = await getUser(savedUserId);
    this.setUser(savedUser);
  }

  setUser(newUser: User | null) {
    this.user = newUser;
  }

  async logout() {
    await logout();
    this.setUser(null);
    localStorage.removeItem('user');
  }
}

export default new UserStore();
