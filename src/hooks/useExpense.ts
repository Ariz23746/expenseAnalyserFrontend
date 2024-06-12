import {createSelector} from 'reselect';
import useSelector from './useTypeSelector';

export const useExpense = () => {
  const expenseByCategories = useSelector(
    state => state.expense.categoryExpense,
  );
  const allExpense = useSelector(state => state.expense.expenseList)?.slice(
    0,
    6,
  );
  const isLoading = useSelector(state => state.expense.loading);
  const createdExpense = useSelector(state => state.expense.createdExpense);
  const categoryExpenses = state => state.expense.categoryExpense;
  const moneyInfo = createSelector([categoryExpenses], categoryExpense => {
    let totalBudget = 0;
    let totalAmountSpent = 0;
    categoryExpense?.forEach(data => {
      totalAmountSpent += data.totalAmountSpent;
      totalBudget += data.categoryBudget;
    });

    return {
      budget: totalBudget,
      totalAmountSpent,
      budgetLeft: totalBudget - totalAmountSpent,
    };
  });
  const getMoneyInfo = useSelector(moneyInfo);
  return {
    expenseByCategories,
    allExpense,
    isLoading,
    createdExpense,
    getMoneyInfo,
  };
};
