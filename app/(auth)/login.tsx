import React from 'react';
import { View, Text } from 'react-native';

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-foreground text-2xl font-bold">Login to FeedFlow</Text>
    </View>
  );
}
