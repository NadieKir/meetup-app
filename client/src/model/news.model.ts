export interface News {
  id: string;
  publicationDate: string; // Date string
  title: string;
  content: string;
  image: string | null;
}

export type NewsFormData = Omit<News, 'id' | 'publicationDate'>;

