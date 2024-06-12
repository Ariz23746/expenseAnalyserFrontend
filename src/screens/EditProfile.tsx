import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import ScreenHeader from '../molecules/common/ScreenHeader';
import GlobalInput from '../atoms/GlobalInput';
import useAuth from '../hooks/useAuth';
import GlobalImage from '../atoms/GlobalImage';
import GlobalIcon from '../atoms/GlobalIcon';
import {colors} from '../constants/colors';
import GlobalButton from '../atoms/GlobalButton';
import clsx from 'clsx';
import {isValidEmail} from '../utils/validator';
import useToast from '../hooks/useToast';
import ImageCropPicker from 'react-native-image-crop-picker';
import useNavigation from '../hooks/useNavigation';

const EditProfile = () => {
  const {user, editProfileInfo} = useAuth();
  const {showToast} = useToast();
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });
  const {goBack} = useNavigation();

  const [image, setImage] = useState(null);

  const [emailError, setEmailError] = useState(false);

  const isFormValid = () => {
    if (editForm.email && !isValidEmail(editForm.email)) {
      setEmailError(true);

      showToast({
        type: 'error',
        mainText: 'Please enter a valid email address',
      });
      return false;
    }
    return true;
  };

  const shouldDisable = () => {
    return (
      !image &&
      editForm.firstName === user.firstName &&
      editForm.lastName === user.lastName &&
      editForm.email === user.email
    );
  };
  const handleOnChangeText = (
    value: string,
    keyName: 'email' | 'firstName' | 'lastName',
  ) => {
    setEditForm(prevState => ({...prevState, [keyName]: value}));
  };
  const handleOnImageChange = async () => {
    try {
      const response = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        width: 400,
        height: 400,
        cropping: true,
      });
      console.log('response', response);
      setImage(response);
    } catch (error) {
      console.log('err', error);
    }
  };
  const handleOnSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    const form = new FormData();
    form.append('firstName', editForm.firstName);
    form.append('lastName', editForm.lastName);
    form.append('email', editForm.email);
    if (image) {
      const nn = JSON.stringify(image.path).substring(
        JSON.stringify(image.path).lastIndexOf('/') + 1,
        image.path.length + 1,
      );
      const uploadedImage = {
        name: nn,
        uri: image.path,
        type: image.mime,
        size: image.size,
        lastModifiedDate: JSON.parse(image.modificationDate),
        uid: image.modificationDate,
      };

      form.append('avatar', uploadedImage);
    }
    try {
      editProfileInfo({file: form});
      showToast({
        type: 'success',
        mainText: 'Successfully edited the profile',
      });
      goBack();
    } catch (err) {
      console.warn('err', err);
      showToast({
        type: 'error',
        mainText: 'error while editing the profile',
      });
    }
  };
  return (
    <View className="w-full h-full bg-primary4">
      <ScreenHeader headerText="Edit profile" textCustomClass="mr-12" />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="px-4 mt-4 flex flex-1 flex-col items-center justify-start">
          <View className="flex relative rounded-full mb-4">
            <GlobalImage
              customClass="rounded-full"
              uri={image && image?.path ? image.path : user?.avatar}
              isFromUrl={true}
              width={80}
              height={80}
              resizeMode="cover"
              isSvg={false}
            />
            <Pressable
              onPress={handleOnImageChange}
              className="absolute bottom-0 right-0">
              <GlobalIcon
                name="circle-edit-outline"
                size={24}
                color={colors.grey.shade1}
              />
            </Pressable>
          </View>
          <GlobalInput
            showLabel
            defaultValue={editForm?.firstName}
            label="first Name"
            placeHolder="Enter your firstName"
            onChange={value => {
              handleOnChangeText(value, 'firstName');
            }}
            containerClass="w-full"
          />
          <GlobalInput
            showLabel
            defaultValue={editForm?.lastName}
            label="Last Name"
            placeHolder="Enter your last name"
            onChange={value => {
              handleOnChangeText(value, 'lastName');
            }}
            containerClass="mt-4 w-full"
          />
          <GlobalInput
            showLabel
            defaultValue={editForm?.email}
            label="Email"
            placeHolder="Enter your email"
            onChange={value => {
              handleOnChangeText(value, 'email');
            }}
            customClass={clsx(emailError ? 'border border-red-400' : '')}
            textClass={clsx(emailError ? 'text-red-400' : '')}
            containerClass="mt-4 w-full"
          />
        </View>
        <GlobalButton
          onClick={handleOnSubmit}
          isLoading={false}
          isDisabled={shouldDisable()}
          label="Submit"
          containerClass="pb-4 px-4"
          variant="md"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfile;
