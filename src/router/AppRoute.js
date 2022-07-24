import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Login,
  Notifikasi,
  Profile,
  Daftar,
  Splash,
  DetailProduk,
  InfoPenawar,
  PreviewJual,
  PengaturanAkun,
  Wishlist,
  History,
} from '../screens';

import {getProductById} from '../store/actions/buyer';

import BottomTabs from './BottomTabs';

import {useDispatch} from 'react-redux';

import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  const dispatch = useDispatch();

  const usersState = useSelector(state => state.users);

  const checkAuthority = (navigation, route) => {
    if (!usersState?.users.hasOwnProperty('access_token')) {
      navigation.navigate('Login');
    } else {
      navigation.navigate(route);
    }
  };

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
      <Stack.Screen name="PengaturanAkun" component={PengaturanAkun} />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        listeners={({navigation, route}) => ({
          focus: e => {
            checkAuthority(navigation, route);
          },
        })}
      />
      <Stack.Screen
        name="History"
        component={History}
        listeners={({navigation, route}) => ({
          focus: e => {
            checkAuthority(navigation, route);
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default AppRoute;
