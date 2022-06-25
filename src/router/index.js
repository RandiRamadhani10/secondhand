import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import AppRoute from './AppRoute';
import {navigationRef, toastConfig} from '../utils';

const Router = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppRoute />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Router;
