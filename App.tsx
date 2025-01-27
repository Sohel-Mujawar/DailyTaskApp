import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomNavigator} from './src/Component/BottomNavigator/BottomNavigator';
import {DailyTaskHomePage} from './src/Component/DailyTask/DailyTaskHomePage';
import DisplayTask from './src/Component/DailyTask/DisplayTask';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="DailyTaskHomePage" component={DailyTaskHomePage} />
        <Stack.Screen name="DisplayTask" component={DisplayTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
