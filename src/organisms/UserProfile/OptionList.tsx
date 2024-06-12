import {View, Pressable} from 'react-native';
import React from 'react';
import {options} from '../../constants/editProfileOptions';
import ListCard from '../../molecules/common/ListCard';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import {capitalizeFirstLetter} from '../../utils/stringUtils';
import useNavigation from '../../hooks/useNavigation';
import {SCREEN_NAMES} from '../../constants/screenName';

const OptionList = () => {
  const {logout} = useAuth();
  const {showToast} = useToast();
  const {navigate} = useNavigation();
  const handleOnPress = async (name: string) => {
    switch (name) {
      case 'logoutScreen': {
        try {
          const response = await logout();
          showToast({
            type: 'success',
            mainText: capitalizeFirstLetter(response?.message),
          });
        } catch (error) {
          showToast({
            type: 'error',
            mainText: capitalizeFirstLetter(error?.message),
          });
        }
        break;
      }
      default:
        return navigate({screenName: SCREEN_NAMES[name]});
    }
  };
  return (
    <View className="flex w-full flex-col">
      {options.map((option, index) => (
        <Pressable
          onPress={() => handleOnPress(option.id)}
          className="flex w-full mb-2">
          <ListCard
            key={index + option.name}
            title={option.name}
            iconUri={option.iconUri}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default OptionList;
