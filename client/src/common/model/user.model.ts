export enum UserRole {
  CHIEF = 'CHIEF',
  EMPLOYEE = 'EMPLOYEE',
  GUEST = 'GUEST',
}

export interface User {
  id: string;
  name: string;
  surname: string;
  post: string;
  roles: UserRole;
  password: string;
}

export type ShortUser = Pick<User, 'id' | 'name' | 'surname'>;

export type AuthoraizedUser = Omit<User, 'password'>;