import { Box, Button, Text, VStack, View, Image, Badge, BadgeText } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import ConnectionCard from "@/components/ConnectionCard";
import { Pressable, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import FilterModalComponent from "@/components/FilterModalComponent";

const Home = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["100%"], []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack paddingHorizontal="$7">
        <Pressable  onPress={() => bottomSheetRef.current?.expand()} >
          <Text textAlign="right" color={Colors.tint} fontWeight="$semibold">
          Filter
        </Text>
        </Pressable>
        <Box justifyContent="center" alignItems="center" mb="$2">
          <Text color={Colors.text} fontSize="$sm" fontWeight="$extrabold">
            Daily Connections
          </Text>
          <View width="$40">
            <CustomButton title="Refresh" onPress={() => {}} />
          </View>
        </Box>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: "90%", // This is to ensure the last card is fully visible
          }}
        >
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
        </ScrollView>
        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
          <FilterModalComponent
            closeHandler={() => bottomSheetRef.current?.close()}
          />
          {/* <MeetingModalWrapper
            meetingModalHandler={() => bottomSheetRef.current?.close()}
          >
            <MeetingMode closeModal={() => bottomSheetRef.current?.close()} />
          </MeetingModalWrapper> */}
        </BottomSheet>
      </VStack>
    </SafeAreaView>
  );
};

export default Home;
