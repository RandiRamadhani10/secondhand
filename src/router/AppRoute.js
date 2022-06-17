import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, Notif, Profile, Daftar, TambahBarang} from '../screens';
// import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="TambahBarang"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Notif" component={Notif} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Daftar" component={Daftar} />
      <Stack.Screen name="TambahBarang" component={TambahBarang} />
    </Stack.Navigator>
  );
};

export default AppRoute;
