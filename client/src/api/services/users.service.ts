import { httpClient } from 'api/httpClient';
import { ShortUser, User } from 'common/model';

export const getShortUsers = async (): Promise<ShortUser[]> => {
  const { data: users } = await httpClient.get<User[]>('/users');
  return users.map(user => ({id: user.id, name: user.name, surname: user.surname}));
};

export const getUser = async (id: string): Promise<User> => {
  const { data: user } = await httpClient.get<User>(`/users/${id}`);
  return user;
};
