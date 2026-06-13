import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reanimated Button Scale
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    if (isLoading) {
      buttonScale.value = withTiming(0.96, {
        duration: 150,
        easing: Easing.out(Easing.ease),
      });
    } else {
      buttonScale.value = withTiming(1, {
        duration: 150,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [isLoading]);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleConnect = async () => {
    if (!username || !password) {
      // Small error feedback haptic
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch (err) {
        console.warn(err);
      }
      return;
    }

    setIsLoading(true);

    // Simulate cryptographic key exchange and login timeout (2s)
    setTimeout(async () => {
      setIsLoading(false);
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (err) {
        console.warn(err);
      }
      // Navigate to /(tabs)/preferences
      router.replace('/(tabs)/preferences');
    }, 2000);
  };

  // Shadow styles for premium vault feel
  const vaultGlow = {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 50,
    elevation: 5,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View 
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        className="flex-1 bg-zinc-950 justify-between"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-between px-8"
        >
          {/* Header Vault Section */}
          <View 
            style={{ marginTop: height * 0.08 }} 
            className="items-center"
          >
            {/* Custom SVG-like CSS Vault Lock Icon */}
            <View 
              style={vaultGlow}
              className="items-center mb-6"
            >
              {/* Lock Shackle */}
              <View className="w-7 h-9 border-t-2 border-x-2 border-indigo-400 rounded-t-full translate-y-2" />
              {/* Lock Body */}
              <View className="w-13 h-11 bg-zinc-900 border border-zinc-800 rounded-xl justify-center items-center shadow-2xl">
                {/* Keyhole */}
                <View className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <View className="w-1 h-2 bg-indigo-400 rounded-b-sm" />
              </View>
            </View>

            <View className="flex-row items-center bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-3">
              <View className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse mr-2" />
              <Text className="text-indigo-400 text-xs font-semibold tracking-wide uppercase">
                Secure Connection
              </Text>
            </View>

            <Text className="text-white text-3xl font-bold tracking-tight text-center">
              Link your account
            </Text>
            
            <Text className="text-zinc-400 text-sm text-center mt-2 px-6 leading-relaxed">
              Your credentials are encrypted end-to-end and stored locally inside your device's secure enclave.
            </Text>
          </View>

          {/* Form & Input Section */}
          <View className="w-full space-y-5 my-auto">
            {/* Username Input */}
            <View className="space-y-2">
              <Text className="text-zinc-400 text-xs font-semibold uppercase tracking-wider pl-1">
                Instagram Username
              </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="e.g., feedflow_curator"
                placeholderTextColor="#52525b"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                className="w-full bg-zinc-900 border border-zinc-800/80 rounded-2xl py-4.5 px-4.5 text-white text-base focus:border-indigo-500/50"
              />
            </View>

            {/* Password Input */}
            <View className="space-y-2 mt-4">
              <Text className="text-zinc-400 text-xs font-semibold uppercase tracking-wider pl-1">
                Instagram Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#52525b"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                className="w-full bg-zinc-900 border border-zinc-800/80 rounded-2xl py-4.5 px-4.5 text-white text-base focus:border-indigo-500/50"
              />
            </View>
          </View>

          {/* Action CTA Button Section */}
          <View className="w-full pb-8">
            <Animated.View style={animatedButtonStyle} className="w-full">
              <TouchableOpacity
                onPress={handleConnect}
                disabled={isLoading}
                activeOpacity={0.9}
                className="w-full bg-white py-4.5 rounded-2xl flex-row justify-center items-center shadow-lg shadow-white/5"
              >
                {isLoading ? (
                  <View className="flex-row items-center justify-center space-x-2">
                    <ActivityIndicator size="small" color="#09090b" className="mr-2" />
                    <Text className="text-zinc-950 font-bold text-lg">
                      Encrypting & Connecting...
                    </Text>
                  </View>
                ) : (
                  <Text className="text-zinc-950 font-bold text-lg">
                    Initialize Connection
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            <View className="flex-row items-center justify-center mt-5 space-x-1.5">
              <Text className="text-zinc-600 text-xs text-center">
                Protected by AES-256 local encryption.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
