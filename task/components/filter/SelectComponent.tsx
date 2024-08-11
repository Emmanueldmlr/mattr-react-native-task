import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectInput,
  SelectIcon,
} from "@gluestack-ui/themed";
import { Colors } from '@/constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import { SORT_TYPE } from '@/constants/FilterData';


const SelectComponent = ({
    sortType,
    setSortType,
}: {
    sortType: string;
    setSortType: (value: string) => void;
}) => {
  return (
    <Select
      selectedValue={sortType}
      onValueChange={(value) => setSortType(value)}
    >
      <SelectTrigger
        borderColor={Colors.default}
        rounded="$xl"
        variant="outline"
        size="lg"
        mt="$4"
      >
        <SelectInput
          color={Colors.text}
          fontSize="$sm"
          placeholder="Select option"
          value={sortType}
        />

        <SelectIcon>
          <Ionicons
            name="chevron-down"
            size={20}
            color={Colors.default}
            mr="$4"
          />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent bg={Colors.greyBackground} py="$12">
          {SORT_TYPE.map((item) => (
            <SelectItem
              key={item.value}
              rounded="$xl"
              label={item.name}
              value={item.value}
              mt="$4"
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

export default SelectComponent
