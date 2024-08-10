import { Colors } from "@/constants/Colors";
import { Badge, BadgeText, HStack } from "@gluestack-ui/themed";
import React from "react";

const Interest = ({ interest }: { interest: string[] }) => {
  return (
    <HStack mt="$3" gap="$3">
      {interest.map((item, index) => (
        <Badge
          size="md"
          variant="solid"
          borderRadius="$2xl"
          action="success"
          px="$4"
          py="$1"
          bgColor={Colors.tint}
          key={index}
        >
          <BadgeText fontSize="$xs" fontWeight="semibold" color="$white">
            {item}
          </BadgeText>
        </Badge>
      ))}
    </HStack>
  );
};

export default Interest;
