import { Colors } from "@/constants/Colors";
import { View, Text, Button } from "@gluestack-ui/themed";
import React from "react";
import CustomButton from "./CustomButton";

const EmptyStateComponent = ({
  message,
  buttonHandler,
  buttonTitle,
}: {
  message: string;
  buttonTitle: string;
  buttonHandler: () => void;
}) => {
  return (
    <View justifyContent="center" alignItems="center" flex={1}>
      <Text fontSize="$sm" color={Colors.text}>
        {message}
      </Text>
      <CustomButton title={buttonTitle} onPress={buttonHandler} />
    </View>
  );
};

export default EmptyStateComponent;
