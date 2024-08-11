import { Colors } from '@/constants/Colors';
import { View, Text } from '@gluestack-ui/themed';
import React from 'react'
import { ActivityIndicator } from 'react-native';

const LoadingStateComponent = ({message}: {message: string}) => {
  return (
    <View justifyContent="center" alignItems="center" flex={1}>
      <ActivityIndicator size="large" color={Colors.tint} />
      <Text fontSize="$sm" color={Colors.text} mt="$4">
        {message}
      </Text>
    </View>
  );
}

export default LoadingStateComponent
