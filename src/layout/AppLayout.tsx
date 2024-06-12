import {View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppNavigator from '../navigators/AppNavigator';
import {useGlobalLoader} from '../hooks/useGlobalLoader';
import GlobalLoader from '../atoms/GlobalLoader';
import useAuth from '../hooks/useAuth';
import Toast from 'react-native-toast-message';
import BottomNav from './BottomNav';
import {useCurrentScreen} from '../hooks/useCurrentScreen';
import {HOME, NAV_EXCLUDED_SCREENS} from '../constants/screenName';
import asyncStorage from '../helper/asyncStorage';

const AppLayout = () => {
  const {setAuthenticatedUserFromStorage} = useAuth();
  const {isLoading, toggle} = useGlobalLoader();
  const inActivityRef = useRef(null);
  const {currentScreenName, setCurrentScreenName} = useCurrentScreen();
  const [showBottomNav, setShowBottomNav] = useState(false);
  useEffect(() => {
    toggle(true);
    setTimeout(async () => {
      try {
        await setAuthenticatedUserFromStorage();
        setCurrentScreenName(HOME);
      } catch (err) {
      } finally {
        toggle(false);
      }
    }, 1000);
  }, []);

  const resetInActivity = () => {
    if (inActivityRef.current) {
      clearTimeout(inActivityRef.current);
    }
    inActivityRef.current = setTimeout(() => {
      setShowBottomNav(true);
    }, 1000);
  };
  const handleTouchStart = () => {
    if (NAV_EXCLUDED_SCREENS.includes(currentScreenName)) return;
    resetInActivity();
  };
  const handleTouchEnd = () => {
    if (NAV_EXCLUDED_SCREENS.includes(currentScreenName)) return;
    setShowBottomNav(false);
    resetInActivity();
  };

  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <View
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{flex: 1}}>
          <BottomNav
            isVisible={
              showBottomNav && !NAV_EXCLUDED_SCREENS.includes(currentScreenName)
            }>
            <AppNavigator />
            <Toast />
          </BottomNav>
        </View>
      )}
    </>
  );
};

export default AppLayout;
