import { Colors } from "@/constants/Colors";
import { View, Text } from "@gluestack-ui/themed";
import React from "react";

const EmptyStateComponent = ({message}: {message: string}) => {
  return (
    <View justifyContent="center" alignItems="center" flex={1}>
      <Text fontSize="$sm" color={Colors.text}>
        {message}
      </Text>
    </View>
  );
};

export default EmptyStateComponent;
