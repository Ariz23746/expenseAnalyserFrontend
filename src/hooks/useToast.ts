import Toast from 'react-native-toast-message';

interface showToastProps {
  type: 'success' | 'error' | 'info';
  mainText: string;
  subText?: string;
  position?: 'top' | 'bottom';
  onHide?: () => void;
  onShow?: () => void;
  swipeToHide?: boolean;
  visibilityTime?: number;
  autoHide?: boolean;
}
const useToast = () => {
  const showToast = ({
    type,
    mainText,
    subText,
    position = 'top',
    swipeToHide = true,
    autoHide = true,
    visibilityTime = 2000,
  }: showToastProps) => {
    Toast.show({
      type,
      text1: mainText,
      text2: subText,
      swipeable: swipeToHide,
      visibilityTime,
      autoHide,
      position,
    });
  };

  return {showToast};
};

export default useToast;
