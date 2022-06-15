import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, Notif, Profile} from '../screens';

// import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Notif" component={Notif} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default AppRoute;
