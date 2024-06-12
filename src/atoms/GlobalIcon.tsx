import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../constants/colors';

interface GlobalIconProps {
  name: string;
  size?: number;
  color?: string;
}

const GlobalIcon = ({name, size = 32, color = '#fafafa'}: GlobalIconProps) => {
  const renderIcon = () => {
    // Check if the icon exists in SimpleLineIcon
    if (SimpleLineIcon.hasIcon('social-' + name)) {
      return (
        <SimpleLineIcon name={'social-' + name} size={size} color={color} />
      );
    }

    // If not found in SimpleLineIcon, check in MaterialIcon
    if (MaterialIcon.hasIcon(name)) {
      return <MaterialIcon name={name} size={size} color={color} />;
    }

    // If not found in both, render currency-inr from MaterialIcon as fallback
    return <MaterialIcon name="currency-inr" size={28} color={color} />;
  };

  return renderIcon();
};

export default GlobalIcon;
