import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../HomePage/Header';
import HeroSection from '../HomePage/HeroSectioin';
import {NavigationProp, RouteProp} from '@react-navigation/native';

interface TaskItem {
  id: string;
  title: string;
  description: string;
}

interface DailyTaskHomePageProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

export const DailyTaskHomePage: React.FC<DailyTaskHomePageProps> = ({
  navigation,
}) => {
  const tasks = [
    {
      id: '1',
      title: 'Morning Yoga',
      description: '30 minutes of stretching and yoga.',
    },
    {
      id: '2',
      title: 'Team Meeting',
      description: 'Project update with the team at 10 AM.',
    },
    {
      id: '3',
      title: 'Code Review',
      description: 'Review pull requests for new features.',
    },
    {
      id: '4',
      title: 'Evening Walk',
      description: 'Relax and unwind with a 15-minute walk.',
    },
    {
      id: '5',
      title: 'Morning Yoga',
      description: '30 minutes of stretching and yoga.',
    },
    {
      id: '6',
      title: 'Team Meeting',
      description: 'Project update with the team at 10 AM.',
    },
    {
      id: '7',
      title: 'Code Review',
      description: 'Review pull requests for new features.',
    },
    {
      id: ' 8',
      title: 'Evening Walk',
      description: 'Relax and unwind with a 15-minute walk.',
    },
  ];

  const renderTask = ({item}: {item: TaskItem}) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() => navigation.navigate('DisplayTask', {task: item})}>
      <Image
        source={require('../assets/profile.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderTask}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <Header />
          <HeroSection />
          <Text style={styles.heading}>Today's Tasks</Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    paddingBottom: 16, // For spacing at the bottom
  },
  heading: {
    marginBottom: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  taskDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#27ae60',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    borderRadius: 16,
  },
});
