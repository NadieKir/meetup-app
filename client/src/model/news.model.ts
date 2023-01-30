import { FileWithUrl } from "types";

export interface News {
  id: string;
  publicationDate: string; // Date string
  title: string;
  content: string;
  image: string | null;
}

export type NewNews = Omit<News, 'id' | 'publicationDate' | 'image'> & {
  image: FileWithUrl | null;
};

export type NewNewsPayload = Omit<NewNews, 'image'> & {
  image: string | null; 
};

