import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStatusChip from '../../atoms/GlobalStatusChip';
import PieChart from '../common/PieChart';
import {useExpense} from '../../hooks/useExpense';
import {currencyCommaSeperator, formatCurrency} from '../../utils/stringUtils';
import {getPieChartData} from '../../helper/apiDataFormatter';

const PlannedExpense = () => {
  const {expenseByCategories} = useExpense();
  const [totalSpent, setTotalSpent] = useState(0);
  const [budgetLeft, setBudgetLeft] = useState(0);
  const {
    wholeNumberPart: totalAmountSpentWholeNumber,
    decimalPart: totalAmountSpentDecimal,
  } = formatCurrency(totalSpent);
  const {pieChartData, colorScales} = getPieChartData(expenseByCategories);
  useEffect(() => {
    if (!expenseByCategories) return;
    const totalMoneySpent = expenseByCategories.reduce(
      (prevSum, expense) => prevSum + expense.totalAmountSpent,
      0,
    );
    const budgetAmountLeft =
      expenseByCategories.reduce(
        (prevSum, expense) => prevSum + expense.categoryBudget,
        0,
      ) - totalMoneySpent;
    setBudgetLeft(budgetAmountLeft);
    setTotalSpent(totalMoneySpent);
  }, [expenseByCategories]);
  return (
    <View className="flex flex-row justify-between items-center w-full">
      <View>
        <Text className="text-light text-sm font-extraLight">
          <Text className="font-regular">Planned</Text> Expense
        </Text>
        <View className="mb-1 mt-1">
          <Text className="font-regular text-4xl mt-1 text-light">
            ₹ {totalAmountSpentWholeNumber}.
            <Text className="text-base leading-[40px]">
              {totalAmountSpentDecimal}
            </Text>
          </Text>
        </View>
        <GlobalStatusChip
          label={`₹ ${currencyCommaSeperator(budgetLeft + '')} left to budget`}
          textCustomClass="text-yellow"
          showStatusCircle={false}
        />
      </View>
      <View className="">
        <PieChart
          width={100}
          height={100}
          colorScales={colorScales}
          pieChartData={pieChartData}
          outerRadius={40}
          innerRadius={20}
        />
      </View>
    </View>
  );
};

export default PlannedExpense;
