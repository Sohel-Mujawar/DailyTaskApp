import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {TextStyle, ViewStyle} from 'react-native';

interface DropdownOption {
  label: string; // Option label to display
  value: string | number; // Option value
}

interface CustomDropdownProps {
  options: DropdownOption[]; // Array of dropdown options
  selectedValue: string | number; // Currently selected value
  onValueChange: (value: string | number) => void; // Callback when value changes
  placeholder?: string; // Placeholder when no value is selected
  style?: ViewStyle; // Style for dropdown container
  dropdownStyle?: ViewStyle; // Style for dropdown menu
  labelStyle?: TextStyle; // Style for dropdown label
  optionStyle?: TextStyle; // Style for options
  label?: string; // Optional label for the dropdown
}

const CustomDropdown = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  style,
  dropdownStyle,
  labelStyle,
  optionStyle,
  label,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false); // Track if dropdown is open

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    setIsOpen(false); // Close dropdown on selection
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.selectedText}>
          {selectedValue
            ? options.find(option => option.value === selectedValue)?.label
            : placeholder}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdownMenu, dropdownStyle]}>
          <FlatList
            data={options}
            keyExtractor={item => item.value.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}>
                <Text style={[styles.optionText, optionStyle]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#555',
  },
  dropdown: {
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    marginTop: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomDropdown;
