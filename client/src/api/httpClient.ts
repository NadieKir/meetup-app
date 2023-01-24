import axios from 'axios';

import { API_BASE_URL } from 'common/constants/constants';
import { NavigateFunction } from 'react-router-dom';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

export const setupResponseInterceptor = (navigate: NavigateFunction) => {
  httpClient.interceptors.response.use(
      (response) => {
          return response
      },
      (error) => {
          if (error.response.status === 404) {
              navigate('/not-found')
          } else {
            return Promise.reject(error);
          }
      }
  )
}
