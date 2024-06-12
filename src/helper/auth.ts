import {instance as axios} from './axiosInterceptor';
import {AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY} from '../constants/keys';
import asyncStorage from './asyncStorage';
import useAuth from '../hooks/useAuth';
import {logoutUser} from './userApi/api';
import {useDispatch, useStore} from 'react-redux';
import {navigationRef} from '../hooks/useNavigation';
import {LOGIN, ON_BOARD} from '../constants/screenName';
import {resetUser} from '../slices/userSlice';

interface setTokenProps {
  token: string;
  refreshToken: string;
}
const {getItem, setItem} = asyncStorage();
export const getToken = async () => {
  try {
    const token = await getItem({
      keyName: 'token',
    });
    return token;
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

export const setToken = async ({token, refreshToken}: setTokenProps) => {
  try {
    await setItem({
      keyName: 'token',
      value: {
        [AUTH_TOKEN_KEY]: token,
        [REFRESH_TOKEN_KEY]: refreshToken,
      },
    });
  } catch (err) {
    return null;
  }
};

export const getNewAuthToken = async () => {
  const tokens = await getToken();
  if (!tokens[REFRESH_TOKEN_KEY]) {
    throw new Error('No refresh token available');
  }
  try {
    const {
      data: {data},
    } = await axios.post('/users/refresh-token', {
      oldRefreshToken: tokens[REFRESH_TOKEN_KEY],
    });
    const {accessToken: token, refreshToken} = data;
    await setToken({token, refreshToken});

    return data?.accessToken;
  } catch (error) {
    Promise.reject(error);
  }
};
