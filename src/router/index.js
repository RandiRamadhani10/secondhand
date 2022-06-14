import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AppRoute from './AppRoute';

const Router = () => {
  return (
    <NavigationContainer>
      <AppRoute />
    </NavigationContainer>
  );
};

export default Router;
