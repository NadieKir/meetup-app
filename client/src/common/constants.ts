import { Locale } from "i18n";

export const API_BASE_URL = 'http://localhost:8080/api';

export type Language = { name: string; code: Locale };

export const LANGUAGES: Language[] = [
  { name: 'English', code: Locale.ENGLISH },
  { name: 'Русский', code: Locale.RUSSIAN },
];

export const FORMATTED_WEEKDAYS_RU = {
  'пн': 'Пон.',
  'вт': 'Вт.',
  'ср': 'Ср.',
  'чт': 'Четв.',
  'пт': 'Пятн.',
  'сб': 'Субб.',
  'вс': 'Воскр.',
};
