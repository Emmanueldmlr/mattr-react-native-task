import { Colors } from "@/constants/Colors";
import { useConnections } from "@/contexts/ConnectionContext";
import { User } from "@/types/UserType";
import { calculateAgeFromDOB } from "@/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Text, View, VStack } from "@gluestack-ui/themed";
import React from "react";
import { Pressable } from "react-native";

const UserDetails = ({ hasLike, user }: { hasLike: boolean; user: User }) => {
  const { toggleConnectionLike } = useConnections();
  return (
    <View>
      <HStack justifyContent="space-between">
        <VStack>
          <Text fontSize="$lg" fontWeight="$extrabold" color={Colors.text}>
            {user.first_name + " " + user.last_name},{" "}
            {calculateAgeFromDOB(user.dob)}
          </Text>
          <Text mt="$2" fontSize="$md" fontWeight="$normal" color={Colors.text}>
            {user.location.city + ", " + user.location.country}
          </Text>
        </VStack>
        {hasLike && (
          <Pressable
            onPress={() => {
              //add toggleConnectionLike function
              toggleConnectionLike(user.id);
            }}
          >
            <Ionicons
              name={user.isLiked ? "heart" : "heart-outline"}
              size={35}
              color={Colors.primary}
            />
          </Pressable>
        )}
      </HStack>
      <Text
        mt="$6"
        fontSize="$sm"
        fontWeight="$normal"
        color={Colors.text}
        lineHeight="$2xs"
      >
        {user.bio}
      </Text>
    </View>
  );
};

export default UserDetails;
