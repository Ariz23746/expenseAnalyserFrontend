import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {Text, View} from 'react-native';
const GlobalLoader = () => {
  return (
    <View className="flex flex-1 bg-primary items-center justify-center">
      <LottieView
        style={{width: '70%'}}
        autoPlay
        loop
        source={require('../../assets/images/globalLoader7.json')}
      />
    </View>
  );
};

export default GlobalLoader;
