import {View, Text} from 'react-native';
import React from 'react';
import GlobalInput from '../atoms/GlobalInput';
import OnboardImage from '../../assets/images/onBoard2.png';
import GlobalImage from '../atoms/GlobalImage';
const Register = () => {
  return (
    <View className="h-full bg-primary px-4 py-2">
      <GlobalInput
        label="username"
        placeHolder="Enter a username"
        onChange={() => {}}
        onError={() => {}}
        customClass="my-3"
      />
      <GlobalInput
        label="firstName"
        placeHolder="first name"
        onChange={() => {}}
        onError={() => {}}
        customClass="my-3"
      />
      <GlobalInput
        label="last Name"
        placeHolder="last Name"
        onChange={() => {}}
        onError={() => {}}
        customClass="my-3"
      />
      <GlobalInput
        label="email"
        placeHolder="Enter your email"
        onChange={() => {}}
        onError={() => {}}
        customClass="my-3"
      />
      <GlobalInput
        label="password"
        placeHolder="write your password"
        onChange={() => {}}
        onError={() => {}}
        customClass="my-3"
      />
    </View>
  );
};

export default Register;
