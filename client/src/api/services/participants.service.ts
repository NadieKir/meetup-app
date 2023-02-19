import { httpClient } from 'api/httpClient';
import { ShortUser } from "common/model";

export const getParticipants = async (id: string): Promise<ShortUser[] | undefined> => {
  const { data: participants } = await httpClient.get<ShortUser[] | undefined>(`/meetups/${id}/participants`);

  return participants;
};

export const addParticipant = async (
  id: string,
  user: ShortUser
): Promise<ShortUser[]> => {
  const { data: participants } = await httpClient.post<ShortUser[]>(`/meetups/${id}/participants`, user);

  return participants;
};

export const deleteParticipant = async (  
  id: string,
  user: ShortUser
): Promise<ShortUser[]> => {
  const { data: participants } = await httpClient.delete(`/meetups/${id}/participants`, {data: user});

  return participants;
};

