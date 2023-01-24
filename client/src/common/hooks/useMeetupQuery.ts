import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getMeetup } from 'api';
import { setupResponseInterceptor } from 'api/httpClient';
import { Meetup } from 'model';
import { MeetupContext } from 'common/contexts';

type UseMeetupQueryResult = {
  meetup?: Meetup | null;
  isLoading: boolean;
  error: string | null;
}

export function useMeetupQuery(id: string) : UseMeetupQueryResult {
  const meetupStore = useContext(MeetupContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setupResponseInterceptor(navigate);
      
      try {
        meetupStore.setMeetup(await getMeetup(id));
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
  }, [id]);


  return {
    meetup: meetupStore.meetup,
    isLoading,
    error,
  };
}