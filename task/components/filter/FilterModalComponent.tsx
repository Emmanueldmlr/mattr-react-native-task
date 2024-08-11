import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SelectIcon, SelectInput } from "@gluestack-ui/themed";
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

const genders = ["MALE", "FEMALE"];
const ageRanges = ["20 - 24", "25 - 30", "30 - 40", "40+"];

const FilterComponent = ({ closeHandler }: { closeHandler: () => void }) => {
  const [selectedGender, setSelectedGender] = useState("FEMALE");
  const [selectedAgeRange, setSelectedAgeRange] = useState("25 - 30");
  const [sortType, setSortType] = React.useState("Score");

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
            <Text fontSize="$sm" fontWeight="$bold" color={Colors.tint}>
              Cancel
            </Text>
          </Pressable>
          <Text fontSize="$md" fontWeight="$bold" color={Colors.text}>
            Filter
          </Text>
          <Pressable onPress={closeHandler}>
            <Text fontSize="$sm" fontWeight="$bold" color={Colors.tint}>
              Clear All
            </Text>
          </Pressable>
        </HStack>
        <View p="$2" mt="$6">
          <FilterListComponent
            title="Gender"
            data={genders}
            hasTopBorder={true}
            selectedItem={selectedGender}
            setSelectedItem={setSelectedGender}
          />
          <FilterListComponent
            title="Age Ranges"
            data={ageRanges}
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
        backgroundColor={Colors.tint}
        onPress={closeHandler}
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
