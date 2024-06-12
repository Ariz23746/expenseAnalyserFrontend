import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import clsx from 'clsx';
import {capitalizeFirstLetter} from '../utils/stringUtils';
import {colors} from '../constants/colors';

interface GlobalInputProps {
  label: string;
  placeHolder: string;
  onChange: (arg0: string) => void;
  onError?: () => void;
  customClass?: string;
  textClass?: string;
  showLabel?: Boolean;
  isPassword?: boolean;
  type?: 'default' | 'numeric' | 'email-address';
  customFocusClass?: string;
  containerClass?: string;
  defaultValue?: string;
}
const GlobalInput = ({
  label,
  placeHolder,
  onChange = () => {},
  onError = () => {},
  customClass = '',
  textClass = '',
  showLabel = false,
  isPassword = false,
  type = 'default',
  customFocusClass = '',
  containerClass = '',
  defaultValue = '',
}: GlobalInputProps) => {
  const [inputText, setInputText] = useState('');
  const [isFocus, setFocus] = useState(false);

  const handleBlur = () => {
    setFocus(false);
  };

  const handleOnChangeText = (str: string) => {
    onChange(str);
  };
  return (
    <View className={containerClass}>
      {showLabel && (
        <Text className={clsx(' text-light font-regular my-2', textClass)}>
          {capitalizeFirstLetter(label)}
        </Text>
      )}
      <TextInput
        cursorColor={colors.light}
        className={clsx(
          'bg-[#1E1E1E] text-light font-regular rounded-md px-4',
          isFocus
            ? `border border-light ${customFocusClass}`
            : 'border border-grey-shade2',
          customClass,
        )}
        value={defaultValue}
        keyboardType={type}
        secureTextEntry={isPassword}
        onFocus={() => setFocus(true)}
        onChangeText={handleOnChangeText}
        onBlur={handleBlur}
        placeholder={capitalizeFirstLetter(placeHolder)}
        placeholderTextColor={!isFocus ? '#CDCECE' : '#FCFCFC'}
      />
    </View>
  );
};

export default GlobalInput;
