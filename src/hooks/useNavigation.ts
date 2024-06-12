import {createNavigationContainerRef} from '@react-navigation/native';
import {useCurrentScreen} from './useCurrentScreen';
import {HOME} from '../constants/screenName';

interface navigateProps {
  screenName: String;
  screenParams?: String;
}
export const navigationRef = createNavigationContainerRef();
export default function useNavigation() {
  const {setCurrentScreenName} = useCurrentScreen();
  const navigate = ({screenName = '', screenParams = {}}: navigateProps) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(screenName, screenParams);
      setCurrentScreenName(screenName);
    }
  };

  const goBack = () => {
    if (navigationRef.isReady()) {
      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        setCurrentScreenName(HOME);
      }
    }
  };

  return {
    navigate,
    goBack,
  };
}
