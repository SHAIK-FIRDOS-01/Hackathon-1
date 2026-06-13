import React, { createContext, useContext, useState } from 'react';

type AutomationContextType = {
  isActive: boolean;
  lastSyncTime: string | null;
  completedActionsCount: number;
  toggleAutomation: () => void;
  triggerMockTask: () => void;
};

const AutomationContext = createContext<AutomationContextType>({
  isActive: false,
  lastSyncTime: null,
  completedActionsCount: 0,
  toggleAutomation: () => {},
  triggerMockTask: () => {},
});

export const AutomationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [completedActionsCount, setCompletedActionsCount] = useState(0);

  const toggleAutomation = () => {
    setIsActive((prev) => !prev);
    if (!isActive) {
      setLastSyncTime(new Date().toISOString());
    }
  };

  const triggerMockTask = () => {
    if (!isActive) return;
    setCompletedActionsCount((prev) => prev + 1);
    setLastSyncTime(new Date().toISOString());
  };

  return (
    <AutomationContext.Provider
      value={{
        isActive,
        lastSyncTime,
        completedActionsCount,
        toggleAutomation,
        triggerMockTask,
      }}
    >
      {children}
    </AutomationContext.Provider>
  );
};

export const useAutomation = () => useContext(AutomationContext);
