import React from 'react';
import { View, Text } from 'react-native';
import { useAutomation } from '../../context/AutomationContext';

export default function DashboardScreen() {
  const { isActive, completedActionsCount } = useAutomation();

  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-foreground text-2xl font-bold">Automation Status</Text>
      <Text className="text-muted-foreground mt-2">Active: {isActive ? 'Yes' : 'No'}</Text>
      <Text className="text-muted-foreground">Actions: {completedActionsCount}</Text>
    </View>
  );
}
