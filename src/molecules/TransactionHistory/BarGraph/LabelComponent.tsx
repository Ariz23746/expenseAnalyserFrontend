import React from 'react';
import {Svg, Rect, Text as SVGText, Path} from 'react-native-svg';
import {colors} from '../../../constants/colors';
import {View} from 'react-native';

const LabelComponent = (props: any) => {
  const {x, y, datum} = props;
  const isSelected = datum.x === props.selected;
  if (!isSelected) return;
  const triangleSize = 6;
  return (
    <Svg x={x} y={y} width={100} height={30}>
      <Path
        d={`M${x},${y - 12} L${x - triangleSize - 4},${
          y - triangleSize - 20
        } L${x + triangleSize + 4},${y - triangleSize - 20} Z`}
        fill={colors.light}
      />
      <Rect
        x={x - 25}
        y={y - 40}
        rx={8}
        ry={8}
        width={50}
        height={20}
        fill={colors.light}
        stroke={colors.light}
        strokeWidth={1}
        shadowOpacity={0.1}
      />
      <SVGText
        x={x}
        y={y - 26}
        textAnchor="middle"
        fill={colors.primary}
        fontSize={10}
        fontFamily="Manrope-Bold">
        {`₹ ${datum.y}`}
      </SVGText>
    </Svg>
  );
};

export default LabelComponent;
