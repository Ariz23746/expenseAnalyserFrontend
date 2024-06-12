import {instance as axios} from '../axiosInterceptor';
import rawAxios from 'axios';
const API = {
  login: '/users/login',
  logout: '/users/logout',
  changePassword: '/users/change-password',
  editProfile: '/users/edit-profile',
};

interface loginPropsTypes {
  userId: string;
  password: string;
}

interface changePasswordTypes {
  oldPassword: string;
  changedPassword: string;
}

interface editProfileTypes {
  file: FormData;
}

export const authenticateUser = async ({userId, password}: loginPropsTypes) => {
  return axios
    .post(API.login, {
      userId,
      password,
    })
    .then(data => data)
    .catch(err => {
      return Promise.reject(err);
    });
};

export const logoutUser = async (_skipAuth: boolean = false) => {
  const axiosToUse = _skipAuth ? rawAxios : axios;
  return axiosToUse
    .get(API.logout)
    .then(({data}) => {
      return data;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export const changePassword = async ({
  oldPassword,
  changedPassword,
}: changePasswordTypes) => {
  try {
    const {data} = await axios.post(API.changePassword, {
      oldPassword,
      changedPassword,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const editProfile = async ({file}: editProfileTypes) => {
  try {
    const {
      data: {data},
    } = await axios.patch(API.editProfile, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
