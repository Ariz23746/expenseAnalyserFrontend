import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import GlobalInput from '../atoms/GlobalInput';
import GlobalButton from '../atoms/GlobalButton';
import {authenticateUser} from '../helper/userApi/api';
import useNavigation from '../hooks/useNavigation';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import {capitalizeFirstLetter} from '../utils/stringUtils';
import {REGISTER} from '../constants/screenName';
import {useCurrentScreen} from '../hooks/useCurrentScreen';

const Login = () => {
  const [disable, setDisable] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const {navigate} = useNavigation();
  const {setUser} = useAuth();
  const {setCurrentScreenName} = useCurrentScreen();
  const {showToast} = useToast();

  const isFormValid = () => {
    if (!loginId || !password) {
      showToast({
        type: 'error',
        mainText: 'Please fill all the mandatory fileds',
      });
      return false;
    }
    return true;
  };
  const handleOnClick = async () => {
    if (!isFormValid()) return;
    setDisable(true);
    try {
      const {
        data: {data},
      } = await authenticateUser({
        userId: loginId,
        password,
      });
      setUser({...data});
      showToast({
        type: 'success',
        mainText: capitalizeFirstLetter('Logging you in'),
      });
    } catch (err) {
      console.log('err', err);
      showToast({
        type: 'error',
        mainText: capitalizeFirstLetter(err.message || 'Err'),
      });
    } finally {
      setDisable(false);
    }
  };
  return (
    <View className="h-full flex items-start justify-center bg-primary px-4 py-2">
      <View>
        <View>
          <Text className="text-3xl font-extraBold text-light">
            Welcome back !
          </Text>
        </View>
        <View className="my-4">
          <Text className="text-light font-extraBold text-lg">
            Please enter your details to sign in to your account.
          </Text>
        </View>
      </View>
      <View className="w-full">
        <GlobalInput
          defaultValue={loginId}
          label="username"
          placeHolder="Enter phone or username"
          onChange={(enteredText: string) => {
            setLoginId(enteredText);
          }}
          onError={() => {}}
          customClass="my-3"
        />
        <GlobalInput
          defaultValue={password}
          label="password"
          placeHolder="write your password"
          onChange={(enteredText: string) => {
            setPassword(enteredText);
          }}
          onError={() => {}}
          customClass="my-3"
          isPassword={true}
        />

        <GlobalButton
          label="Sign in"
          onClick={handleOnClick}
          isDisabled={disable}
          variant="md"
          containerClass="mt-4"
          textCustomClass="text-sm"
        />
      </View>
      <View className="flex flex-row items-center justify-center w-full py-2">
        <Text className="text-light flex flex-row items-center justify-center font-regular">
          Don't have an account?
        </Text>
        <Pressable
          onPress={() => {
            navigate({
              screenName: REGISTER,
            });
          }}>
          <Text className="text-grey-shade1 font-extraBold"> Register now</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
