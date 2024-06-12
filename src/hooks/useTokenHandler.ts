import {logoutUser} from '../helper/userApi/api';
import {resetUser} from '../slices/userSlice';
import {navigationRef} from './useNavigation';
import {ON_BOARD} from '../constants/screenName';
import asyncStorage from '../helper/asyncStorage';
import useTypeDispatch from './useTypeDispatch';
import {toggleLoader} from '../slices/globalLoaderSlice';

const useTokenHandler = () => {
  const dispatch = useTypeDispatch();

  const handleRefreshTokenExpired = async () => {
    try {
      dispatch(toggleLoader(true));
      await asyncStorage().clearStore();
      dispatch(resetUser());
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  return {handleRefreshTokenExpired};
};

export default useTokenHandler;
