import { httpClient } from 'api/httpClient';
import { Meetup, Topic, ConfirmedMeetup, TopicFormData } from 'model';

export const getMeetups = async (): Promise<Meetup[]> => {
  const { data: meetups } = await httpClient.get<Meetup[]>('/meetups');

  return meetups;
};

export const getMeetup = async (id: string): Promise<Meetup> => {
  const { data: meetup } = await httpClient.get<Meetup>(`/meetups/${id}`);

  return meetup;
};

export const createMeetup = async (
  newMeetupData: TopicFormData,
): Promise<Topic> => {
  const { data: createdMeetup } = await httpClient.post<Topic>('/meetups', {
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

export const approveMeetup = async (
  updatedMeetupData: ConfirmedMeetup,
): Promise<ConfirmedMeetup> => {
  const { data: updatedMeetup } = await httpClient.put<ConfirmedMeetup>('/meetups/approve', updatedMeetupData);

  return updatedMeetup;
};


export const deleteMeetup = async (id: string): Promise<void> => {
  await httpClient.delete(`/meetups/${id}`);
};
