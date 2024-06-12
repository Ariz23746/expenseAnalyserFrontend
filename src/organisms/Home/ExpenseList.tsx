import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {getCurrentMonth} from '../../utils/dateUtils';
import ExpenseCard from '../../molecules/common/ExpenseCard';
import {useExpense} from '../../hooks/useExpense';
import useNavigation from '../../hooks/useNavigation';
import NotFound from '../../../assets/images/NotFound.png';
import GlobalImage from '../../atoms/GlobalImage';
import GlobalButton from '../../atoms/GlobalButton';
import {colors} from '../../constants/colors';
import {ADD_EXPENSE, EXPENSE_HISTORY} from '../../constants/screenName';
import {useCurrentScreen} from '../../hooks/useCurrentScreen';
const ExpenseList = () => {
  const {allExpense, isLoading} = useExpense();
  const slicedExpense = allExpense;
  const {navigate} = useNavigation();
  const {setCurrentScreenName} = useCurrentScreen();
  return (
    <View className="flex-1">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-light font-regular text-base">
          Spending <Text className="font-extraLight">{getCurrentMonth()}</Text>
        </Text>
        {allExpense.length > 5 && (
          <Pressable
            onPress={() => {
              navigate({
                screenName: EXPENSE_HISTORY,
              });
            }}>
            <Text className="text-light font-regular">View all</Text>
          </Pressable>
        )}
      </View>
      {isLoading ? (
        <View className="h-[370px] items-center justify-center flex">
          <ActivityIndicator color={colors.grey.shade1} size={44} />
        </View>
      ) : (
        <>
          {allExpense.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
              {slicedExpense.map((item, index) => {
                return (
                  <ExpenseCard
                    key={index}
                    name={item?.name}
                    amountSpent={item.amount}
                    date={item.createdAt}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <View className="flex items-center">
              <GlobalImage
                isSvg={false}
                customClass="flex items-center justify-center"
                uri={NotFound}
                width={230}
                height={230}
                resizeMode="contain"
              />
              <View className="flex items-center">
                <Text className="text-lg font-extraBold text-light">
                  No Expense Yet
                </Text>
                <Text className=" text-grey-shade1 text-[12px] font-regular">
                  Please add expense to analyse
                </Text>
                <GlobalButton
                  isDisabled={false}
                  containerClass="mt-4"
                  textCustomClass="text-xs"
                  variant="sm"
                  label={'Add Expense'}
                  onClick={() => {
                    navigate({
                      screenName: ADD_EXPENSE,
                    });
                  }}
                />
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ExpenseList;
