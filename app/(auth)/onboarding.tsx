import React from 'react';
import { View, Text } from 'react-native';

export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-foreground text-2xl font-bold">Welcome to FeedFlow</Text>
    </View>
  );
}
