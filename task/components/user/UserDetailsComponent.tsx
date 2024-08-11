import { Colors } from "@/constants/Colors";
import { useConnections } from "@/contexts/ConnectionContext";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Text, View, VStack } from "@gluestack-ui/themed";
import React from "react";
import { Pressable } from "react-native";

const UserDetails = ({
  name,
  age,
  location,
  bio,
  hasLike,
  likeStatus,
  connectionId
}: {
  name: string;
  age: number;
  location: string;
  bio: string;
  hasLike: boolean;
  likeStatus?: boolean;
  connectionId: number;
}) => {
      const { toggleConnectionLike } = useConnections();
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
        {hasLike
         && 
          <Pressable
            onPress={() => {
              //add toggleConnectionLike function
              toggleConnectionLike(connectionId);
            }
          }>
            <Ionicons name={
            likeStatus ? "heart" : "heart-outline"
          } size={35} color={Colors.tint} />
          </Pressable>
        }
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
