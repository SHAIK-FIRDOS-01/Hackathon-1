import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

export const useHaptics = () => {
  const triggerLight = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const triggerMedium = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const triggerHeavy = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, []);

  const triggerSuccess = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const triggerError = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  return {
    triggerLight,
    triggerMedium,
    triggerHeavy,
    triggerSuccess,
    triggerError,
  };
};
