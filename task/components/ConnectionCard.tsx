import { Colors } from "@/constants/Colors";
import { Badge, BadgeText, Box, Image, Text, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import CustomButton from "./CustomButton";

const ConnectionCard = () => {
  const router = useRouter();
  return (
    <Box mt="$4">
      <Box>
        <Image
          size="full"
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
          source={{
            uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          }}
          height={237}
          alt="user image"
        />
        <Badge
          size="md"
          variant="solid"
          borderRadius="$2xl"
          action="success"
          position="absolute"
          top="$2"
          right="$2"
          px="$4"
          py="$1"
          bgColor={Colors.tint}
        >
          <BadgeText fontSize="$xs" fontWeight="bold" color="$white">
            TOP MATCH
          </BadgeText>
        </Badge>
      </Box>
      <Box
        p="$4"
        bgColor={Colors.cardBackground}
        borderBottomLeftRadius="$xl"
        borderBottomRightRadius="$xl"
      >
        <Text fontSize="$xl" fontWeight="$normal">
          John Doe, 23
        </Text>
        <Text
          mt="$2"
          fontSize="$sm"
          fontWeight="$extrabold"
          color={Colors.text}
        >
          London, United Kingdom
        </Text>
        <View mt="$2">
          <CustomButton
            title="Connect"
            onPress={() =>
              router.push({
                pathname: "/connection/[id]",
                params: { id: "1" },
              })
            }
          />
        </View>
      </Box>
    </Box>
  );
};

export default ConnectionCard;
