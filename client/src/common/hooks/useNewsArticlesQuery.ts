import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getNews } from 'api';
import { setupResponseInterceptor } from 'api/httpClient';
import { NewsContext } from 'common/contexts';
import { News } from 'model';

interface UseNewsArticlesQueryResult {
  newsArticles?: News[];
  isLoading: boolean;
  error: string | null;
}

export function useNewsArticlesQuery() : UseNewsArticlesQueryResult {
  const newsStore = useContext(NewsContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setupResponseInterceptor(navigate);

      try {
        newsStore.setNewsArticles(await getNews())
      }
      catch (error) {
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
  }, []);


  return {
    newsArticles: newsStore.newsArticles,
    error,
    isLoading,
  };
}