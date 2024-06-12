import React, {createContext, useState, ReactNode} from 'react';

type ScreenContextProps = {
  currentScreenName: String;
  setCurrentScreenName: (screenName: String) => void;
};
type CurrentScreenProviderProps = {
  children: ReactNode;
};
export const CurrentScreenContext = createContext({
  currentScreenName: '',
  setCurrentScreenName: () => {},
} as ScreenContextProps);

export const CurrentScreenProvider = ({
  children,
}: CurrentScreenProviderProps) => {
  const [currentScreenName, setCurrentScreenName] = useState('');

  const value = {
    currentScreenName,
    setCurrentScreenName,
  };

  return (
    <CurrentScreenContext.Provider value={value}>
      {children}
    </CurrentScreenContext.Provider>
  );
};
