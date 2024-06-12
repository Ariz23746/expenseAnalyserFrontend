import {useEffect, useState} from 'react';
import useDispatch from './useTypeDispatch';
import {getCategoryWiseExpense, getAllExpense} from '../slices/expenseSlice';
import useSelector from './useTypeSelector';
import {getExpenses} from '../helper/expenseScreen/api';
import {expenseProps} from '../helper/types';
import {setExpense} from '../slices/expenseSlice';
export const useExpenseHistory = () => {
  const dispatch = useDispatch();
  const expenseList = useSelector(state => state.expense.expenseList);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getCategoryWiseExpense());
    dispatch(
      getAllExpense({
        limit: 20,
        page: 1,
      }),
    );
  }, []);

  const fetchMoreList = async (page: string) => {
    setLoading(true);
    const data: expenseProps[] = await getExpenses({
      limit: 20,
      page,
    });
    setLoading(false);
    if (data) {
      dispatch(setExpense(data));
    }

    const isDataExist = data.length;
    return isDataExist;
  };

  return {
    fetchMoreList,
    expenseList,
    loading,
  };
};
