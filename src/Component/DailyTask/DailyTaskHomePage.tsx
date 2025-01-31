import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {Header} from '../HomePage/Header';
import HeroSection from '../HomePage/HeroSectioin';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetTask} from '../../api/task';

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
  const [userid, setUserid] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userid');
        if (storedUserId) {
          setUserid(storedUserId);
        } else {
          console.error('No user found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving User ID:', error);
      }
    };

    fetchUserId();
  }, []);

  // Prevent API call if userid is not defined
  const {data: tasks, isLoading, error} = useGetTask(userid || '');

  const handleLogout = async (event: GestureResponderEvent) => {
    try {
      await AsyncStorage.removeItem('userid');
      console.log('User ID removed');
      setUserid(null); // Clear userId from state
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing User ID:', error);
    }
  };

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
      data={tasks || []}
      renderItem={renderTask}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <Header />
          <HeroSection />
          <Text onPress={handleLogout} style={styles.logoutText}>
            LogOut
          </Text>
          <Text style={styles.heading}>Today's Tasks</Text>
          {isLoading && <Text>Loading tasks...</Text>}
          {error && <Text>Error loading tasks</Text>}
          {!userid && <Text>No user ID found. Please log in.</Text>}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    paddingBottom: 16,
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
  logoutText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    borderRadius: 16,
  },
});
