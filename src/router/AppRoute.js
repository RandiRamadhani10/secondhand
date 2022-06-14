import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, Daftar} from '../screens';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Daftar" component={Daftar} />
    </Stack.Navigator>
  );
};

export default AppRoute;
