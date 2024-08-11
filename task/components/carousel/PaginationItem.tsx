import { Colors } from "@/constants/Colors";
import { View } from "@gluestack-ui/themed";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const PaginationItem: React.FC<{
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
}> = ({ animValue, index, length }) => {
  const width = 10;
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View
      backgroundColor={Colors.text}
      width={8}
      height={8}
      borderRadius={50}
      overflow="hidden"
      style={{
        transform: [
          {
            rotateZ: "0deg",
          },
        ],
      }}
      marginHorizontal={5}
      marginBottom={10}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: "white",
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default PaginationItem;
