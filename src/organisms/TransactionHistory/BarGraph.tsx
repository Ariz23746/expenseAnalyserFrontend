import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  Text,
  VictoryContainer,
} from 'victory-native';
import {colors} from '../../constants/colors';
import {Text as SVGText, Rect, Svg} from 'react-native-svg';
import LabelComponent from '../../molecules/TransactionHistory/BarGraph/LabelComponent';
import {useExpense} from '../../hooks/useExpense';
import useTransactionHistory from '../../hooks/useTransactionHistory';
import {barChartDataFormatter} from '../../helper/apiDataFormatter';
import GlobalIcon from '../../atoms/GlobalIcon';

const BarGraph = () => {
  // Month names to use as labels
  const [selected, setSelected] = useState(new Date().getMonth() + 1);
  const monthNames = [
    '_',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const {reports, isReportsLoading} = useTransactionHistory();
  const barChartData = barChartDataFormatter(reports);
  return (
    <View className="h-[100%] flex items-center justify-center">
      {!isReportsLoading ? (
        <VictoryChart
          containerComponent={<VictoryContainer disableContainerEvents />}
          theme={victoryTheme.material}
          domainPadding={24}
          width={360}
          height={180}
          padding={22}>
          <VictoryAxis
            style={{
              axis: {stroke: 'none'}, // Hide the x-axis line
              ticks: {stroke: colors.secondary}, // Color of the tick marks on the x-axis
              tickLabels: {
                stroke: ({tick}) => {
                  return tick === selected ? colors.light : colors.grey.shade3;
                },
                strokeWidth: ({tick}) => {
                  return tick === selected ? 0.8 : 0.5;
                },
                dy: 8,
                fontSize: 10,
                fontFamily: 'Manrope-ExtraLight',
              }, // Color and style of the labels on the x-axis
            }}
            tickFormat={t => monthNames[t]} // Format ticks to display month names
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: {stroke: 'none'}, // Hide the y-axis line
              ticks: {stroke: 'none'}, // Color of the tick marks on the y-axis
              tickLabels: {
                display: 'none',
                fontSize: 10,
                fontFamily: 'Manrope-Regular',
              }, // Color and style of the labels on the y-axis
            }}
          />
          <VictoryBar
            style={{
              data: {
                fill: ({datum}) =>
                  datum.x === selected ? colors.yellow : colors.grey.shade2,
                width: 35,
              },
              labels: {
                fill: colors.light,
                fontSize: 10,
                fontFamily: 'Manrope-Regular',
              },
            }}
            data={barChartData}
            cornerRadius={{
              top: 6,
              bottom: 6,
            }}
            labels={({datum}) => `₹ ${datum.y}`}
            labelComponent={<LabelComponent selected={selected} />}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: 'labels',
                        mutation: props => {
                          const index = props.index;
                          const selectedMonth = barChartData[index].x;
                          setSelected(selectedMonth);
                        },
                      },
                    ];
                  },
                  onClick: () => {
                    return [
                      {
                        target: 'labels',
                        mutation: props => {
                          const index = props.index;
                          const selectedMonth = barChartData[index].x;
                          setSelected(selectedMonth);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </VictoryChart>
      ) : (
        <View className="w-[400] h-[220] flex items-center justify-center">
          <ActivityIndicator size={48} color={colors.grey.shade1} />
        </View>
      )}
    </View>
  );
};

const victoryTheme = {
  material: {
    axis: {
      style: {
        grid: {
          stroke: 'none', // Remove grid lines from the theme
        },
      },
    },
  },
};

export default BarGraph;
