/* eslint-disable react-native/no-inline-styles */
import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import React, {useState} from 'react';
import GlobalCalenderPicker from '../../atoms/GlobalCalenderPicker';
import GlobalInput from '../../atoms/GlobalInput';
import GlobalButton from '../../atoms/GlobalButton';
import {useExpense} from '../../hooks/useExpense';
import CategorySelect from '../../atoms/GlobalDropdown';
import {categoriesOptionTransformer} from '../../helper/apiDataFormatter';
import {generateExpense} from '../../slices/expenseSlice';
import useDispatch from '../../hooks/useTypeDispatch';
import useToast from '../../hooks/useToast';
import useNavigation from '../../hooks/useNavigation';
import {HOME} from '../../constants/screenName';
import {useCurrentScreen} from '../../hooks/useCurrentScreen';

const AddExpenseForm = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [amount, setAmount] = useState('');
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };
  const {showToast} = useToast();
  const {navigate} = useNavigation();
  const {setCurrentScreenName} = useCurrentScreen();
  const {expenseByCategories, isLoading} = useExpense();

  const categories = categoriesOptionTransformer(expenseByCategories);
  const [categoryId, setCategoryId] = useState(categories[1].id);
  const handleCategorySelect = (categId: string) => {
    setCategoryId(categId);
  };
  const handleAmountChange = (value: string) => {
    setAmount(value);
  };
  const handleExpenseChange = (value: string) => {
    setExpense(value);
  };
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const shouldDisable = () => {
    return (
      !amount ||
      !description ||
      !expense ||
      !categoryId ||
      !selectedDate ||
      isLoading
    );
  };

  const handleOnSubmit = () => {
    dispatch(
      generateExpense({
        categoryId,
        amount,
        date: selectedDate,
        name: expense,
        description,
      }),
    ).then(() => {
      showToast({
        type: 'success',
        mainText: 'Expense created successfully!',
      });
      navigate({
        screenName: HOME,
      });
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View className="flex-1 w-full">
          <View className="w-full px-4 flex-1 flex items-center ">
            <GlobalCalenderPicker onDateSelect={handleDateChange} />
            <GlobalInput
              defaultValue={amount}
              type="numeric"
              customClass="flex flex-row w-[100%]"
              showLabel={true}
              onChange={handleAmountChange}
              label="Amount"
              placeHolder="Enter your amount"
              customFocusClass="border-secondary"
              containerClass="w-full mt-2"
            />
            <GlobalInput
              defaultValue={expense}
              customClass=""
              showLabel={true}
              onChange={handleExpenseChange}
              label="Expense"
              placeHolder="Enter expense name"
              customFocusClass="border-secondary"
              containerClass="w-full mt-2"
            />
            <CategorySelect
              defaultSelected={categories[1]}
              data={categories}
              onSelect={handleCategorySelect}
            />
            <GlobalInput
              defaultValue={description}
              customClass=""
              showLabel={true}
              onChange={handleDescriptionChange}
              label="Description"
              placeHolder="Enter description"
              customFocusClass="border-secondary"
              containerClass="w-full mt-2"
            />
          </View>
          <GlobalButton
            isDisabled={shouldDisable()}
            isLoading={isLoading}
            onClick={handleOnSubmit}
            label="Add Expense"
            variant="md"
            containerClass="mb-4 mt-12 px-4 w-full flex items-center justify-center"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddExpenseForm;
