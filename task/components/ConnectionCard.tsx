import { Colors } from "@/constants/Colors";
import { User } from "@/types/UserType";
import { calculateAgeFromDOB } from "@/utils/dateUtils";
import { Badge, BadgeText, Box, Image, Text, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import CustomButton from "./CustomButton";

const ConnectionCard = ({ connection }: { connection: User }) => {
  const router = useRouter();
  return (
    <Box mt="$4">
      <Box>
        <Image
          size="full"
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
          source={{
            uri: connection.photos[0].path, //use the first photo
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
          {connection.first_name + "" + connection.last_name},{" "}
          {calculateAgeFromDOB(connection.dob)}
        </Text>
        <Text
          mt="$2"
          fontSize="$sm"
          fontWeight="$extrabold"
          color={Colors.text}
        >
          {connection.location.city + ", " + connection.location.country}
        </Text>
        <View mt="$2">
          <CustomButton
            title="Connect"
            onPress={() =>
              router.push({
                pathname: "/connection/[id]",
                params: { id: connection.id },
              })
            }
          />
        </View>
      </Box>
    </Box>
  );
};

export default ConnectionCard;
