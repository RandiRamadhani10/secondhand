import React, {useEffect} from 'react';

import {Alert} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import analytics from '@react-native-firebase/analytics';

import AppRoute from './AppRoute';
import {navigationRef, toastConfig, notification} from '../utils';

import messaging from '@react-native-firebase/messaging';

const Router = () => {
  const routeNameRef = React.useRef();

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // Get the message_id
    let message_id = remoteMessage.messageId;
    // Extract the body
    let message_body = remoteMessage.notification.body;
    // Extract the title
    let message_title = remoteMessage.notification.title;
    // Extract the notification image
    let avatar = remoteMessage.notification.android.imageUrl;

    notification.configure();
    notification.createChannel(message_id, message_title, message_body);
    notification.sendNotification(message_id, message_title, message_body, avatar);
  });

  useEffect(() => {
    const subscribe = messaging().onMessage(async remoteMessage => {
      // Get the message_id
      let message_id = remoteMessage.messageId;

      // Get the message body
      let message_body = remoteMessage.notification.body;

      // Get the message title
      let message_title = remoteMessage.notification.title;

      // Get message image
      let avatar = remoteMessage.notification.android.imageUrl;

      // Show Notification
      notification.configure();
      notification.createChannel(message_id, message_title, message_body);
      notification.sendNotification(message_id, message_title, message_body, avatar);
    });

    return subscribe;
  }, []);

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
