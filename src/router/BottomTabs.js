import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Notifikasi, DaftarJual, Akun, Jual} from '../screens';

import {BottomTabNavigation} from '../components';

import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const usersState = useSelector(state => state.users);

  const checkAuthority = (navigation, route) => {
    if (!usersState?.users.hasOwnProperty('access_token')) {
      navigation.navigate('Login');
    } else {
      navigation.navigate(route);
    }
  };

  return (
    <Tab.Navigator
      defaultScreenOptions="Home"
      tabBar={props => <BottomTabNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Notifikasi"
        component={Notifikasi}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            checkAuthority(navigation, route);
          },
        })}
      />
      <Tab.Screen
        name="Jual"
        component={Jual}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            checkAuthority(navigation, route);
          },
        })}
      />
      <Tab.Screen
        name="DaftarJual"
        component={DaftarJual}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            checkAuthority(navigation, route);
          },
        })}
      />
      <Tab.Screen
        name="Akun"
        component={Akun}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            checkAuthority(navigation, route);
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
