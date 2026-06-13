import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
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

const STATS = [
  { label: 'POSTS ANALYZED', value: '1,248', change: '+142' },
  { label: 'ACTIONS TAKEN', value: '42', change: '+12' },
  { label: 'WATCH TIME', value: '4h 12m', change: '+35m' },
];

const LOGS = [
  {
    id: '1',
    action: 'Liked reel containing #ArtificialIntelligence',
    time: '2m ago',
    type: 'amplify',
  },
  {
    id: '2',
    action: 'Skipped post matching muted topic #Gaming',
    time: '8m ago',
    type: 'mute',
  },
  {
    id: '3',
    action: 'Simulated 15s watch time on #Startups content',
    time: '14m ago',
    type: 'amplify',
  },
  {
    id: '4',
    action: 'Followed creator posting #Technology updates',
    time: '25m ago',
    type: 'amplify',
  },
  {
    id: '5',
    action: 'Ignored sponsored ad matching #Finance keyword',
    time: '38m ago',
    type: 'mute',
  },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  // Animations
  const time = useSharedValue(0);
  const centerScale = useSharedValue(1);
  const textOpacity = useSharedValue(1);

  useEffect(() => {
    // Sonar radar pulse animation (0 to 3 continuously)
    time.value = withRepeat(
      withTiming(3, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );

    // Center indicator breathing effect
    centerScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Pulsing text opacity
    textOpacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  // Radar circle animated styles with continuous offset mathematical math
  const animatedRing1Style = useAnimatedStyle(() => {
    const progress = time.value % 1;
    return {
      transform: [{ scale: 1 + progress * 2.6 }],
      opacity: 1 - progress,
    };
  });

  const animatedRing2Style = useAnimatedStyle(() => {
    const progress = (time.value + 0.33) % 1;
    return {
      transform: [{ scale: 1 + progress * 2.6 }],
      opacity: 1 - progress,
    };
  });

  const animatedRing3Style = useAnimatedStyle(() => {
    const progress = (time.value + 0.66) % 1;
    return {
      transform: [{ scale: 1 + progress * 2.6 }],
      opacity: 1 - progress,
    };
  });

  const animatedCenterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: centerScale.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  // Premium glow style for radar center
  const centerGlow = {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 8,
  };

  return (
    <View 
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-zinc-950 px-6 justify-between"
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header Title */}
        <View className="mt-6 mb-6">
          <Text className="text-zinc-500 text-xs font-bold tracking-[0.3em] uppercase">
            System Dashboard
          </Text>
          <Text className="text-white text-3xl font-extrabold tracking-tight mt-1">
            Mission Control
          </Text>
        </View>

        {/* Top Section: Radar */}
        <View 
          style={{ height: height * 0.35 }}
          className="items-center justify-center relative mb-6"
        >
          {/* Echo Rings */}
          <Animated.View
            style={animatedRing1Style}
            className="absolute w-28 h-28 rounded-full border border-indigo-500/20"
          />
          <Animated.View
            style={animatedRing2Style}
            className="absolute w-28 h-28 rounded-full border border-indigo-500/20"
          />
          <Animated.View
            style={animatedRing3Style}
            className="absolute w-28 h-28 rounded-full border border-indigo-500/20"
          />

          {/* Central Active Node */}
          <Animated.View
            style={[animatedCenterStyle, centerGlow]}
            className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800/80 items-center justify-center z-10"
          >
            <View className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 items-center justify-center">
              <View className="w-3.5 h-3.5 rounded-full bg-indigo-400 items-center justify-center animate-ping" />
              <Text className="text-indigo-400 text-[10px] font-bold tracking-widest uppercase mt-1">
                Active
              </Text>
            </View>
          </Animated.View>

          {/* Radar Status Subtitle */}
          <Animated.View 
            style={[animatedTextStyle, { transform: [{ translateY: 20 }] }]}
            className="absolute bottom-4 flex-row items-center justify-center"
          >
            <View className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2.5" />
            <Text className="text-zinc-400 text-sm font-medium text-center">
              Listening for algorithmic signals...
            </Text>
          </Animated.View>
        </View>

        {/* Middle Section: Quick Stats */}
        <View className="flex-row justify-between w-full mb-8">
          {STATS.map((stat, i) => (
            <View 
              key={i}
              className="flex-1 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4.5 items-center justify-center mx-1 shadow-sm"
            >
              <Text className="text-zinc-500 text-[10px] font-extrabold tracking-wider text-center">
                {stat.label}
              </Text>
              <Text className="text-white text-lg font-black tracking-tight mt-1.5">
                {stat.value}
              </Text>
              <View className="bg-indigo-500/10 border border-indigo-500/10 px-1.5 py-0.5 rounded-full mt-1.5">
                <Text className="text-indigo-400 text-[10px] font-bold">
                  {stat.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Section: Live Activity Log */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold tracking-wide">
              Recent Operations
            </Text>
            <View className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
              <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                Live Feed
              </Text>
            </View>
          </View>

          {/* Activity Log List */}
          <View className="bg-zinc-900/30 border border-zinc-900 rounded-3xl overflow-hidden px-4">
            {LOGS.map((item, index) => (
              <View 
                key={item.id}
                className={`flex-row items-center justify-between py-4 ${
                  index !== LOGS.length - 1 ? 'border-b border-zinc-900' : ''
                }`}
              >
                <View className="flex-row items-center flex-1 pr-4">
                  {/* Status Indicator Dot */}
                  <View 
                    className={`w-2 h-2 rounded-full mr-3.5 ${
                      item.type === 'amplify' ? 'bg-emerald-500' : 'bg-zinc-600'
                    }`} 
                  />
                  <Text className="text-zinc-300 text-sm font-medium leading-normal flex-1">
                    {item.action}
                  </Text>
                </View>
                <Text className="text-zinc-500 text-xs font-semibold">
                  {item.time}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
