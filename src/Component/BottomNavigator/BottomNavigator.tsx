import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {DailyTaskHomePage} from '../DailyTask/DailyTaskHomePage';
import {AddDailyTask} from '../DailyTask/AddDailyTask';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Animated} from 'react-native';
import {UserProfile} from '../UserProfile/UserProfile';

const Tab = createBottomTabNavigator();

const TabIcon = ({focused, iconName, library, color}) => {
  const scale = focused ? 1.2 : 1;
  const IconComponent = library === 'AntDesign' ? AntDesign : Feather;

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <IconComponent name={iconName} size={26} color={color} />
    </Animated.View>
  );
};

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#E5FFE5',
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          shadowColor: '#2ECC71',
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: -2},
          shadowRadius: 50,
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={DailyTaskHomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              iconName="home"
              library="AntDesign"
              color={focused ? '#2ECC71' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Task"
        component={AddDailyTask}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              iconName="pluscircle"
              library="AntDesign"
              color={focused ? '#2ECC71' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              iconName="user"
              library="Feather"
              color={focused ? '#2ECC71' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
