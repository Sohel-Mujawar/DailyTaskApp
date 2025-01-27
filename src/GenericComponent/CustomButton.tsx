import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle; // Optional button style
  textStyle?: TextStyle; // Optional text style
  disabled?: boolean; // Optional disabled state
  icon?: React.ReactNode; // Optional icon component
  iconPosition?: 'left' | 'right'; // Position of the icon
}

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  icon,
  iconPosition = 'left',
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        style,
        disabled && styles.disabledButton, // Apply disabled styling if true
      ]}
      activeOpacity={0.8}
      disabled={disabled}>
      <View style={styles.content}>
        {/* Render the icon based on its position */}
        {icon && iconPosition === 'left' && (
          <View style={styles.icon}>{icon}</View>
        )}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <View style={styles.icon}>{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    marginBottom: 10,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  icon: {},
});

export default CustomButton;
