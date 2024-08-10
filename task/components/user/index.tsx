import { Colors } from "@/constants/Colors";
import { Text, View } from "@gluestack-ui/themed";
import React from "react";
import CarouselComponent from "@/components/carousel/CarouselComponent";
import Interest from "@/components/user/InterestComponent";
import UserDetails from "@/components/user/UserDetailsComponent";
import { useRouter } from "expo-router";

const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

const UserView = ({
  user,
  showFavIcon,
}: {
  user: any;
  showFavIcon: boolean;
}) => {
  const router = useRouter();
  return (
    <View>
      <CarouselComponent
        carouselData={colors}
        navigationHandler={() => router.back()}
      />
      <View paddingHorizontal="$4" mt="$6">
        <UserDetails
          hasLike
          name="Frank Stark"
          age={25}
          location="San Francisco, CA"
          bio="Hey, I'm Frank, a 23-year-old marketing enthusiast who loves outdoor adventures. Whether it's hiking or a cozy night in, I embrace every moment with enthusiasm. My infectious humor and love for deep conversations define me. I'm seeking a partner ready for genuine connections and new adventures. Connect with me and let's dive in!"
        />
        <View mt="$6">
          <Text fontSize="$sm" fontWeight="$bold" color={Colors.text}>
            Interests
          </Text>
          <Interest interest={["Hiking", "Running", "Outdoors"]} />
        </View>
      </View>
    </View>
  );
};

export default UserView;
