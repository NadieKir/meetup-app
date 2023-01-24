import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getNewsArticle } from 'api';
import { NewsContext } from 'common/contexts';
import { News } from 'model';
import { setupResponseInterceptor } from 'api/httpClient';

interface UseNewsArticleQueryResult {
  newsArticle?: News | null;
  isLoading: boolean;
  error: string | null;
}

export function useNewsArticleQuery(id: string) : UseNewsArticleQueryResult {
  const newsStore = useContext(NewsContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setupResponseInterceptor(navigate);

      try {
        newsStore.setNewsArticle(await getNewsArticle(id));
      }
      catch(error) {
        const status = (error as AxiosError).response?.status;

        switch(status){
          case 404:
            setError('404');
            newsStore.setNewsArticle(null);
            break;
          default:
            setError('Что-то пошло не так!');
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);


  return {
    newsArticle: newsStore.newsArticle,
    error,
    isLoading,
  };
}