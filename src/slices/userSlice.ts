import {createSlice} from '@reduxjs/toolkit';
import {User} from '../helper/types';

interface initialStateType {
  loading: boolean;
  userData: {
    user: User | null;
    refreshToken: string;
    token: string;
  };
  loginTime: string | null;
  isAuthenticated: boolean;
  error: string;
}
const initialState: initialStateType = {
  loading: false,
  userData: {
    user: {
      avatar: '',
      id: '',
      createdAt: '',
      updatedAt: '',
      firstName: '',
      lastName: '',
      passwordChangedAt: '',
      email: '',
      phone: '',
      username: '',
    },
    refreshToken: '',
    token: '',
  },
  error: '',
  loginTime: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => {
      state.isAuthenticated = true;
      state.loginTime = new Date() + '';
      state.userData = action.payload;
    },
    setAuthUserToken: (state, action) => {
      state.userData.token = action.payload.token;
      state.userData.refreshToken = action.payload.refreshToken;
    },
    setUpdatedUser: (state, action) => {
      state.userData.user = action.payload;
    },
    resetUser: state => {
      state.isAuthenticated = false;
      state.userData.user = null;
      state.userData.refreshToken = '';
      state.userData.token = '';
    },
  },
});

export const {
  setAuthenticatedUser,
  setAuthUserToken,
  resetUser,
  setUpdatedUser,
} = userSlice.actions;
export default userSlice.reducer;
