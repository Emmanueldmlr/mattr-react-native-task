import { Colors } from '@/constants/Colors';
import { Button, Text } from '@gluestack-ui/themed';
import React from 'react'

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
      borderColor={Colors.tint}
      variant="outline"
      onPress={onPress}
      marginTop="$4"
    >
      <Text fontSize="$xs" fontWeight="$semibold" color={Colors.tint}>
        {title}
      </Text>
    </Button>
  );
}

export default CustomButton
