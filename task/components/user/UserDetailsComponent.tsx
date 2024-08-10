import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Text, View, VStack } from "@gluestack-ui/themed";
import React from "react";

const UserDetails = ({
  name,
  age,
  location,
  bio,
  hasLike,
  likeStatus,
}: {
  name: string;
  age: number;
  location: string;
  bio: string;
  hasLike: boolean;
  likeStatus?: boolean;
}) => {
  return (
    <View>
      <HStack justifyContent="space-between">
        <VStack>
          <Text fontSize="$lg" fontWeight="$extrabold" color={Colors.text}>
            {name}, {age}
          </Text>
          <Text mt="$2" fontSize="$md" fontWeight="$normal" color={Colors.text}>
            {location}
          </Text>
        </VStack>
        {hasLike && <Ionicons name="heart" size={33} color={Colors.tint} />}
      </HStack>
      <Text
        mt="$6"
        fontSize="$sm"
        fontWeight="$normal"
        color={Colors.text}
        lineHeight="$2xs"
      >
        {bio}
      </Text>
    </View>
  );
};

export default UserDetails;
