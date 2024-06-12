import {View, Text, Pressable} from 'react-native';
import React from 'react';
import clsx from 'clsx';
import GlobalIcon from '../../atoms/GlobalIcon';
import {colors} from '../../constants/colors';
import useNavigation from '../../hooks/useNavigation';

interface ScreenHeaderProps {
  headerText: string;
  customClass?: string;
  textCustomClass?: string;
}
const ScreenHeader = ({
  headerText,
  customClass = '',
  textCustomClass = '',
}: ScreenHeaderProps) => {
  const {goBack} = useNavigation();
  return (
    <View
      className={clsx(
        'flex flex-row items-center justify-center mt-2',
        customClass,
      )}>
      <Pressable
        onPress={() => {
          goBack();
        }}
        className=" mr-2 flex flex-row items-center justify-center">
        <GlobalIcon name="chevron-left" color={colors.light} size={28} />
      </Pressable>
      <View className="flex-1 flex items-center">
        <Text
          className={clsx(
            'text-light font-extraBold text-lg',
            textCustomClass,
          )}>
          {headerText}
        </Text>
      </View>
    </View>
  );
};

export default ScreenHeader;
