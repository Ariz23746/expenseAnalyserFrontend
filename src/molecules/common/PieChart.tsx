import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constants/colors';
import {useExpense} from '../../hooks/useExpense';
import {getPieChartData} from '../../helper/apiDataFormatter';
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryPie,
} from 'victory-native';
import {capitalizeFirstLetter} from '../../utils/stringUtils';

type SelectedPieType = {
  label: string;
  y: number | null;
  color: string;
  name: string;
  id: string;
} | null;

type PieChartProps = {
  pieChartData: SelectedPieType[];
  colorScales: string[];
  width: number;
  height: number;
  outerRadius: number;
  innerRadius: number;
  shouldSelectByDefault?: boolean;
  shouldIndividualPieClickable?: boolean;
  shouldShowLabel?: boolean;
};
const PieChart = ({
  pieChartData,
  colorScales,
  width,
  height,
  outerRadius,
  innerRadius,
  shouldSelectByDefault = false,
  shouldIndividualPieClickable = true,
  shouldShowLabel = false,
}: PieChartProps) => {
  const [selectedPie, setSelectedPie] = useState<SelectedPieType>(
    shouldSelectByDefault ? pieChartData[0] : null,
  );
  const containerStyle = StyleSheet.create({
    container: {
      width: width,
      height: height,
      flex: 1,
      overflow: 'visible',
    },
  });
  return (
    <View
      style={containerStyle.container}
      className="relative py-4 px-4 flex items-center justify-center h-[100%]">
      <VictoryChart
        width={width}
        height={height}
        padding={40}
        containerComponent={<VictoryContainer disableContainerEvents />}>
        <VictoryAxis
          style={{
            axis: {stroke: 'none'}, // Hide the x-axis line
            ticks: {stroke: 'none'}, // Color of the tick marks on the x-axis
            tickLabels: {
              display: 'none',
            },
            // Color and style of the labels on the x-axis
          }}
          // Format ticks to display month names
        />
        <VictoryAxis
          style={{
            axis: {stroke: 'none'}, // Hide the y-axis line
            ticks: {stroke: 'none'}, // Color of the tick marks on the y-axis
            tickLabels: {
              display: 'none',
            }, // Color and style of the labels on the y-axis
          }}
        />
        <VictoryPie
          width={width}
          height={height}
          data={pieChartData}
          colorScale={colorScales}
          radius={({datum, index}) => {
            return selectedPie && selectedPie?.name === datum.name
              ? outerRadius + 4
              : outerRadius;
          }}
          innerRadius={innerRadius}
          style={{
            labels: {
              display: 'none',
              fill: colors.primary,
              fontSize: '10px',
              fontFamily: 'Manrope-Regular',
            },
          }}
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
                        if (!shouldIndividualPieClickable) return;
                        if (
                          selectedPie &&
                          selectedPie.name === pieChartData[index].name
                        ) {
                          setSelectedPie(null);
                          return;
                        }
                        const categoryClicked = pieChartData[index];
                        setSelectedPie(categoryClicked);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
      </VictoryChart>
      {shouldIndividualPieClickable && selectedPie && (
        <View
          style={{borderColor: selectedPie.color}}
          className="border rounded-2xl flex flex-row items-center justify-center w-[110px] px-1 py-1 absolute -bottom-[4px] -left-[90px] z-10 text-light">
          <View
            style={{backgroundColor: selectedPie?.color}}
            className="w-[10px] h-[10px] rounded-full"
          />
          <View className="ml-1 flex items-center">
            <Text className="text-white font-regular text-[10px]">
              {selectedPie?.label + '%'}
              {' of '}
              <Text className="font-extraBold">
                {capitalizeFirstLetter(selectedPie?.name)}
              </Text>
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default PieChart;
