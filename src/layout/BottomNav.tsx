import {View, StyleSheet, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {BOTTOM_NAV_OPTIONS} from '../constants/bottomNav';
import GlobalImage from '../atoms/GlobalImage';
import icons from '../constants/icons';
import clsx from 'clsx';
import useNavigation from '../hooks/useNavigation';
import {SCREEN_NAMES} from '../constants/screenName';
import {useCurrentScreen} from '../hooks/useCurrentScreen';

const BottomNav = ({children, isVisible}) => {
  const {navigate} = useNavigation();
  const {currentScreenName} = useCurrentScreen();

  return (
    <View className="relative w-full h-full bg-primary4">
      {children}
      <View
        style={bottomNav.container}
        className={clsx(
          'bg-[#232323] flex flex-row items-center justify-center',
          isVisible ? 'flex' : 'hidden',
        )}>
        {BOTTOM_NAV_OPTIONS.map(option => {
          const index =
            SCREEN_NAMES[option.screenName] === currentScreenName
              ? option.iconName + 'Selected'
              : option.iconName;
          return (
            <Pressable
              key={option?.id}
              onPress={() => {
                navigate({
                  screenName: SCREEN_NAMES[option.screenName],
                });
              }}
              className={clsx(
                'flex flex-row  px-2 py-2 mx-1',
                SCREEN_NAMES[option.screenName] === currentScreenName
                  ? 'bg-secondary rounded-full'
                  : '',
              )}>
              <GlobalImage
                isSvg={false}
                uri={icons[index]}
                width={20}
                height={20}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const bottomNav = StyleSheet.create({
  container: {
    width: 128,
    padding: 4,
    bottom: 12,
    left: '50%',
    borderRadius: 120,
    position: 'absolute',
    transform: [
      {
        translateX: -75,
      },
    ],
  },
});

export default BottomNav;
