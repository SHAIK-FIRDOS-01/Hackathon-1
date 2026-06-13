import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-foreground mb-2 font-medium">{label}</Text>}
      <TextInput
        className={`bg-muted text-foreground p-4 rounded-xl border ${error ? 'border-red-500' : 'border-border'} ${className || ''}`}
        placeholderTextColor="#a1a1aa"
        {...props}
      />
      {error && <Text className="text-red-500 mt-1 text-sm">{error}</Text>}
    </View>
  );
};
