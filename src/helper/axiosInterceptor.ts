import axios from 'axios';
import {getNewAuthToken, getToken} from './auth';
import {AUTH_TOKEN_KEY} from '../constants/keys';
import useTokenHandler from '../hooks/useTokenHandler';
import {logoutUser} from './userApi/api';

const instance = axios.create({
  baseURL: 'http://192.168.1.3:4000/api/v1',
});

let cancelTokenSource = axios.CancelToken.source();

const setupInterceptors = handleRefreshTokenExpired => {
  instance.interceptors.request.use(
    async config => {
      const token = await getToken();
      if (token && token[AUTH_TOKEN_KEY]) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.cancelToken = cancelTokenSource.token; // Attach the cancel token to the request
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const isAccessTokenExpired = error.response.data.message.includes(
          'Access Token has expired',
        );
        const isRefreshTokenExpired = error.response.data.message.includes(
          'Refresh Token has expired',
        );
        if (isAccessTokenExpired) {
          try {
            const token = await getNewAuthToken();
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        if (isRefreshTokenExpired) {
          cancelTokenSource.cancel('Refresh Token has expired'); // Cancel all ongoing requests
          cancelTokenSource = axios.CancelToken.source(); // Reset the cancel token source

          // Call the hook function to handle the refresh token expiration
          await handleRefreshTokenExpired();

          return Promise.reject(new Error('Refresh Token has expired'));
        }
      }

      return Promise.reject(error.response ? error.response.data : error);
    },
  );
};

export {instance, setupInterceptors};
