import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {navigationRef} from './hooks/useNavigation';
import Providers from './providers/Index';
import AppLayout from './layout/AppLayout';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Reactotron from '../ReactotronConfig';

function App(): React.JSX.Element {
  return (
    <Providers>
      <StatusBar backgroundColor={'#252525'} barStyle={'light-content'} />
      <NavigationContainer ref={navigationRef}>
        <GestureHandlerRootView>
          <AppLayout />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Providers>
  );
}

export default App;
