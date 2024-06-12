import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WeekCalendar} from 'react-native-calendars';
import {colors} from '../constants/colors';
import {getCurrentDate, getCurrentMonth} from '../utils/dateUtils';
import {eachDayOfInterval, endOfWeek, format, startOfWeek} from 'date-fns';
import PagerView from 'react-native-pager-view';
import GlobalIcon from './GlobalIcon';
import clsx from 'clsx';

interface GlobalCalenderPickerProps {
  onDateSelect: (arg0: string) => void;
}
const GlobalCalenderPicker = ({onDateSelect}: GlobalCalenderPickerProps) => {
  const {year} = getCurrentDate();
  const currentMonth = getCurrentMonth();
  const currentWeekStart = startOfWeek(new Date(), {weekStartsOn: 1}); // Assuming the week starts on Monday
  const currentWeekEnd = endOfWeek(new Date(), {weekStartsOn: 1});

  // Get all days of the current week
  const currentWeek = eachDayOfInterval({
    start: currentWeekStart,
    end: currentWeekEnd,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleOnPress(dateSelected: Date) {
    setSelectedDate(dateSelected);
  }

  useEffect(() => {
    const monthSelected = (selectedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const dateSelected = selectedDate.getDate().toString().padStart(2, '0');
    const yearSelected = selectedDate.getFullYear();

    const formattedDate = `${yearSelected}-${monthSelected}-${dateSelected}`;
    onDateSelect(formattedDate);
  }, [selectedDate]);

  return (
    <View className="bg-primary2 rounded-xl pt-3 pb-4 w-full">
      <View className="flex flex-row items-center justify-center">
        <GlobalIcon name="calendar" size={20} color={colors.light} />
        <Text className="text-light font-semiBold mx-1 mr-1">
          {currentMonth}
        </Text>
        <Text className="text-light font-semiBold">{year}</Text>
      </View>
      <View className="mt-2">
        <View className="px-2 w-full flex flex-row">
          <View className="flex-1 flex flex-row justify-between">
            {currentWeek.map((day, index) => {
              const monthInitial = format(day, 'EEE');
              const isSelected = day.getDate() === selectedDate.getDate();
              return (
                <Pressable
                  onPress={() => handleOnPress(day)}
                  key={index}
                  className={clsx(
                    'flex w-[40px] px-2 py-3 items-center',
                    isSelected ? 'bg-secondary rounded-[20px]' : '',
                  )}>
                  <Text
                    className={clsx(
                      'text-grey-shade3 text-xs',
                      isSelected ? 'text-light' : '',
                    )}>
                    {monthInitial}
                  </Text>
                  <Text className="text-center text-light mt-3 text-base">
                    {day.getDate()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default GlobalCalenderPicker;
