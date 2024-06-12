import {AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY} from '../constants/keys';
import asyncStorage from '../helper/asyncStorage';
import {setToken} from '../helper/auth';
import {User} from '../helper/types';
import {logoutUser, changePassword, editProfile} from '../helper/userApi/api';
import {
  resetUser,
  setAuthenticatedUser,
  setUpdatedUser,
} from '../slices/userSlice';
import {formatData} from '../utils/asyncStorageDataFormatter';
import useDispatch from './useTypeDispatch';
import useTypeSelector from './useTypeSelector';

interface setUserProps {
  user: any;
  refreshToken: string;
  accessToken: string;
}
interface editProfileTypes {
  file: FormData;
}
const useAuth = () => {
  const dispatch = useDispatch();
  const storage = asyncStorage();
  const setUser = async ({user, refreshToken, accessToken}: setUserProps) => {
    const formattedUser: User = formatData(user);
    dispatch(
      setAuthenticatedUser({
        user: formattedUser,
        refreshToken,
        token: accessToken,
      }),
    );

    await setToken({token: accessToken, refreshToken});
    await storage.setItem({
      keyName: 'user',
      value: formattedUser,
    });
    await storage.setItem({
      keyName: 'userLoginTime',
      value: new Date() + '',
    });
  };

  const setAuthenticatedUserFromStorage = async () => {
    try {
      const getUserFromStorage = await storage.getItem({keyName: 'user'});
      const token = await storage.getItem({keyName: 'token'});
      if (getUserFromStorage && token) {
        dispatch(
          setAuthenticatedUser({
            user: getUserFromStorage,
            token: token?.authToken,
            refreshToken: token?.refreshToken,
          }),
        );
      }
      return true;
    } catch (error) {
      // console.log('error', error);
    }
  };

  const user = useTypeSelector(state => state.userInfo.userData?.user);
  const isAuthenticated = useTypeSelector(state => {
    return state.userInfo?.isAuthenticated;
  });

  const editProfileInfo = async ({file}: editProfileTypes) => {
    try {
      const rawUser = await editProfile({file});
      const formattedUser: User = formatData(rawUser);
      dispatch(setUpdatedUser(formattedUser));
      await storage.setItem({keyName: 'user', value: formattedUser});
    } catch (error) {
      console.log('error', error);
    }
  };

  const logout = async () => {
    try {
      const response = await logoutUser();
      storage.clearStore();
      dispatch(resetUser());
      return response;
    } catch (error) {
      console.log('error from logout', error);
      Promise.reject(error);
    }
  };

  return {
    setUser,
    setAuthenticatedUserFromStorage,
    user,
    isAuthenticated,
    logout,
    changePassword,
    editProfileInfo,
  };
};

export default useAuth;
