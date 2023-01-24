import { getParticipants, getVotedUsers } from 'api';
import { httpClient } from 'api/httpClient';
import { Meetup, MeetupStatus, NewMeetup } from 'model';

export const getMeetups = async (): Promise<Meetup[]> => {
  const { data: meetups } = await httpClient.get<Meetup[]>('/meetups');

  return meetups;
};

export const getMeetupsByStatus = async (status: MeetupStatus): Promise<Meetup[]> => {
  const { data: meetups } = await httpClient.get<Meetup[]>(`/meetups/status/${status}`);

  return meetups;
};

export const getMeetup = async (id: string): Promise<Meetup> => {
  const { data: meetup } = await httpClient.get<Meetup>(`/meetups/${id}`);
  const votedUsers = await getVotedUsers(id);
  const participants = await getParticipants(id);

  return  {
    ...meetup,
    votedUsers,
    participants
  };
};

export const createMeetup = async (
  newMeetupData: NewMeetup,
): Promise<Meetup> => {
  const { data: createdMeetup } = await httpClient.post<Meetup>('/meetups', {
    data: newMeetupData,
  });

  return createdMeetup;
};

export const updateMeetup = async (
  updatedMeetupData: Meetup,
): Promise<Meetup> => {
  const { data: updatedMeetup } = await httpClient.put<Meetup>('/meetups', updatedMeetupData);

  return updatedMeetup;
};

export const deleteMeetup = async (id: string): Promise<void> => {
  await httpClient.delete(`/meetups/${id}`);
};
