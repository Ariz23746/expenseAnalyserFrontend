import {View, Text} from 'react-native';
import React from 'react';
import ScreenHeader from '../molecules/common/ScreenHeader';
import AddExpenseForm from '../organisms/AddExpense/AddExpenseForm';

const AddExpense = () => {
  return (
    <View className="bg-primary4 h-full w-full">
      <ScreenHeader
        headerText="Add Expense"
        customClass="flex px-4 justify-start mt-4 mb-3"
      />
      <AddExpenseForm />
    </View>
  );
};

export default AddExpense;
