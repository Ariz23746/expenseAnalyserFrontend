import {View, Text} from 'react-native';
import React from 'react';
import clsx from 'clsx';
import GlobalImage from '../../atoms/GlobalImage';
import GlobalIcon from '../../atoms/GlobalIcon';

interface ListCardProps {
  title: string;
  iconUri: string;
  containerClass?: string;
  textClass?: string;
}
const ListCard = ({
  title,
  iconUri,
  containerClass = '',
  textClass = '',
}: ListCardProps) => {
  return (
    <View
      className={clsx(
        'w-[100%] py-2 px-2 flex flex-row bg-primary2 rounded-lg items-center justify-center',
        containerClass,
      )}>
      <View className="bg-secondary rounded-full p-2">
        <GlobalImage uri={iconUri} width={32} height={32} isSvg={false} />
      </View>
      <View className="flex-1 flex flex-row justify-center ml-4">
        <Text className={clsx('flex-1 text-light font-semiBold', textClass)}>
          {title}
        </Text>
      </View>
      <GlobalIcon name={'chevron-right'} size={28} />
    </View>
  );
};

export default ListCard;
