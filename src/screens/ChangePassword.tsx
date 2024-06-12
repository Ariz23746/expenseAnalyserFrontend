import {View} from 'react-native';
import React, {useState} from 'react';
import GlobalInput from '../atoms/GlobalInput';
import ScreenHeader from '../molecules/common/ScreenHeader';
import GlobalButton from '../atoms/GlobalButton';
import GlobalImage from '../atoms/GlobalImage';
import icons from '../constants/icons';
import useAuth from '../hooks/useAuth';
import useNavigation from '../hooks/useNavigation';
import useToast from '../hooks/useToast';
import clsx from 'clsx';

const ChangePassword = () => {
  const [formState, setFormState] = useState({
    oldPassword: '',
    changedPassword: '',
  });
  const {changePassword} = useAuth();
  const {goBack} = useNavigation();
  const {showToast} = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    oldPassword: false,
    changedPassword: false,
  });
  const checkForEmptyField = () => {
    if (!formState.changedPassword || !formState.oldPassword) {
      showToast({
        type: 'error',
        mainText: 'Please fill all the mandatory fields',
      });

      setError({
        changedPassword: formState.changedPassword ? false : true,
        oldPassword: formState.oldPassword ? false : true,
      });
      return false;
    }
    return true;
  };
  const handleChangePassword = async () => {
    if (!checkForEmptyField()) return;
    setLoading(true);
    try {
      const response = await changePassword({...formState});
      showToast({
        type: 'success',
        mainText: response?.message,
      });
      goBack();
    } catch (error) {
      showToast({
        type: 'error',
        mainText: error?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    checkForEmptyField();
  };
  return (
    <View className="w-full h-full bg-primary4">
      <ScreenHeader
        headerText="Change password"
        customClass="mb-4"
        textCustomClass="mr-12"
      />

      <View className="px-4 mt-4 flex flex-1 flex-col items-center justify-center">
        <GlobalImage
          customClass="mb-8"
          isSvg={false}
          uri={icons['changePassword']}
          width={250}
          height={250}
          resizeMode="contain"
        />

        <GlobalInput
          label="Old password"
          placeHolder="Enter your old password"
          onChange={value =>
            setFormState(prevState => ({...prevState, oldPassword: value}))
          }
          containerClass="w-full"
          customClass={clsx(error.oldPassword ? 'border-red-400' : '')}
          isPassword
          onError={handleError}
        />
        <GlobalInput
          customClass={clsx(error.changedPassword ? 'border-red-400' : '')}
          label="New password"
          placeHolder="Enter your new password"
          onChange={value =>
            setFormState(prevState => ({...prevState, changedPassword: value}))
          }
          onError={handleError}
          containerClass="mt-4 w-full"
          isPassword
        />
        <GlobalButton
          containerClass="mt-8"
          isDisabled={loading}
          isLoading={loading}
          variant="md"
          label="Confirm"
          onClick={handleChangePassword}
          isOutline={false}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
