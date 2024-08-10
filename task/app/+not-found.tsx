import { View, Text } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>Page not found</Text>
      </View>
    </>
  );
}
