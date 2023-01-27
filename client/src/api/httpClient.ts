import axios from 'axios';

import { API_BASE_URL } from 'common/constants';
import { history } from 'common/router';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
      if (error.response?.status === 404) {
        history.replace("/not-found");
      } else {
        return Promise.reject(error);
      }
    }
)