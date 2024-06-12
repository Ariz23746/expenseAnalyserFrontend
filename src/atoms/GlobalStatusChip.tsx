import {View, Text} from 'react-native';
import React from 'react';
import clsx from 'clsx';
import {colors} from '../constants/colors';

interface GlobalStatusChipProps {
  label: string;
  type?: 'success' | 'alert' | 'error';
  customClass?: string;
  showStatusCircle?: boolean;
  textCustomClass?: string;
}
const GlobalStatusChip = ({
  label,
  type,
  customClass,
  showStatusCircle = true,
  textCustomClass = '',
}: GlobalStatusChipProps) => {
  const statusVariant = {
    success: `bg-green`,
    error: '',
    alert: '',
  };
  const statusStyle = clsx(
    'rounded-full w-[8px] h-[8px]',
    statusVariant[type],
    customClass,
  );
  return (
    <View className="flex flex-row items-center">
      <View className="flex flex-shrink-0 flex-row items-center rounded-[24px] border border-grey-shade2 px-3 py-2">
        {showStatusCircle && <View className={`${statusStyle}`}></View>}
        <Text
          className={clsx(
            'text-light text-[10px] font-regular',
            textCustomClass,
            showStatusCircle ? 'ml-2' : '',
          )}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default GlobalStatusChip;
