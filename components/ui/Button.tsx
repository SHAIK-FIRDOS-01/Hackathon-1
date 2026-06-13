import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text as RNText, ActivityIndicator } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const Button = ({ label, variant = 'primary', isLoading, className, ...props }: ButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-muted';
      case 'outline':
        return 'bg-transparent border border-border';
      case 'primary':
      default:
        return 'bg-primary';
    }
  };

  const getVariantTextClasses = () => {
    switch (variant) {
      case 'secondary':
      case 'outline':
        return 'text-foreground';
      case 'primary':
      default:
        return 'text-primary-foreground';
    }
  };

  return (
    <TouchableOpacity
      className={`py-3 px-4 rounded-xl flex-row justify-center items-center ${getVariantClasses()} ${className || ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#fafafa'} />
      ) : (
        <RNText className={`font-semibold text-center ${getVariantTextClasses()}`}>
          {label}
        </RNText>
      )}
    </TouchableOpacity>
  );
};
