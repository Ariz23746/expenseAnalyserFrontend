import React, {FC} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import clsx from 'clsx'; // Assuming you have set up nativewind correctly

interface GlobalButtonProps {
  label: string;
  isOutline?: boolean;
  onClick: () => void;
  containerClass?: string;
  variant: 'sm' | 'md' | 'lg';
  textCustomClass?: string;
  isDisabled: Boolean;
  isLoading: Boolean;
}

const GlobalButton: FC<GlobalButtonProps> = ({
  label,
  isOutline = false,
  onClick,
  containerClass = '',
  variant,
  textCustomClass = '',
  isDisabled = false,
  isLoading = false,
}) => {
  // Define size variants
  const sizeVariants = {
    sm: 'py-2 px-4',
    md: 'py-4 px-12 w-full',
    lg: 'py-6 px-12 w-full',
  };

  // Combine base styles with props-based styles
  const buttonClass = clsx(
    'rounded-md ',
    sizeVariants[variant],
    isOutline ? 'border border-light bg-primary' : 'bg-secondary',
    isDisabled ? 'opacity-50' : '',
  );

  const textClass = clsx(
    isOutline ? 'text-light' : ' text-light',
    'text-center font-medium',
    textCustomClass,
  );

  return (
    <View className={clsx('w-full', containerClass)}>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onClick}
        className={`${buttonClass}`}>
        {!isLoading ? (
          <Text className={`${textClass}`}>{label}</Text>
        ) : (
          <ActivityIndicator size={'small'} color={'#FCFCFC'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GlobalButton;
