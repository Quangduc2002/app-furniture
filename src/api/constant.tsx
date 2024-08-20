/* eslint-disable indent */
import axios from 'axios';

export const PREFIX_API = process.env.APP_API_URL;
const instance = axios.create({
  baseURL: PREFIX_API,
});

instance.defaults.withCredentials = false;
instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.jwt}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },

  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;
    switch (status) {
      case 401: {
        return error && error.response.data;
      }

      case 403: {
        return error && error.response.data;
      }

      case 400: {
        return Promise.reject(error);
      }

      case 404: {
        return Promise.reject(error);
      }

      case 409: {
        return Promise.reject(error);
      }

      case 422: {
        return Promise.reject(error);
      }

      default: {
        return Promise.reject(error);
      }
    }
  },
);

export default instance;
