import { Colors } from "@/constants/Colors";
import { Text, View } from "@gluestack-ui/themed";
import React from "react";
import CarouselComponent from "@/components/carousel/CarouselComponent";
import Interest from "@/components/user/InterestComponent";
import UserDetails from "@/components/user/UserDetailsComponent";
import { useRouter } from "expo-router";
import { User } from "@/types/UserType";
import LoadingStateComponent from "../LoadingStateComponent";
import EmptyStateComponent from "../EmptyStateComponent";
import { getPhotosPaths } from "@/utils/userPhotosUtils";

type UserViewProps = {
  user: User | null | undefined;
  showFavIcon: boolean;
  isDataLoading: boolean;
};

const UserView = ({ user, showFavIcon, isDataLoading }: UserViewProps) => {
  const router = useRouter();

  if (isDataLoading) {
    return <LoadingStateComponent message="Loading user data..." />;
  }

  if (!user) {
    return (
      <EmptyStateComponent
        buttonTitle="Go Back"
        buttonHandler={() => router.back()}
        message="No user found"
      />
    );
  }

  return (
    <View>
      <CarouselComponent
        carouselData={getPhotosPaths(user.photos)}
        navigationHandler={() => router.back()}
      />
      <View paddingHorizontal="$4" mt="$6">
        <UserDetails hasLike={showFavIcon} user={user} />
        <View mt="$6">
          <Text fontSize="$sm" fontWeight="$bold" color={Colors.text}>
            Interests
          </Text>
          <Interest interest={user.interests} />
        </View>
      </View>
    </View>
  );
};

export default UserView;
