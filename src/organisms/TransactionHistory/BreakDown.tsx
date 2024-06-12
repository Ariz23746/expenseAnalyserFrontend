import {View, Text, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';
import {getBreakDownData, getPieChartData} from '../../helper/apiDataFormatter';
import {useExpense} from '../../hooks/useExpense';
import PieChart from '../../molecules/common/PieChart';
import {currencyCommaSeperator} from '../../utils/stringUtils';
import BreakDownCard from '../../molecules/TransactionHistory/BreakDownCard';
import useTransactionHistory from '../../hooks/useTransactionHistory';
import {colors} from '../../constants/colors';

const BreakDown = () => {
  const {expenseByCategories, getMoneyInfo} = useExpense();
  const {pieChartData, colorScales} = getPieChartData(
    expenseByCategories,
    'history',
  );
  const {reports, budgets, isReportsLoading} = useTransactionHistory();
  const {budgetLeft} = getMoneyInfo;
  const breakDownData = getBreakDownData(reports, budgets);
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const pieChartSize = Math.min(screenWidth, screenHeight) * 0.46; // 40% of the smaller dimension
  const outerRadius = pieChartSize / 2;
  const innerRadius = outerRadius * 0.6;

  return (
    <View className="flex-1">
      <View className="justify-self-start w-full">
        <Text className="text-light font-extraBold text-base">Breakdown</Text>
      </View>

      <View className="flex-1 w-full flex items-center justify-center">
        {isReportsLoading ? (
          <View className="flex-1 flex items-center justify-center">
            <ActivityIndicator size={48} color={colors.grey.shade1} />
          </View>
        ) : (
          <View className="flex-1 w-full flex ">
            <View className="mt-2 relative w-full max-w-[420px] items-center flex-grow flex-1">
              <View className="h-[100%]">
                <PieChart
                  colorScales={colorScales}
                  pieChartData={pieChartData}
                  width={pieChartSize + 20}
                  height={pieChartSize + 20}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  shouldSelectByDefault={true}
                  shouldIndividualPieClickable={false}
                />
              </View>
              <View
                style={{
                  transform: [
                    {
                      translateX: -20,
                    },
                    {
                      translateY: -15,
                    },
                  ],
                }}
                className="absolute top-[50%] left-[50%] w-100 h-100">
                <Text className="text-light text-[10px] font-extraLight">
                  Balance
                </Text>
                <Text
                  style={{
                    transform: [
                      {
                        translateX: -16,
                      },
                    ],
                  }}
                  className="text-light text-base font-extraBold">
                  ₹ {currencyCommaSeperator(budgetLeft + '')}
                </Text>
              </View>
            </View>
            <View className="h-[170px] justify-self-start mt-8 flex flex-row justify-around w-full">
              {breakDownData?.map((cardData, index) => {
                return (
                  <BreakDownCard
                    index={index}
                    cardSubtitle={cardData.cardSubtitle}
                    variant={cardData.variant}
                    type={cardData.type}
                    amount={cardData.amount}
                    cardTitle={cardData.cardTitle}
                    percentage={cardData?.percentage}
                    marginLeft={cardData?.marginLeft}
                    isFallback={cardData?.isFallback}
                  />
                );
              })}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default BreakDown;
