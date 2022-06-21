import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Login,
  Notifikasi,
  Profile,
  Daftar,
  Splash,
  InfoPenawar,
} from '../screens';

import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Notifikasi" component={Notifikasi} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Daftar" component={Daftar} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="InfoPenawar" component={InfoPenawar} />
    </Stack.Navigator>
  );
};

export default AppRoute;
