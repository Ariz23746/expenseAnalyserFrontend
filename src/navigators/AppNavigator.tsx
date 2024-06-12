import React, {useEffect, useState} from 'react';
import Onboarding from '../screens/Onboarding';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
import {useGlobalLoader} from '../hooks/useGlobalLoader';
import ExpenseHistory from '../screens/ExpenseHistory';
import AddExpense from '../screens/AddExpense';
import {
  ADD_EXPENSE,
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  EXPENSE_HISTORY,
  HISTORY,
  HOME,
  LOGIN,
  ON_BOARD,
  PROFILE,
  REGISTER,
} from '../constants/screenName';
import TransactionHistory from '../screens/TransactionHistory';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import {useCurrentScreen} from '../hooks/useCurrentScreen';
import useTokenHandler from '../hooks/useTokenHandler';
import {setupInterceptors} from '../helper/axiosInterceptor';
const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  const {isAuthenticated} = useAuth();
  const {toggle} = useGlobalLoader();
  const {setCurrentScreenName} = useCurrentScreen();
  const {handleRefreshTokenExpired} = useTokenHandler();
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentScreenName(ON_BOARD);
      return;
    }
    // setCurrentScreenName(HOME);
    toggle(false);
  }, [isAuthenticated, toggle]);

  useEffect(() => {
    setupInterceptors(handleRefreshTokenExpired);
  }, [handleRefreshTokenExpired]);

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen
            name={ON_BOARD}
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={REGISTER}
            component={Register}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={LOGIN}
            component={Login}
            options={{headerShown: false}}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          {/* <Stack.Screen
            name={EDIT_PROFILE}
            component={EditProfile}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name={HOME}
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={EXPENSE_HISTORY}
            component={ExpenseHistory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ADD_EXPENSE}
            component={AddExpense}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={HISTORY}
            component={TransactionHistory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={PROFILE}
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={EDIT_PROFILE}
            component={EditProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={CHANGE_PASSWORD}
            component={ChangePassword}
            options={{headerShown: false}}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
