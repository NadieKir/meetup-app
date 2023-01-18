import axios, { AxiosResponse } from 'axios';

import { API_BASE_URL } from 'common/constants/constants';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // replace with dispatch later
    // console.log(error);
    throw error;
  },
);
