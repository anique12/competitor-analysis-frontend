import axios, { AxiosError, HttpStatusCode } from 'axios';

const AXIOS_ERROR_CODES = {
  ERR_NETWORK: 'Oops! Something went wrong.',
};

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

API.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error: AxiosError) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.BadRequest) {
        const { result }: any = error.response.data;
        if (!result) {
          return Promise.reject(error);
        }
        if (result.response.message) {
          return Promise.reject(result.response.message[0]);
        }
      } else if (error.response.status === HttpStatusCode.Unauthorized) {
        if ((error.response.data as any).detail === 'Invalid token.') {
          const lang = document.location.pathname.split('/')[1];
          localStorage.clear();
          history.back();
          window.location.replace(`${window.location.origin}/login`);
        }
      }
    }
    return Promise.reject(error);
  },
);
