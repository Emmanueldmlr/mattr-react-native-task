import { Colors } from "@/constants/Colors";
import { Button, Text } from "@gluestack-ui/themed";
import React from "react";

const CustomButton = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) => {
  return (
    <Button
      rounded="$xl"
      borderWidth={1.5}
      borderColor={Colors.primary}
      variant="outline"
      onPress={onPress}
      marginTop="$4"
    >
      <Text fontSize="$xs" fontWeight="$semibold" color={Colors.primary}>
        {title}
      </Text>
    </Button>
  );
};

export default CustomButton;
