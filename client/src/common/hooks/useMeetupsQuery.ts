import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getMeetupsByStatus } from 'api';
import { setupResponseInterceptor } from 'api/httpClient';
import { Meetup, MeetupStatus } from 'model';
import { MeetupContext } from 'common/contexts';
import { MeetupCardVariant } from 'components';

type UseMeetupsQueryResult = {
  meetups?: Meetup[];
  isLoading: boolean;
  error: string | null;
}

export function useMeetupsQuery(variant: MeetupCardVariant) : UseMeetupsQueryResult {
  const meetupStore = useContext(MeetupContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  
  const getStatusByVariant = () => {
    switch (variant) {
      case MeetupCardVariant.Topic:
        return MeetupStatus.DRAFT;
      case MeetupCardVariant.OnModeration:
        return MeetupStatus.REQUEST;
      case MeetupCardVariant.Upcoming:
      case MeetupCardVariant.Finished:
        return MeetupStatus.CONFIRMED;
    }
  };
  
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setupResponseInterceptor(navigate);
      
      try {
        const tabMeetups = await getMeetupsByStatus(getStatusByVariant());

        switch (variant) {
          case MeetupCardVariant.Topic:
          case MeetupCardVariant.OnModeration:
            meetupStore.setMeetups(
              tabMeetups.sort(
                (a, b) => Date.parse(b.modified) - Date.parse(a.modified),
              ),
            );
            break;
          case MeetupCardVariant.Upcoming:
          case MeetupCardVariant.Finished:
            meetupStore.setMeetups(
              tabMeetups
                .filter(
                  (meetup) =>
                    meetup.isOver === (variant === MeetupCardVariant.Finished),
                )
                .sort((a, b) => Date.parse(a.start!) - Date.parse(b.start!)),
            );
            break;
        }
      }
      catch(e) {
        const error = e as AxiosError;
        const status = error.response?.status;

        switch(status){
          case 404:
            setError('404');
            meetupStore.setMeetup(null);
            break;
          default:
            setError('Что-то пошло не так!');
        }
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [variant]);


  return {
    meetups: meetupStore.meetups,
    isLoading,
    error,
  };
}