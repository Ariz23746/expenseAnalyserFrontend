import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import HeaderSection from '../molecules/Home/HeaderSection';
import PlannedExpense from '../molecules/Home/PlannedExpense';
import CategorySection from '../molecules/Home/CategorySection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../constants/colors';
import ExpenseList from '../organisms/Home/ExpenseList';
import {useHome} from '../hooks/useHome';
import useNavigation from '../hooks/useNavigation';
import {useExpense} from '../hooks/useExpense';
import {ADD_EXPENSE} from '../constants/screenName';
import {useCurrentScreen} from '../hooks/useCurrentScreen';

const Home = () => {
  useHome();
  const {navigate} = useNavigation();
  const {setCurrentScreenName} = useCurrentScreen();
  const {isLoading} = useExpense();
  return (
    <View className="h-full w-full bg-primary4">
      <View className="flex bg-primary2 py-4 rounded-b-[20px]">
        {isLoading ? (
          <>
            <View className="h-[320px] items-center justify-center flex">
              <ActivityIndicator color={colors.grey.shade1} size={44} />
            </View>
          </>
        ) : (
          <>
            <View className="px-4 w-full flex-grow-0 flex-shrink flex flex-row">
              <HeaderSection />
            </View>
            <View className="px-4 mt-6 w-full flex-grow-0 flex-shrink flex flex-row">
              <PlannedExpense />
            </View>
            <View className="my-4 flex flex-row">
              <TouchableOpacity
                onPress={() => {
                  navigate({screenName: ADD_EXPENSE});
                }}
                className="h-[120px] w-[42px] flex flex-row items-center justify-center rounded-full border border-grey-shade4 mx-4">
                <Icon name={'add'} size={32} color={`${colors.light}`} />
              </TouchableOpacity>
              <CategorySection />
            </View>
          </>
        )}
      </View>
      <View className="px-4 mt-4 flex-1">
        <ExpenseList />
      </View>
    </View>
  );
};

export default Home;
