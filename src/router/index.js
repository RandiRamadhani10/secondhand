import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import AppRoute from './AppRoute';
import {toastConfig} from '../utils';

const Router = () => {
  return (
    <NavigationContainer>
      <AppRoute />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Router;
