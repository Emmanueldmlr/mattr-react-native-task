import { Colors } from "@/constants/Colors";
import { Button, Text } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";
import React from "react";

type FilterListComponentProps = {
  data: string[];
  hasTopBorder: boolean;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  title: string;
};

const FilterListComponent = ({
  data,
  hasTopBorder,
  selectedItem,
  setSelectedItem,
  title,
}: FilterListComponentProps) => {
  const renderButton = (
    label: string,
    selected: boolean,
    onPress: () => void
  ) => (
    <Button
      onPress={onPress}
      backgroundColor={
        selected ? Colors.primary : Colors.light
      }
      rounded="$xl"
      mr="$2"
      my="$2"
      size="xs"
      key={label}
    >
      <Text
        color={selected ? "white" : Colors.primary}
        fontWeight="bold"
        fontSize="$xs"
      >
        {label}
      </Text>
    </Button>
  );

  return (
    <View
      mb="$4"
      borderTopWidth={hasTopBorder ? "$1" : "$0"}
      borderBottomWidth="$1"
      borderColor={Colors.default}
      py={hasTopBorder ? "$4" : "$0"}
      pb="$4"
    >
      <Text fontWeight="$normal" fontSize="$md" color={Colors.text}>
        {title}
      </Text>
      <View flexDirection="row" mt="$4">
        {data.map((item) =>
          //add key prop to the Button component
          renderButton(item, selectedItem === item, () => setSelectedItem(item))
        )}
      </View>
    </View>
  );
};

export default FilterListComponent;
