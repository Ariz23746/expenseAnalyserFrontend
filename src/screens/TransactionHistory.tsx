import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import ScreenHeader from '../molecules/common/ScreenHeader';
import BarGraph from '../organisms/TransactionHistory/BarGraph';
import BreakDown from '../organisms/TransactionHistory/BreakDown';
import useTransactionHistory from '../hooks/useTransactionHistory';

const TransactionHistory = () => {
  const {fetchReports, fetchBudgets, budgets, reports} =
    useTransactionHistory();
  useEffect(() => {
    if (reports.length === 0) {
      fetchReports(1);
    }
    if (budgets.length === 0) {
      fetchBudgets(1);
    }
  }, []);
  return (
    <View className="bg-primary4 w-full h-full">
      <ScreenHeader
        customClass="py-2 px-3 flex flex-row"
        textCustomClass="flex-1 mr-12 text-center flex items-center justify-center"
        headerText="History"
      />
      <View className="bg-primary2 mt-2 mx-4 py-2 px-3 rounded-xl h-[35%]">
        <View className="z-[1000] flex flex-col">
          <Text className="text-white z-99 ml-1 text-[16px] font-extraBold">
            Expenses
          </Text>
        </View>
        <View className="relative ">
          <BarGraph />
        </View>
      </View>
      <View className="mt-4 rounded-xl mx-4 py-2 px-3 h-[53%]">
        <BreakDown />
      </View>
    </View>
  );
};

export default TransactionHistory;
