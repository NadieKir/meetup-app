import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { deleteNewsArticle, getNewsArticle, updateNewsArticle } from 'api';
import { News, NewsFormData } from 'common/model';

export class NewsStore {
  newsArticle: News | undefined;
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor(newsId: string) {
    makeAutoObservable(this);
    this.getNews(newsId);
  }

  setNewsArticle(newNews: News | undefined) {
    this.newsArticle = newNews;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  getNews = async (id: string) => {
    this.setIsLoading(true);

    try {
      this.setNewsArticle(await getNewsArticle(id));
    }
    catch (error) {
      this.setError(error as AxiosError);
    } 
    finally {
      this.setIsLoading(false);
    }
  }

  updateNews = async (id: string, newData: NewsFormData) => {
    try {
      const news = await updateNewsArticle(id, newData);
      this.setNewsArticle(news);
    }
    catch (error) {
      this.setError(error as AxiosError);
    } 
  }

  deleteNews = async (id: string) => {
    await deleteNewsArticle(id);
  }
}
