import axios, { AxiosError } from 'axios';

import type { ApiErrorResponse } from '@/types/api';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 208) {
      const apiError: AxiosError<ApiErrorResponse> = new AxiosError(
        response.data.message,
        undefined,
        response.config,
        response.request,
        {
          data: response.data,
          status: 208,
          statusText: response.statusText,
          headers: response.headers,
          config: response.config,
        }
      );
      return Promise.reject(apiError);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
