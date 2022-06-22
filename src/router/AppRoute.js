import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Login,
  Notifikasi,
  Profile,
  Daftar,
  Splash,
<<<<<<< HEAD
  InfoPenawar,
=======
  DaftarJual,
  DetailProduk,
>>>>>>> f40331a078731cb6c422a4c9d8bfed42f3c7e346
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
<<<<<<< HEAD
      <Stack.Screen name="InfoPenawar" component={InfoPenawar} />
=======
      <Stack.Screen name="DetailProduk" component={DetailProduk} />
>>>>>>> f40331a078731cb6c422a4c9d8bfed42f3c7e346
    </Stack.Navigator>
  );
};

export default AppRoute;
