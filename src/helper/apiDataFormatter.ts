import {colors} from '../constants/colors';
import {
  BreakDownCardProps,
  ReportsProps,
  categoryExpenseProps,
  Budget,
} from './types';
import icons from '../constants/icons';
import {getCurrentDate, getCurrentMonth} from '../utils/dateUtils';
const MAX_BARS = 6;
const colorMapper = [
  colors.secondary,
  colors.light,
  colors.accent,
  colors.grey.shade2,
];
const getPieChartDataHelper = (
  type: string,
  categoryData: categoryExpenseProps[],
) => {
  switch (type) {
    case 'home': {
      return categoryData.map((data, index) => {
        return {
          label: ((data.totalAmountSpent / data.categoryBudget) * 100).toFixed(
            2,
          ),
          y: data.totalAmountSpent,
          color: colorMapper[index],
          name: data.categoryName,
          id: data.categoryId,
        };
      });
    }
    case 'history': {
      let totalAmountSpent = 0;
      let budget = 0;
      categoryData.forEach(data => {
        totalAmountSpent += data.totalAmountSpent;
        budget += data.categoryBudget;
      });

      return [
        {
          label: ((totalAmountSpent / budget) * 100).toFixed(0),
          y: totalAmountSpent,
          color: colorMapper[2],
          name: 'TotalSpent',
          id: 'id1',
        },
        {
          label: 100 - parseInt(((totalAmountSpent / budget) * 100).toFixed()),
          y: budget,
          color: colorMapper[0],
          name: 'budget',
          id: 'id2',
        },
      ];
    }
    default:
      return [];
  }
};
export const getPieChartData = (
  categoryData: categoryExpenseProps[],
  type = 'home',
) => {
  let pieChartData = getPieChartDataHelper(type, categoryData);
  const colorScales = pieChartData.map(data => data.color);
  return {pieChartData, colorScales};
};

export const categoriesOptionTransformer = (
  categoryData: categoryExpenseProps[],
) => {
  const categoryColorMapper = {
    home: 'secondary',
    housing: 'secondary',
    house: 'secondary',
    food: 'light',
    holiday: 'yellow',
    travel: 'orange',
    shopping: 'pink',
    sports: 'green',
    utilities: 'light',
  };
  const tansformedData = categoryData.map(item => {
    return {
      name: item.categoryName,
      id: item.categoryId,
      icon: icons[item.categoryName]
        ? icons[item.categoryName]
        : icons['miscellaneous'],
      label: categoryColorMapper[item.categoryName]
        ? categoryColorMapper[item.categoryName]
        : 'light',
    };
  });
  return tansformedData;
};

export const barChartDataFormatter = (data: ReportsProps[]) => {
  const month = getCurrentDate().month;
  let formattedData = data.length
    ? data.map(value => {
        return {
          x: value.month,
          y: value.totalAmountSpent,
        };
      })
    : [{x: month, y: 0}];
  if (formattedData.length < MAX_BARS) {
    let emptyArray = [];
    let count = MAX_BARS - formattedData.length;
    let lastMonth = formattedData[0]?.x;
    while (count--) {
      emptyArray.push({
        x: lastMonth - 1,
        y: 0,
      });
      lastMonth--;
    }

    formattedData = [...emptyArray.reverse(), ...formattedData];
  }

  return formattedData;
};

const calculateAverages = (
  reportsData: ReportsProps[],
  budgetData: Budget[],
) => {
  let totalSpent = 0;
  let totalSavings = 0;
  let previousSpent = 0;
  let previousSavings = 0;
  let spentChange = 0;
  let savingsChange = 0;

  const totalMonths = reportsData.length;

  for (let i = 0; i < totalMonths - 1; i++) {
    const {totalAmountSpent} = reportsData[i];
    const {amount} = budgetData[i];

    totalSpent += totalAmountSpent;
    totalSavings += amount - totalAmountSpent;

    if (i === totalMonths - 2) {
      // Calculate percentage change for the last month
      if (totalMonths > 2) {
        previousSpent = reportsData[i - 2].totalAmountSpent;
        previousSavings = budgetData[i - 2].amount - previousSpent;
        let thisMonthSaving = amount - totalAmountSpent;
        spentChange = Math.floor(
          ((totalAmountSpent - previousSpent) / previousSpent) * 100,
        );
        savingsChange = Math.floor(
          ((thisMonthSaving - previousSavings) / previousSavings) * 100,
        );
      }
    }
  }

  const averageSpent = parseInt((totalSpent / totalMonths).toFixed(2));
  const averageSavings = parseInt((totalSavings / totalMonths).toFixed(2));

  return {
    averageSpent,
    averageSavings,
    spentChange,
    savingsChange,
  };
};
export const getBreakDownData = (
  reportsData: ReportsProps[],
  budgets?: Budget[],
) => {
  if (reportsData?.length > 2 && budgets && budgets.length > 2) {
    const {averageSpent, averageSavings, spentChange, savingsChange} =
      calculateAverages(reportsData, budgets);
    const breakDownData: BreakDownCardProps[] = [];
    breakDownData.push({
      variant: savingsChange >= 0 ? 'increase' : 'decrease',
      type: 'incoming',
      cardTitle: 'Average Saving',
      amount: averageSavings + '',
      percentage: savingsChange,
    });
    breakDownData.push({
      variant: spentChange > 0 ? 'increase' : 'decrease',
      type: 'outgoing',
      cardTitle: 'Average expense',
      amount: averageSpent.toFixed(2),
      percentage: spentChange,
      marginLeft: true,
    });
    return breakDownData;
  } else {
    const breakDownData: BreakDownCardProps[] = [];
    breakDownData.push({
      isFallback: true,
      variant: 'neutral',
      type: 'saving',
      cardTitle: 'Track your savings!',
      cardSubtitle: 'Log your expenses to see how much you save each month.',
    });
    breakDownData.push({
      isFallback: true,
      variant: 'neutral',
      type: 'wallet',
      cardTitle: 'Monitor your expenses!',
      cardSubtitle:
        'Enter your spending details to get insights on your expenses.',
      marginLeft: true,
    });

    return breakDownData;
  }
};
