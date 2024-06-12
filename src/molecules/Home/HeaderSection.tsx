import {View, Text} from 'react-native';
import React from 'react';
import GlobalImage from '../../atoms/GlobalImage';
import useAuth from '../../hooks/useAuth';
import GlobalStatusChip from '../../atoms/GlobalStatusChip';

const HeaderSection = () => {
  const {user} = useAuth();

  return (
    <View className="w-full">
      <View className="flex flex-row items-center">
        <GlobalImage
          isSvg={false}
          isFromUrl={true}
          uri={user?.avatar}
          width={50}
          height={50}
          customClass="rounded rounded-full"
          resizeMode="cover"
        />
        <View className="overflow-hidden flex ml-4 text-light">
          <Text className="text-grey-shade3 font-extraLight text-xs">
            Hi, {user?.firstName}!
          </Text>
          <Text className="text-light font-extraLight text-sm overflow-hidden">
            Monthly <Text className="text-light font-regular">Budget</Text>
          </Text>
        </View>
        <View className="flex-1 flex flex-row justify-end">
          <GlobalStatusChip label={'My Balance'} type="success" />
        </View>
      </View>
    </View>
  );
};

export default HeaderSection;
