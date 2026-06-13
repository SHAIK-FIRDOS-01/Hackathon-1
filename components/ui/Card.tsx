import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={`bg-card p-4 rounded-2xl border border-border ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
};
