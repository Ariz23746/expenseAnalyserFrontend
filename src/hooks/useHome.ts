import {useEffect} from 'react';
import useDispatch from './useTypeDispatch';
import {getCategoryWiseExpense, getAllExpense} from '../slices/expenseSlice';
import {useExpense} from './useExpense';

export const useHome = () => {
  const dispatch = useDispatch();
  const {createdExpense} = useExpense();
  useEffect(() => {
    dispatch(getCategoryWiseExpense());
    dispatch(
      getAllExpense({
        limit: 6,
      }),
    );
  }, [createdExpense]);
};
