/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import GlobalImage from '../../../atoms/GlobalImage';
import icons from '../../../constants/icons';
import {currencyCommaSeperator} from '../../../utils/stringUtils';
import GlobalIcon from '../../../atoms/GlobalIcon';
import {colors} from '../../../constants/colors';
import {BreakDownCardProps} from '../../../helper/types';

const colorMapper = {
  increase: 'green',
  decrease: 'red',
  0: '#723FEB',
  1: '#97E0F7',
};
const iconMapper = {
  increase: 'trending-up',
  decrease: 'trending-down',
};

const BreakDownCard = ({
  variant,
  type,
  cardTitle,
  amount,
  percentage,
  marginLeft,
  cardSubtitle,
  index,
  isFallback = false,
}: BreakDownCardProps) => {
  function determineColor() {
    if (type === 'incoming') {
      return percentage < 0 ? colorMapper['decrease'] : colorMapper['increase'];
    } else if (type === 'outgoing') {
      return percentage < 0 ? colorMapper['increase'] : colorMapper['decrease'];
    }
  }
  function getTextColor() {
    if (type === 'incoming') {
      return percentage < 0 ? colorMapper['decrease'] : colorMapper['increase'];
    } else if (type === 'outgoing') {
      return percentage < 0 ? colorMapper['increase'] : colorMapper['decrease'];
    }
  }

  return (
    <View
      style={{
        backgroundColor: colorMapper[index] + '33',
        marginLeft: marginLeft ? 16 : 0,
        height: 170,
      }}
      className="rounded-xl flex-1 p-3 pt-4">
      <View className="h-[100%]">
        <View
          style={{backgroundColor: colorMapper[index]}}
          className="rounded-full w-[36px] h-[36px] flex items-center justify-center">
          <GlobalImage
            isSvg={false}
            uri={icons[type]}
            width={20}
            height={20}
            resizeMode="contain"
          />
        </View>

        <Text className="mt-2 text-[10px] text-grey-shade1 font-regular">
          {cardTitle}
        </Text>
        {!isFallback ? (
          <>
            <View className="mt-5">
              <Text className="text-light font-regular text-[10px]">
                ₹{' '}
                <Text className="text-xl font-extraBold">
                  {currencyCommaSeperator(amount)}
                </Text>
              </Text>
            </View>
            {percentage && (
              <View>
                <GlobalIcon
                  name={iconMapper[variant]}
                  size={16}
                  color={determineColor()}
                />
                <Text
                  style={{
                    color: colors[getTextColor()],
                  }}
                  className="font-extraBold text-[10px]">
                  {percentage < 0 ? -1 * percentage : percentage}%
                </Text>
              </View>
            )}
          </>
        ) : (
          <View className="mt-5">
            <Text className="text-[10px] font-regular text-light">
              {cardSubtitle}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default BreakDownCard;
