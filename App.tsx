import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {BottomNavigator} from './src/Component/BottomNavigator/BottomNavigator';
// import {DailyTaskHomePage} from './src/Component/DailyTask/DailyTaskHomePage';
// import DisplayTask from './src/Component/DailyTask/DisplayTask';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './src/context/AuthContext';
import AuthScreen from './src/Component/Screens/AuthScreen';
import {BottomNavigator} from './src/Component/BottomNavigator/BottomNavigator';
import {DailyTaskHomePage} from './src/Component/DailyTask/DailyTaskHomePage';
import DisplayTask from './src/Component/DailyTask/DisplayTask';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={BottomNavigator} />
    //     <Stack.Screen name="DailyTaskHomePage" component={DailyTaskHomePage} />
    //     <Stack.Screen name="DisplayTask" component={DisplayTask} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName="auth">
            <Stack.Screen name="auth" component={AuthScreen} />
            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen
              name="DailyTaskHomePage"
              component={DailyTaskHomePage}
            />
            <Stack.Screen name="DisplayTask" component={DisplayTask} />
          </Stack.Navigator> */}

          <AuthScreen />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
