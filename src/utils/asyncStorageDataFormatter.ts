import {User} from '../helper/types';

export const formatData = (data: User) => {
  const {_id, ...rest} = data;
  return {id: _id, ...rest};
};
