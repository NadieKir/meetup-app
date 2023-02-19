import { httpClient } from 'api/httpClient';
import { AuthoraizedUser, Credentials, User } from 'common/model';

export const login = async (credentials: Credentials): Promise<User> => {
  const { data: response } = await httpClient.post('/login', credentials);
  return response.user;
};

export const checkLogin = async (): Promise<AuthoraizedUser> => {
  const { data: response } = await httpClient.get('/login');
  return response.user;
};

export const logout = async (): Promise<void> => {
  await httpClient.get('/logout');
};
