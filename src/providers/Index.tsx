import React, {ReactNode} from 'react';
import {CurrentScreenProvider} from './ScreenContext';
import {Provider} from 'react-redux';
import {store} from '../store';
type ProviderProps = {
  children: ReactNode;
};
const Providers = ({children}: ProviderProps) => {
  return (
    <Provider store={store}>
      <CurrentScreenProvider>{children}</CurrentScreenProvider>
    </Provider>
  );
};

export default Providers;
