import clsx from 'clsx';
import React from 'react';
import {View, Text, ImageBackground} from 'react-native';

interface CardProps {
  title: string;
  amount: string;
  percentage: string | number;
  bgImage: string;
  isDarkText?: boolean;
}

const Card = ({
  title,
  amount,
  percentage,
  bgImage,
  isDarkText = false,
}: CardProps) => {
  return (
    <ImageBackground
      source={bgImage}
      className={
        'mx-2 relative w-[120px] h-[120px] rounded-2xl overflow-hidden'
      }>
      <View className={clsx('flex-1 justify-center items-start p-4')}>
        <Text
          className={clsx(
            'text-sm font-semiBold mb-2',
            isDarkText ? 'text-grey-shade4' : 'text-white',
          )}>
          {title}
        </Text>
        <Text
          className={clsx(
            'text-base font-semiBold mb-2',
            isDarkText ? 'text-grey-shade4' : 'text-white',
          )}>
          ₹ {amount}
        </Text>
        <View
          className={clsx(
            'py-1 px-3 rounded-full',
            !isDarkText ? 'bg-light' : 'bg-primary2',
          )}>
          <Text
            className={clsx(
              'font-semiBold text-sm',
              isDarkText ? 'text-light' : 'text-primary2',
            )}>
            {percentage}%
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Card;
