import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { getNews } from 'api';
import { News } from 'model';

export class NewsListStore {
  newsArticles: News[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor() {
    makeAutoObservable(this);
    this.getNewsList();
  }

  setNewsArticles(newNewsList: News[]) {
    this.newsArticles = newNewsList;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  async getNewsList() {
    this.setIsLoading(true);

    try {
      this.setNewsArticles(await getNews());
    }
    catch (error) {
      this.setError(error as AxiosError);
    } 
    finally {
      this.setIsLoading(false);
    }
  }
}

export default new NewsListStore();
