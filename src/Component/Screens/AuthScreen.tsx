import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './SignUp';
import {BottomNavigator} from '../BottomNavigator/BottomNavigator';
import {AuthContext} from '../../context/AuthContext';
import login from './Login';
import {DailyTaskHomePage} from '../DailyTask/DailyTaskHomePage';

const Stack = createStackNavigator();

const AuthScreen = () => {
  const authContext = useContext(AuthContext);
  const navigatation = useNavigation();

  // Check if context is available
  if (!authContext) {
    return <Text>Error: AuthContext is not available</Text>;
  }

  const {isAuthenticated, email} = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigatation.navigate('BottomTabs');
    }
  });
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Render Bottom Tabs when authenticated */}
      <Stack.Screen
        name="Login"
        component={login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DailyTaskHomePage"
        component={DailyTaskHomePage}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="Panchang"
        component={RenderCalender}
        options={{title: 'Panchang'}}
      />
      <Stack.Screen
        name="Details"
        component={EventDetails}
        options={{title: 'Details', headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={CombineMeetings}
        options={{title: 'Notification', headerShown: false}}
      /> */}

      {/* Render Login screen when not authenticated */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AuthScreen;
