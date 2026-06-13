import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useAutomation } from '../../context/AutomationContext';
import { supabase } from '../../lib/supabase';

interface SwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
}

// Custom Fluid Switch Component
const CustomSwitch = ({ value, onValueChange }: SwitchProps) => {
  const switchTranslation = useSharedValue(value ? 20 : 0);

  useEffect(() => {
    switchTranslation.value = withTiming(value ? 20 : 0, { duration: 200 });
  }, [value]);

  const animatedKnobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: switchTranslation.value }],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      switchTranslation.value,
      [0, 20],
      ['#27272a', '#4f46e5'] // zinc-800 to indigo-600
    );
    return { backgroundColor };
  });

  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (err) {
      console.warn(err);
    }
    onValueChange(!value);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <Animated.View
        style={animatedContainerStyle}
        className="w-12 h-7 rounded-full p-0.5 justify-center"
      >
        <Animated.View
          style={animatedKnobStyle}
          className="w-6 h-6 rounded-full bg-white shadow-sm"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <View className="mb-6">
      {title && (
        <Text className="text-zinc-500 text-xs font-bold tracking-wider uppercase mb-2.5 ml-1">
          {title}
        </Text>
      )}
      <View className="bg-zinc-900/40 border border-zinc-900 rounded-2xl overflow-hidden px-4">
        {children}
      </View>
    </View>
  );
};

interface RowProps {
  label: string;
  valueText?: string;
  valueColor?: string;
  isLast?: boolean;
  onPress?: () => void;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (val: boolean) => void;
  danger?: boolean;
}

const Row = ({
  label,
  valueText,
  valueColor = 'text-zinc-400',
  isLast = false,
  onPress,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  danger = false,
}: RowProps) => {
  const content = (
    <View className={`flex-row items-center justify-between py-4.5 ${!isLast ? 'border-b border-zinc-900/60' : ''}`}>
      <Text className={`text-base font-semibold ${danger ? 'text-rose-500' : 'text-white'}`}>
        {label}
      </Text>
      <View className="flex-row items-center">
        {valueText && (
          <Text className={`text-sm font-semibold mr-2.5 ${valueColor}`}>{valueText}</Text>
        )}
        {showSwitch ? (
          <CustomSwitch value={switchValue} onValueChange={onSwitchChange || (() => {})} />
        ) : (
          onPress && (
            <Text className="text-zinc-600 text-lg font-light pl-1">›</Text>
          )
        )}
      </View>
    </View>
  );

  if (onPress && !showSwitch) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isActive, toggleAutomation } = useAutomation();
  const [bgActivity, setBgActivity] = useState(true);

  const handleForceSync = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err) {
      console.warn(err);
    }
    Alert.alert('System Synced', 'Instagram automation data has been refreshed successfully.');
  };

  const handleLogout = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      await supabase.auth.signOut();
    } catch (err) {
      console.warn(err);
    }
    router.replace('/(auth)/login');
  };

  return (
    <View 
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-zinc-950 px-6"
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header Profile Section */}
        <View className="items-center mt-8 mb-8">
          <View className="w-20 h-20 rounded-full bg-indigo-600/10 border border-indigo-500/20 items-center justify-center mb-3.5 shadow-xl">
            <Text className="text-indigo-400 text-2xl font-black tracking-widest">
              SF
            </Text>
          </View>
          <Text className="text-white text-2xl font-extrabold tracking-tight">
            Shaik Firdos
          </Text>
          <View className="bg-indigo-500/10 border border-indigo-500/10 px-3 py-1 rounded-full mt-2">
            <Text className="text-indigo-400 text-xs font-bold tracking-wide uppercase">
              FeedFlow Pro Member
            </Text>
          </View>
        </View>

        {/* Section 1: Instagram Connection */}
        <Section title="Instagram Connection">
          <Row 
            label="Account Status" 
            valueText="Connected as @shaik_firdos" 
            valueColor="text-emerald-500" 
          />
          <Row 
            label="Force Re-Sync" 
            onPress={handleForceSync} 
            isLast 
          />
        </Section>

        {/* Section 2: Automation Controls */}
        <Section title="Automation Controls">
          <Row 
            label="Master Engine Switch" 
            showSwitch 
            switchValue={isActive}
            onSwitchChange={toggleAutomation}
          />
          <Row 
            label="Interaction Speed" 
            valueText="Human-like (Safe)" 
          />
          <Row 
            label="Background Activity" 
            showSwitch 
            switchValue={bgActivity}
            onSwitchChange={setBgActivity}
            isLast
          />
        </Section>

        {/* Section 3: App Settings */}
        <Section title="App Settings">
          <Row 
            label="Notifications" 
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(e => console.warn(e));
            }} 
          />
          <Row 
            label="Privacy & Data" 
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(e => console.warn(e));
            }} 
            isLast 
          />
        </Section>

        {/* Section 4: Danger Zone */}
        <Section title="Danger Zone">
          <Row 
            label="Log Out" 
            danger 
            onPress={handleLogout} 
            isLast 
          />
        </Section>
      </ScrollView>
    </View>
  );
}
