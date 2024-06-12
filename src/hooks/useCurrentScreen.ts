import {useContext} from 'react';
import {CurrentScreenContext} from '../providers/ScreenContext';

export function useCurrentScreen() {
  const {setCurrentScreenName, currentScreenName} =
    useContext(CurrentScreenContext);

  return {
    currentScreenName,
    setCurrentScreenName,
  };
}
