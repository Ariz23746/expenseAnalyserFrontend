import {View, Text, ViewToken} from 'react-native';
import React, {memo} from 'react';
import {colors} from '../../constants/colors';
import {createDateFormatter} from '../../utils/dateUtils';
import {capitalizeFirstLetter, formatCurrency} from '../../utils/stringUtils';
import GlobalIcon from '../../atoms/GlobalIcon';
import clsx from 'clsx';
import Animated, {
  SharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
interface ExpenseCardProps {
  name: string;
  date: string;
  amountSpent: number;
  customContainerClass?: string;
  viewableItems?: SharedValue<ViewToken[]>[];
  id?: string;
}
const ExpenseCard = ({
  name,
  date,
  amountSpent,
  customContainerClass = '',
  viewableItems,
  id,
}: ExpenseCardProps) => {
  const {getDate, getTime} = createDateFormatter(date);

  const {wholeNumberPart, decimalPart} = formatCurrency(amountSpent);

  const rStyle = useAnimatedStyle(() => {
    if (viewableItems) {
      const isVisible = Boolean(
        viewableItems?.value
          ?.filter(item => item.isViewable)
          .find(viewableItem => viewableItem.index.toString() === id),
      );
      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.9),
          },
        ],
      };
    }
    return {};
  }, []);

  return (
    <Animated.View
      style={rStyle}
      className={clsx('mb-4 flex flex-row items-center', customContainerClass)}>
      <View className="w-[52px] h-[52px] rounded-full bg-primary3 flex items-center justify-center">
        <GlobalIcon name={name} />
      </View>
      <View className="flex flex-1 ml-3">
        <Text className="text-light font-regular">
          {name && capitalizeFirstLetter(name)}
        </Text>
        <View className="mt-1 flex flex-row text-light">
          <Text className="text-grey-shade3 font-regular">{getTime()}</Text>
          <Text className="text-grey-shade3 mx-2">•</Text>
          <Text className="text-grey-shade3 font-regular">{getDate()}</Text>
        </View>
      </View>
      <View>
        <Text className="text-light font-regular text-base">
          ₹{wholeNumberPart}
          <Text className="text-[10px] font-regular">.{decimalPart}</Text>
        </Text>
      </View>
    </Animated.View>
  );
};

export default memo(ExpenseCard);
