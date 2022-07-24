import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import analytics from '@react-native-firebase/analytics';

import AppRoute from './AppRoute';
import {navigationRef, toastConfig} from '../utils';

const Router = () => {
  const routeNameRef = React.useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }

        routeNameRef.current = currentRouteName;
      }}>
      <AppRoute />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Router;
