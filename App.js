import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import DashBoard from './src/dashboard/DashBoard';
import DashHome from './src/dashboard/DashHome';
import AnnualReport from './src/dashboard/AnnualReport';
import Movements from './src/dashboard/Movements';
import Accounts from './src/dashboard/Accounts';
import Goals from './src/dashboard/Goals';
import Settings from './src/dashboard/Settings';
import UserAccount from './src/dashboard/UserAccount';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="DashBoard" component={DashBoard} />
          <Stack.Screen name="DashHome" component={DashHome} />
          <Stack.Screen name="AnnualReport" component={AnnualReport} />
          <Stack.Screen name="Movements" component={Movements} />
          <Stack.Screen name="Accounts" component={Accounts} />
          <Stack.Screen name="Goals" component={Goals} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="UserAccount" component={UserAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
