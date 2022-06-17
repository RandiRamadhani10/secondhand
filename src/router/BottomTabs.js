import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  Home,
  Notifikasi,
  Jual,
  DaftarJual,
  Akun,
  TambahBarang,
} from '../screens';

import {BottomTabNavigation} from '../components';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      defaultScreenOptions="Home"
      tabBar={props => <BottomTabNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notifikasi" component={Notifikasi} />
      <Tab.Screen name="TambahBarang" component={TambahBarang} />
      <Tab.Screen name="DaftarJual" component={DaftarJual} />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
};

export default BottomTab;
