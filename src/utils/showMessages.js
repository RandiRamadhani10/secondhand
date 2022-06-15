import React from 'react';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import {Fonts} from './Fonts';

import {Colors} from './Colors';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: Colors.SUCCESS}}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: Colors.SUCCESS,
      }}
      text1Style={{
        color: Colors.WHITE,
        fontSize: 12,
        fontFamily: Fonts.PRIMARY.MEDIUM,
      }}
      text1NumberOfLines={2}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: Colors.ERROR}}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: Colors.ERROR,
      }}
      text1Style={{
        color: Colors.WHITE,
        fontSize: 14,
        fontFamily: Fonts.PRIMARY.MEDIUM,
      }}
    />
  ),
};

export const showSuccess = ({title = 'Success'}) => {
  Toast.show({
    type: 'success',
    text1: title,
  });
};

export const showError = ({title = 'Error'}) => {
  Toast.show({
    type: 'error',
    text1: title,
  });
};
