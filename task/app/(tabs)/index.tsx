import {
  Box,
  Button,
  Text,
  VStack,
  View,
  Image,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import ConnectionCard from "@/components/ConnectionCard";
import { Pressable, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import FilterModalComponent from "@/components/filter/FilterModalComponent";
import { useConnections } from "@/contexts/ConnectionContext";
import LoadingStateComponent from "@/components/LoadingStateComponent";
import EmptyStateComponent from "@/components/EmptyStateComponent";

const Home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const {connections, isLoading, refreshConnections} = useConnections()
  if (isLoading) {
    return <LoadingStateComponent message="Loading connections..." />
  }
  if (!connections || !connections.length) {
    return <EmptyStateComponent message="No connections found" buttonTitle="Refresh" buttonHandler={refreshConnections} />
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack paddingHorizontal="$7">
        <Pressable onPress={() => bottomSheetRef.current?.expand()}>
          <Text textAlign="right" color={Colors.tint} fontWeight="$semibold">
            Filter
          </Text>
        </Pressable>
        <Box justifyContent="center" alignItems="center" mb="$2">
          <Text color={Colors.text} fontSize="$sm" fontWeight="$extrabold">
            Daily Connections
          </Text>
          <View width="$40">
            <CustomButton title="Refresh" onPress={refreshConnections} />
          </View>
        </Box>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: "90%", // This is to ensure the last card is fully visible
          }}
        >
          {
            connections.map((connection, index) => (
              <ConnectionCard key={index} connection={connection} />
            ))
          }
        </ScrollView>
        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
          <FilterModalComponent
            closeHandler={() => bottomSheetRef.current?.close()}
          />
        </BottomSheet>
      </VStack>
    </SafeAreaView>
  );
};

export default Home;
