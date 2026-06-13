import { Tabs } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function TabsLayout() {
  const { session } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#09090b',
          borderTopColor: '#27272a',
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#a1a1aa',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="preferences"
        options={{
          title: 'Preferences',
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}
