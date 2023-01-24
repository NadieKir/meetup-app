import { makeAutoObservable } from 'mobx';

import { deleteNewsArticle } from 'api';
import { News } from 'model';

export class NewsStore {
  newsArticle: News | null = null;
  newsArticles: News[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  setNewsArticle(newNews: News | null) {
    this.newsArticle = newNews;
  }

  setNewsArticles(newNews: News[]) {
    this.newsArticles = newNews;
  }

  async deleteNews(id: string) {
    await deleteNewsArticle(id);
  }
}

export default new NewsStore();
