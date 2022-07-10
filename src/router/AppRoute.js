import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, Notifikasi, Profile, Daftar, Splash, DetailProduk, InfoPenawar, PreviewJual} from '../screens';

import {getProductById} from '../store/actions/buyer';

import BottomTabs from './BottomTabs';

import {useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Notifikasi" component={Notifikasi} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Daftar" component={Daftar} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen
        name="DetailProduk"
        component={DetailProduk}
        listeners={({navigation, route}) => ({
          focus: e => {
            dispatch(getProductById(route.params.id));
          },
        })}
      />
      <Stack.Screen name="InfoPenawar" component={InfoPenawar} />
      <Stack.Screen name="PreviewJual" component={PreviewJual} />
    </Stack.Navigator>
  );
};

export default AppRoute;
