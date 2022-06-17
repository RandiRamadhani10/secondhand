import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import {Fonts} from './Fonts';

import {Colors} from './Colors';
import {moderateScale} from 'react-native-size-matters';
import {ICCloseWhite} from '../assets';

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

  successToast: ({text1}) => (
    <View
      style={{
        height: moderateScale(60),
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.SUCCESS,
        borderRadius: moderateScale(16),
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(16),
      }}>
      <Text
        style={{
          color: Colors.WHITE,
          fontSize: moderateScale(14),
          fontFamily: Fonts.PRIMARY.MEDIUM,
        }}>
        {text1}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          Toast.hide();
        }}>
        <ICCloseWhite />
      </TouchableOpacity>
    </View>
  ),

  errorToast: ({text1}) => (
    <View
      style={{
        height: moderateScale(60),
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.ERROR,
        borderRadius: moderateScale(16),
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(16),
      }}>
      <Text
        style={{
          color: Colors.WHITE,
          fontSize: moderateScale(14),
          fontFamily: Fonts.PRIMARY.MEDIUM,
        }}>
        {text1}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          Toast.hide();
        }}>
        <ICCloseWhite />
      </TouchableOpacity>
    </View>
  ),
};

export const showSuccess = ({title = 'Success'}) => {
  Toast.show({
    type: 'successToast',
    text1: title,
    onPress: () => Toast.hide(),
    autoHide: true,
  });
};

export const showError = ({title = 'Error'}) => {
  Toast.show({
    type: 'errorToast',
    text1: title,
    onPress: () => Toast.hide(),
    autoHide: true,
  });
};
