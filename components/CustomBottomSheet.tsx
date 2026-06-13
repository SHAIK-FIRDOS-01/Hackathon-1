import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface CustomBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const CustomBottomSheet = ({ visible, onClose, children, title }: CustomBottomSheetProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-card rounded-t-3xl p-6 min-h-[300px]">
          <View className="flex-row justify-between items-center mb-4">
            {title ? (
              <Text className="text-foreground text-xl font-bold">{title}</Text>
            ) : <View />}
            <TouchableOpacity onPress={onClose}>
              <Text className="text-muted-foreground">Close</Text>
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};
