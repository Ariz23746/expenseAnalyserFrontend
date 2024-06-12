import React from 'react';
import Card from '../../atoms/GlobalCard';
import {useColor} from '../../hooks/useColor';
import {FlatList} from 'react-native';
import {useExpense} from '../../hooks/useExpense';
const CategorySection = () => {
  const cards = [
    {
      month: 6,
      year: 2024,
      totalAmountSpent: 798,
      categoryName: 'food',
      categoryBudget: 5000,
      isDark: false,
      color: 'yellow',
    },
    {
      month: 6,
      year: 2024,
      totalAmountSpent: 0,
      categoryName: 'housing',
      categoryBudget: 5000,
      isDark: true,
      color: 'purple',
    },
    {
      month: 6,
      year: 2024,
      totalAmountSpent: 1500,
      categoryName: 'utilities',
      categoryBudget: 3000,
      isDark: false,
      color: 'green',
    },
    {
      month: 6,
      year: 2024,
      totalAmountSpent: 323,
      categoryName: 'sports',
      categoryBudget: 2000,
      isDark: false,
      color: 'light',
    },
  ];
  const {expenseByCategories} = useExpense();
  const colorObj = useColor();

  return (
    <FlatList
      horizontal
      data={expenseByCategories}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        const percentage = (item.totalAmountSpent / item.categoryBudget) * 100;
        const roundedPercentage = percentage > 0 ? percentage.toFixed(2) : 0;
        return (
          <Card
            title={item?.categoryName}
            amount={item?.categoryBudget.toString()}
            percentage={roundedPercentage}
            bgImage={colorObj[item?.color]}
            isDarkText={!item.isDark}
          />
        );
      }}
    />
  );
};

export default CategorySection;
