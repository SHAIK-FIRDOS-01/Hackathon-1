import { Slot, Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { AutomationProvider } from '../context/AutomationContext';
import { View } from 'react-native';

import '../global.css'; // NativeWind v4 requires a global CSS file

export default function RootLayout() {
  return (
    <AuthProvider>
      <AutomationProvider>
        <View style={{ flex: 1, backgroundColor: '#09090b' }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </AutomationProvider>
    </AuthProvider>
  );
}
