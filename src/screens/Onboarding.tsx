import {View, Text} from 'react-native';
import React, {FC} from 'react';
import useNavigation from '../hooks/useNavigation';
import GlobalButton from '../atoms/GlobalButton';
import GlobalImage from '../atoms/GlobalImage';
import OnboardImage from '../../assets/images/onBoard3.png';
import {LOGIN, REGISTER} from '../constants/screenName';
import {useCurrentScreen} from '../hooks/useCurrentScreen';
interface OnboardingProps {}

const Onboarding: FC<OnboardingProps> = () => {
  const {navigate} = useNavigation();
  const {setCurrentScreenName} = useCurrentScreen();
  const handleRegisterClick = () => {
    navigate({
      screenName: REGISTER,
    });
  };

  const handleLoginClick = () => {
    navigate({
      screenName: LOGIN,
    });
  };
  return (
    <View className="bg-primary">
      <View className="h-full flex p-4">
        <GlobalImage
          uri={OnboardImage}
          isSvg={false}
          width={'100%'}
          height={'60%'}
          resizeMode="contain"
          customClass="flex flex-row items-center scale-[1.2]"
        />
        <View className="">
          <View className="overflow-hidden w-full flex">
            <Text className="font-extraBold text-light text-3xl">
              Take control
              <Text className="font-regular text-light text-3xl mt-2">
                {' '}
                of your Finances Today!
              </Text>
            </Text>

            <Text className="text-grey-shade1 font-regular mt-2 leading-5">
              With our app, you can easily track your expense, set financial
              goals and make informed decision about your money.
            </Text>
          </View>
          <View className="w-full flex flex-row flex-grow justify-between mt-16">
            <GlobalButton
              label={'Register'}
              variant="md"
              isOutline={true}
              containerClass="flex-1 mr-4"
              onClick={handleRegisterClick}
            />
            <GlobalButton
              containerClass="flex-1"
              label={'Sign in'}
              variant="md"
              onClick={handleLoginClick}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
