import {View, Text, FlatList, ViewToken, ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useExpenseHistory} from '../hooks/useExpenseHistory';
import ExpenseCard from '../molecules/common/ExpenseCard';
import {useSharedValue} from 'react-native-reanimated';
import {colors} from '../constants/colors';
import ScreenHeader from '../molecules/common/ScreenHeader';

const ExpenseHistory = () => {
  const {expenseList, fetchMoreList, loading} = useExpenseHistory();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const [page, setPage] = useState(1);
  const [isCompleteListFetched, setIsCompleteListFetched] = useState(false);

  const onViewableItemsChanged = useCallback(({viewableItems: vItems}) => {
    viewableItems.value = vItems;
  }, []);

  const handleEndReached = async () => {
    const isDataExist = await fetchMoreList(page + 1 + '');
    if (!isDataExist) {
      setIsCompleteListFetched(true);
      return;
    }
    setPage(prevVal => prevVal + 1);
  };

  const Footer = () => {
    return (
      <View className="px-2 py-2 flex items-center justify-center">
        <ActivityIndicator
          className="items-center flex justify-center"
          color={colors.light}
          size={32}
        />
        <Text className="mt-2 text-grey-shade1 font-regular italic text-lg text-center">
          loading...
        </Text>
      </View>
    );
  };
  return (
    <View className="px-4 pt-4 h-full w-full bg-primary4">
      <ScreenHeader
        headerText="Expense history"
        customClass="flex flex-row items-center justify-start mb-4 mr-8"
      />
      <View className="flex-1">
        <FlatList
          data={expenseList}
          contentContainerStyle={{paddingTop: '40px'}}
          onViewableItemsChanged={onViewableItemsChanged}
          renderItem={({item, index}) => {
            return (
              <ExpenseCard
                name={item.name}
                date={item.createdAt}
                amountSpent={item.amount}
                customContainerClass="bg-primary2 px-2 pr-4 py-3 rounded-2xl"
                viewableItems={viewableItems}
                id={index.toString()}
              />
            );
          }}
          onEndReached={() => {
            !isCompleteListFetched ? handleEndReached() : null;
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading ? <Footer /> : <></>}
        />
      </View>
    </View>
  );
};

export default ExpenseHistory;
