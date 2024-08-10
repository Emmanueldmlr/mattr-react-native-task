import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, View } from '@gluestack-ui/themed';
import React from 'react'
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import PaginationItem from './PaginationItem';

const CarouselComponent = ({
  carouselData,
  navigationHandler
}: {
  carouselData: string[];
    navigationHandler: () => void;
}) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
   const progress = useSharedValue<number>(0);
  return (
    <View
     style={{ position: "relative", width, height: height / 2 }}>
      <Carousel
        loop
        width={width}
        height={height / 2}
        autoPlay={false}
        data={carouselData}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        onProgressChange={(_, absoluteProgress) =>
          (progress.value = absoluteProgress)
        }
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            key={index}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
              }}
              style={{
                width,
                height: height / 2,
              }}
              alt="user image"
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
          style={{
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            bottom: 10, // Position the pagination slightly above the bottom
            left: 0,
            right: 0,
            alignItems: "center",
          }}
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

export default CarouselComponent
