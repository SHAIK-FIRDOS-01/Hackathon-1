import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'body' | 'caption';
}

export const Text = ({ children, variant = 'body', className, ...props }: TextProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'h1':
        return 'text-3xl font-bold text-foreground';
      case 'h2':
        return 'text-xl font-semibold text-foreground';
      case 'caption':
        return 'text-sm text-muted-foreground';
      case 'body':
      default:
        return 'text-base text-foreground';
    }
  };

  return (
    <RNText className={`${getVariantClasses()} ${className || ''}`} {...props}>
      {children}
    </RNText>
  );
};
