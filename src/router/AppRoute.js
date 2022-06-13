import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from '../screens';

// import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AppRoute;
