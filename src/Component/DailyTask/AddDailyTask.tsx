import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import CustomTextInput from '../../GenericComponent/CustomTextInput';
import CustomDropdown from '../../GenericComponent/CustomDropdown';

export const AddDailyTask = () => {
  const [task, setTask, setDiscription] = useState('');

  const handleSubmit = () => {
    if (task.trim()) {
      Alert.alert('Task Added', `Your task "${task}" has been added!`);
      setTask(''); // Clear the input field after submission
    } else {
      Alert.alert('Error', 'Please enter a task before submitting.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a New Task</Text>
      <CustomTextInput
        value={task}
        onChangeText={setTask}
        placeholder="Enter your task"
        style={styles.input}
        label="Task Name"
      />
      <CustomTextInput
        value={task}
        onChangeText={setDiscription}
        placeholder="Enter your task"
        style={styles.input}
        label="Description"
      />
      <CustomTextInput
        value={task}
        onChangeText={setTask}
        placeholder="Enter your task"
        style={styles.input}
        label="Sub Task"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
