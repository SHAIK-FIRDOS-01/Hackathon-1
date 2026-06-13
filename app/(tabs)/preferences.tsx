import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const TOPICS = [
  'Technology',
  'Artificial Intelligence',
  'Startups',
  'Business',
  'Finance',
  'Fitness',
  'Health',
  'Education',
  'Travel',
  'Gaming',
];

interface PreferenceChipProps {
  label: string;
  isSelected: boolean;
  type: 'amplify' | 'mute';
  onPress: () => void;
}

// Custom independent Preference Chip component
const PreferenceChip = ({ label, isSelected, type, onPress }: PreferenceChipProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = async () => {
    // 0.9 scale pop animation
    scale.value = 0.9;
    scale.value = withSpring(1, { damping: 12, stiffness: 150 });

    try {
      await Haptics.selectionAsync();
    } catch (err) {
      console.warn(err);
    }
    
    onPress();
  };

  // Build classes dynamically
  let chipClass = 'px-4 py-3 rounded-2xl border mr-2.5 mb-3.5 flex-row items-center ';
  let textClass = 'font-semibold text-sm ';

  if (isSelected) {
    if (type === 'amplify') {
      chipClass += 'bg-indigo-600/15 border-indigo-500';
      textClass += 'text-indigo-400';
    } else {
      chipClass += 'bg-rose-900/15 border-rose-500';
      textClass += 'text-rose-400';
    }
  } else {
    chipClass += 'bg-zinc-900 border-zinc-800/80';
    textClass += 'text-zinc-300';
  }

  // Premium Indigo Glow Shadow for selected amplified topics
  const glowStyle = isSelected && type === 'amplify' ? {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  } : {};

  return (
    <Animated.View style={[animatedStyle, glowStyle]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className={chipClass}
      >
        {isSelected && (
          <View 
            className={`w-1.5 h-1.5 rounded-full mr-2 ${
              type === 'amplify' ? 'bg-indigo-400' : 'bg-rose-400'
            }`} 
          />
        )}
        <Text className={textClass}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function PreferencesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [amplifiedTopics, setAmplifiedTopics] = useState<string[]>([]);
  const [mutedTopics, setMutedTopics] = useState<string[]>([]);

  // Reanimated button scale
  const buttonScale = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleAmplifyPress = (topic: string) => {
    if (amplifiedTopics.includes(topic)) {
      setAmplifiedTopics(prev => prev.filter(t => t !== topic));
    } else {
      setAmplifiedTopics(prev => [...prev, topic]);
      // Remove from muted topics if present
      setMutedTopics(prev => prev.filter(t => t !== topic));
    }
  };

  const handleMutePress = (topic: string) => {
    if (mutedTopics.includes(topic)) {
      setMutedTopics(prev => prev.filter(t => t !== topic));
    } else {
      setMutedTopics(prev => [...prev, topic]);
      // Remove from amplified topics if present
      setAmplifiedTopics(prev => prev.filter(t => t !== topic));
    }
  };

  const handleSavePressIn = () => {
    buttonScale.value = withTiming(0.96, { duration: 100 });
  };

  const handleSavePressOut = () => {
    buttonScale.value = withTiming(1, { duration: 100 });
  };

  const handleSave = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err) {
      console.warn(err);
    }
    // Navigate to /(tabs)/analytics or index
    router.replace('/(tabs)/analytics');
  };

  return (
    <View 
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-zinc-950"
    >
      <ScrollView 
        className="flex-1 px-6 pt-6"
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="mb-9">
          <Text className="text-white text-3xl font-extrabold tracking-tight">
            Tune Your Algorithm
          </Text>
          <Text className="text-zinc-500 text-base mt-2 leading-relaxed">
            Select your preferences to configure FeedFlow's autopilot content engine.
          </Text>
        </View>

        {/* Section 1: Amplify (See More) */}
        <View className="mb-9">
          <View className="flex-row items-center mb-3">
            <View className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-2.5" />
            <Text className="text-white text-lg font-bold tracking-wide">
              Amplify (See More)
            </Text>
          </View>
          <Text className="text-zinc-500 text-xs mb-4 leading-relaxed">
            FeedFlow will actively search, interact, and engage with posts related to these topics.
          </Text>
          <View className="flex-row flex-wrap">
            {TOPICS.map(topic => (
              <PreferenceChip
                key={`amplify-${topic}`}
                label={topic}
                isSelected={amplifiedTopics.includes(topic)}
                type="amplify"
                onPress={() => handleAmplifyPress(topic)}
              />
            ))}
          </View>
        </View>

        {/* Section 2: Mute (See Less) */}
        <View className="mb-9">
          <View className="flex-row items-center mb-3">
            <View className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-2.5" />
            <Text className="text-white text-lg font-bold tracking-wide">
              Mute (See Less)
            </Text>
          </View>
          <Text className="text-zinc-500 text-xs mb-4 leading-relaxed">
            FeedFlow will automatically skip, filter out, or hide items matching these topics.
          </Text>
          <View className="flex-row flex-wrap">
            {TOPICS.map(topic => (
              <PreferenceChip
                key={`mute-${topic}`}
                label={topic}
                isSelected={mutedTopics.includes(topic)}
                type="mute"
                onPress={() => handleMutePress(topic)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Save Button */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-zinc-950/90 border-t border-zinc-900/60">
        <Animated.View style={animatedButtonStyle}>
          <TouchableOpacity
            onPressIn={handleSavePressIn}
            onPressOut={handleSavePressOut}
            onPress={handleSave}
            activeOpacity={0.95}
            className="w-full bg-white py-4.5 rounded-2xl items-center justify-center shadow-lg shadow-white/5"
          >
            <Text className="text-zinc-950 font-bold text-lg">
              Save Preferences
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
