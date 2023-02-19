import { httpClient } from 'api/httpClient';
import { ShortUser, AllVotedUsers } from "common/model";

export const getAllVotedUsers = async (): Promise<AllVotedUsers> => {
  const { data: votedUsers } = await httpClient.get<AllVotedUsers>(`/votedusers`);

  return votedUsers;
};

export const getVotedUsers = async (id: string): Promise<ShortUser[]> => {
  const { data: votedUsers } = await httpClient.get<ShortUser[]>(`/meetups/${id}/votedusers`);

  return votedUsers;
};

export const addVotedUser = async (
  id: string,
  user: ShortUser
): Promise<ShortUser[]> => {
  const { data: votedUsers } = await httpClient.post<ShortUser[]>(`/meetups/${id}/votedusers`, user);

  return votedUsers;
};

export const deleteVotedUser = async (  
  id: string,
  user: ShortUser
): Promise<ShortUser[]> => {
  const { data: votedUsers } = await httpClient.delete(`/meetups/${id}/votedusers`, {data: user});

  return votedUsers;
};

