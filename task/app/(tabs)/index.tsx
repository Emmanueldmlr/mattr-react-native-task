import { Box, Button, Text, VStack, View, Image, Badge, BadgeText } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import ConnectionCard from "@/components/ConnectionCard";
import { ScrollView } from "react-native";
const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack paddingHorizontal="$7">
        <Text textAlign="right" color={Colors.tint} fontWeight="$semibold">
          Filter
        </Text>
        <Box justifyContent="center" alignItems="center" mb="$2">
          <Text color={Colors.text} fontSize="$sm" fontWeight="$extrabold">
            Daily Connections
          </Text>
          <View width="$40">
            <CustomButton title="Refresh" onPress={() => {}} />
          </View>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          height: "90%", // This is to ensure the last card is fully visible
        }}>
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};

export default Home;
