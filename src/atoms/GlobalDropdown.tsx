import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import clsx from 'clsx';
import GlobalImage from './GlobalImage';

interface CategoryObj {
  name: string;
  icon: string;
  id: string;
  label: string;
}
interface CategorySelectProps {
  data: CategoryObj[];
  onSelect: (arg0: string) => void;
  defaultSelected: CategoryObj;
}
const CategorySelect = ({
  data,
  onSelect = () => {},
  defaultSelected,
}: CategorySelectProps) => {
  const [selectItem, setSelectItem] = useState(defaultSelected);
  return (
    <View className="flex w-full items-center my-4">
      <Text className={clsx('text-light font-regular items-start w-full')}>
        Select category
      </Text>
      <View className="w-full flex flex-row mt-3">
        {data.map(category => {
          return (
            <Pressable
              onPress={() => {
                setSelectItem(category);
                onSelect(category.id);
              }}
              className={clsx('flex items-center mx-2')}>
              <View
                className={clsx(
                  'p-2 rounded-lg',
                  selectItem.name === category.name
                    ? `border border-${
                        category.label ? category.label : '[#3BA971]'
                      } ${category.name === 'utilities' ? 'border' : ''}`
                    : '',
                )}>
                <GlobalImage
                  uri={category.icon}
                  isSvg={false}
                  height={48}
                  width={48}
                  customClass="bg-transparent p-0 -m-2"
                  resizeMode="contain"
                />
              </View>
              <Text className="mt-2 text-light font-regular text-[10px]">
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default CategorySelect;
