import { Colors } from "@/constants/Colors";
import {
  AGE_RANGE,
  AGE_RANGE_ENUM,
  GENDER,
  GENDER_ENUM,
  SORT_TYPE_ENUM,
} from "@/constants/FilterData";
import { useConnections } from "@/contexts/ConnectionContext";
import {
  View,
  Text,
  VStack,
  HStack,
  Button,
  Pressable,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import FilterListComponent from "./FilterListComponent";
import SelectComponent from "./SelectComponent";

const FilterComponent = ({ closeHandler }: { closeHandler: () => void }) => {
  const [selectedGender, setSelectedGender] = useState(GENDER_ENUM.male);
  const [selectedAgeRange, setSelectedAgeRange] = useState(
    AGE_RANGE_ENUM.twentyFiveToThirty
  );
  const [sortType, setSortType] = React.useState(SORT_TYPE_ENUM.score);
  const { applyFilters } = useConnections();

  const resetFilters = () => {
    setSelectedGender("");
    setSelectedAgeRange("");
    setSortType(SORT_TYPE_ENUM.score);
  };

  const filterConnections = () => {
    applyFilters({
      sortBy: sortType,
      ageRange: selectedAgeRange,
      gender: selectedGender,
    });
    closeHandler();
  };

  return (
    <VStack
      flex={1}
      px="$6"
      justifyContent="space-between"
      display="flex"
      flexDirection="column"
    >
      <View>
        <HStack justifyContent="space-between">
          <Pressable onPress={closeHandler}>
            <Text fontSize="$sm" fontWeight="$bold" color={Colors.primary}>
              Cancel
            </Text>
          </Pressable>
          <Text fontSize="$md" fontWeight="$bold" color={Colors.text}>
            Filter
          </Text>
          <Pressable onPress={resetFilters}>
            <Text fontSize="$sm" fontWeight="$bold" color={Colors.primary}>
              Clear All
            </Text>
          </Pressable>
        </HStack>
        <View p="$2" mt="$6">
          <FilterListComponent
            title="Gender"
            data={GENDER}
            hasTopBorder={true}
            selectedItem={selectedGender}
            setSelectedItem={setSelectedGender}
          />
          <FilterListComponent
            title="Age Ranges"
            data={AGE_RANGE}
            hasTopBorder={false}
            selectedItem={selectedAgeRange}
            setSelectedItem={setSelectedAgeRange}
          />
        </View>
        <View>
          <Text px="$2" fontSize="$sm" fontWeight="$bold" color={Colors.text}>
            Sort by
          </Text>
          <SelectComponent sortType={sortType} setSortType={setSortType} />
        </View>
      </View>

      <Button
        rounded="$xl"
        backgroundColor={Colors.primary}
        onPress={filterConnections}
        my="$4"
      >
        <Text fontSize="$xs" fontWeight="$semibold" color="#fff">
          Apply Filters
        </Text>
      </Button>
    </VStack>
  );
};

export default FilterComponent;
