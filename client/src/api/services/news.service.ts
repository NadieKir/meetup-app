import { httpClient } from 'api/httpClient';
import { NewsFormData, News } from 'common/model';

export const getNews = async (): Promise<News[]> => {
  const { data: articles } = await httpClient.get<News[]>('/news');
  return articles;
};

export const getNewsArticle = async (id: string): Promise<News> => {
  const { data: article } = await httpClient.get<News>(`/news/${id}`);
  return article;
};

export const createNewsArticle = async (
  newArticleData: NewsFormData,
): Promise<News> => {
  const { data: createdArticle } = await httpClient.post<News>('/news', newArticleData);
  return createdArticle;
};

export const updateNewsArticle = async (
  id: string,
  updatedArticleData: NewsFormData,
): Promise<News> => {
  const { data: updatedArticle } = await httpClient.put<News>(`/news/${id}`, updatedArticleData);
  return updatedArticle;
};

export const deleteNewsArticle = async (id: string): Promise<void> => {
  await httpClient.delete(`/news/${id}`);
};
