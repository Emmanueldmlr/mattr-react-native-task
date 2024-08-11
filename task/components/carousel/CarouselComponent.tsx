import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View } from "@gluestack-ui/themed";
import React from "react";
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import PaginationItem from "./PaginationItem";

type CarouselComponentProps = {
  carouselData: string[];
  navigationHandler: () => void;
};

const CarouselComponent = ({
  carouselData,
  navigationHandler,
}: CarouselComponentProps) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const progress = useSharedValue<number>(0);
  return (
    <View position="relative" width={width} height={height / 2}>
      <Carousel
        loop
        width={width}
        height={height / 2}
        autoPlay={false}
        data={carouselData}
        scrollAnimationDuration={1000}
        onProgressChange={(_, absoluteProgress) =>
          (progress.value = absoluteProgress)
        }
        renderItem={({ index }) => (
          <View flex={1} justifyContent="center" key={index}>
            <Image
              source={{
                uri: carouselData[index],
              }}
              width={width}
              height={height / 2}
              alt="Connection image"
            />
          </View>
        )}
      />
      <Pressable
        position="absolute"
        top="$16"
        left="$4"
        onPress={navigationHandler}
      >
        <Ionicons name="close-outline" size={33} color="#fff" />
      </Pressable>
      {!!progress && (
        <View
          flexDirection="row"
          justifyContent="center"
          position="absolute"
          bottom="$2" // Position the pagination slightly above the bottom
          left="$0"
          right="$0"
          alignItems="center"
        >
          {carouselData.map((_, index) => {
            return (
              <PaginationItem
                animValue={progress}
                index={index}
                key={index}
                length={carouselData.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default CarouselComponent;
