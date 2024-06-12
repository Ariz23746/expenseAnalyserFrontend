import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import ScreenHeader from '../molecules/common/ScreenHeader';
import GlobalImage from '../atoms/GlobalImage';
import useAuth from '../hooks/useAuth';
import GlobalIcon from '../atoms/GlobalIcon';
import {colors} from '../constants/colors';
import GlobalInput from '../atoms/GlobalInput';
import OptionList from '../organisms/UserProfile/OptionList';
import {useExpense} from '../hooks/useExpense';
import {currencyCommaSeperator, formatCurrency} from '../utils/stringUtils';

const Profile = () => {
  const {user} = useAuth();
  const {getMoneyInfo} = useExpense();
  const {budgetLeft: balance, totalAmountSpent} = getMoneyInfo;

  const {wholeNumberPart: moneyLeftWp, decimalPart: moneyLeftDp} =
    formatCurrency(balance);
  const {wholeNumberPart: spentWp, decimalPart: spentDp} =
    formatCurrency(totalAmountSpent);

  // const [formData, setFormData] = useState({
  //   firstName: user.firstName,
  //   password: user.
  // });

  return (
    <View className="h-full w-full bg-primary4">
      <ScreenHeader
        headerText="My Profile"
        customClass="flex w-full mx-2"
        textCustomClass="mr-14"
      />
      <View className="flex flex-col w-[100%]">
        <View className="w-[100%] flex flex-row px-4 py-2 items-center justify-center">
          <View className="relative mt-3">
            {/* <View className="bg-grey-shade2 p-4 rounded-full"> */}
            <GlobalImage
              isSvg={false}
              isFromUrl={true}
              uri={user?.avatar}
              width={64}
              height={64}
              resizeMode="cover"
              customClass="rounded-full bg-red-300"
            />
            {/* </View> */}
            <Pressable className="absolute right-0 bottom-0">
              <GlobalIcon
                name="circle-edit-outline"
                size={20}
                color={colors.greyLightBg}
              />
            </Pressable>
          </View>
        </View>
        <View className="w-[100%] mt-1 flex flex-col items-center justify-center">
          <Text className="text-light font-semiBold text-2xl">
            {user?.firstName}
          </Text>
          <Text className="text-grey-shade3 italic">{user?.username}</Text>
        </View>
        <View className="w-[100%] flex flex-col px-4 mt-4">
          <View className="mt-3">
            <Text className="text-light font-regular text-xs mb-3">
              My balance
            </Text>
            <View className="bg-primary2 py-4 px-2 rounded-lg flex flex-row">
              <View className="flex-1 flex items-start justify-start ">
                <Text className="text-xs text-light font-regular">
                  Available balance
                </Text>
                <View className="flex flex-row mt-3 items-center">
                  <Text className="text-light">₹</Text>
                  <Text className="ml-2 text-light font-extraBold text-3xl">
                    {moneyLeftWp}.
                    <Text className="text-base font-regular leading-9">
                      {moneyLeftDp}
                    </Text>
                  </Text>
                </View>
              </View>
              <View className="flex items-start justify-start">
                <Text className="text-xs text-light font-regular">
                  Total spent
                </Text>
                <View className="flex flex-row mt-3 items-center">
                  <Text className="text-light">₹</Text>
                  <Text className="ml-2 text-light font-extraBold text-3xl">
                    {spentWp}.
                    <Text className="text-base font-regular leading-9">
                      {spentDp}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="w-[100%] flex flex-col px-4 mt-4">
          <View className="mt-3">
            <Text className="text-light font-regular text-xs mb-3">
              My accounts
            </Text>
            <OptionList />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
