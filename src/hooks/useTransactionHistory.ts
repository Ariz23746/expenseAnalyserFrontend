import {useEffect} from 'react';
import useDispatch from './useTypeDispatch';
import useSelector from './useTypeSelector';
import {getBudgets, getReports} from '../slices/reportsSlice';

const useTransactionHistory = () => {
  const dispatch = useDispatch();
  const reports = useSelector(state => state.report.reports);
  const budgets = useSelector(state => state.report.budgets);
  const isReportsLoading = useSelector(state => state.report.loading);
  const fetchReports = (page: number) => {
    dispatch(getReports({page}));
  };
  const fetchBudgets = (page: number) => {
    dispatch(getBudgets({page}));
  };
  return {
    reports,
    fetchReports,
    isReportsLoading,
    budgets,
    fetchBudgets,
  };
};

export default useTransactionHistory;
