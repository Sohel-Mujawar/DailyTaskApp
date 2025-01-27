// DisplayTask.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

interface TaskItem {
  id: string;
  title: string;
  description: string;
}

interface DisplayTaskProps {
  route: any;
}

const DisplayTask: React.FC<DisplayTaskProps> = ({route}) => {
  const {task}: {task: TaskItem} = route.params;

  const handleUpdate = () => {
    Alert.alert('Update Task', 'Update functionality coming soon!');
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', onPress: () => Alert.alert('Task Deleted')},
    ]);
  };

  return (
    <View style={styles.displayContainer}>
      <Text style={styles.displayTitle}>{task.title}</Text>
      <Text style={styles.displayDescription}>{task.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  displayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginBottom: 16,
  },
  displayDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  updateButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DisplayTask;
