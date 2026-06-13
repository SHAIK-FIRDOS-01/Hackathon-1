import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Animation values
  const buttonScale = useSharedValue(1);
  const orb1TranslateY = useSharedValue(0);
  const orb2TranslateY = useSharedValue(0);
  const flowDotTranslateX = useSharedValue(-45);
  const flowDotScale = useSharedValue(1);
  const ringRotation = useSharedValue(0);

  useEffect(() => {
    // Breathing scale animation for button
    buttonScale.value = withRepeat(
      withSequence(
        withTiming(1.025, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Infinite repeat
      true // Reverse direction
    );

    // Subtle floating pulse for background decorative orbs
    orb1TranslateY.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-15, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    orb2TranslateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(20, { duration: 6000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Continuous flow dot animation moving between nodes
    flowDotTranslateX.value = withRepeat(
      withTiming(45, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Pulsing size for the flow dot
    flowDotScale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 1250, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.8, { duration: 1250, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Slow continuous rotation of the dashed outer ring
    ringRotation.value = withRepeat(
      withTiming(360, { duration: 30000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  // Animated styles
  const animatedOrb1Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: orb1TranslateY.value }],
    };
  });

  const animatedOrb2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: orb2TranslateY.value }],
    };
  });

  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: flowDotTranslateX.value },
        { scale: flowDotScale.value },
      ],
    };
  });

  const animatedRingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${ringRotation.value}deg` }],
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleConnect = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.warn('Haptics not supported or failed', error);
    }
    router.push('/(auth)/login');
  };

  // Apple-esque Shadow Glow Styles
  const indigoGlow = {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 8,
  };

  const fuchsiaGlow = {
    shadowColor: '#d946ef',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 90,
    elevation: 6,
  };

  const dotGlow = {
    shadowColor: '#818cf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 4,
  };

  return (
    <View 
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-zinc-950 justify-between"
    >
      {/* Top 60%: Abstract Automation Flow Visualization */}
      <View 
        style={{ height: height * 0.55 }}
        className="justify-center items-center overflow-hidden relative"
      >
        {/* Glow Orb 1 (Indigo) */}
        <Animated.View
          style={[animatedOrb1Style, indigoGlow]}
          className="absolute w-72 h-72 rounded-full bg-indigo-600/10 -left-16 top-1/4"
        />

        {/* Glow Orb 2 (Fuchsia) */}
        <Animated.View
          style={[animatedOrb2Style, fuchsiaGlow]}
          className="absolute w-64 h-64 rounded-full bg-fuchsia-600/10 -right-12 top-1/3"
        />

        {/* Outer Rotating Dashed Ring */}
        <Animated.View
          style={animatedRingStyle}
          className="w-80 h-80 rounded-full border border-zinc-800/40 border-dashed justify-center items-center"
        >
          {/* Middle Decorative Ring */}
          <View className="w-64 h-64 rounded-full border border-zinc-900 justify-center items-center">
            {/* Inner Ring (Pulsing Glow Anchor) */}
            <View className="w-48 h-48 rounded-full border border-zinc-800/60 bg-zinc-950/20 justify-center items-center" />
          </View>
        </Animated.View>

        {/* Automation Flow Path Overlay */}
        <View className="absolute flex-row items-center justify-center w-full z-20">
          {/* Connection Line */}
          <View className="absolute h-[2px] w-28 bg-zinc-800/80" />

          {/* Animating Data flow dot */}
          <Animated.View
            style={[animatedDotStyle, dotGlow]}
            className="absolute w-3.5 h-3.5 rounded-full bg-indigo-400"
          />

          {/* Left Node: Instagram representation */}
          <View className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 justify-center items-center shadow-lg mr-12">
            <View className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 justify-center items-center">
              {/* Minimal camera glyph */}
              <View className="w-5 h-5 rounded-md border-2 border-pink-400 justify-center items-center">
                <View className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              </View>
            </View>
          </View>

          {/* Right Node: FeedFlow Engine */}
          <View className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800/80 justify-center items-center shadow-lg ml-12">
            <View className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 justify-center items-center">
              {/* Sleek flow wave glyph */}
              <View className="flex-row items-center space-x-0.5 justify-center">
                <View className="w-1 h-3 rounded-full bg-indigo-400" />
                <View className="w-1 h-5 rounded-full bg-indigo-400" />
                <View className="w-1 h-2 rounded-full bg-indigo-400" />
              </View>
            </View>
          </View>
        </View>

        {/* Header App Brand Tag */}
        <View className="absolute top-12 items-center">
          <Text className="text-zinc-500 text-xs tracking-[0.4em] uppercase font-bold">
            FEEDFLOW
          </Text>
        </View>
      </View>

      {/* Bottom 40%: Value Proposition Card & CTA */}
      <View
        style={{ height: height * 0.4 }}
        className="bg-zinc-900/40 border-t border-zinc-900 rounded-t-[40px] px-8 pt-12 pb-10 justify-between"
      >
        {/* Core Value Prop Text */}
        <View className="space-y-4">
          <Text className="text-white text-3xl font-bold tracking-tight text-center">
            Personalize your feed on autopilot.
          </Text>
          <Text className="text-zinc-400 text-base text-center leading-relaxed px-4">
            Curate, automate, and streamline your Instagram interactions effortlessly with FeedFlow.
          </Text>
        </View>

        {/* Action Button & Info */}
        <View className="items-center w-full">
          <Animated.View style={animatedButtonStyle} className="w-full">
            <TouchableOpacity
              onPress={handleConnect}
              activeOpacity={0.9}
              className="w-full bg-white py-4.5 rounded-2xl flex-row justify-center items-center shadow-lg shadow-white/5"
            >
              <Text className="text-zinc-950 font-bold text-lg">
                Connect Instagram
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Text className="text-zinc-600 text-xs mt-5 text-center">
            By connecting, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}
