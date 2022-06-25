import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import {Fonts} from './Fonts';

import {Colors} from './Colors';
import {moderateScale} from 'react-native-size-matters';
import {ICCloseWhite} from '../assets';

export const toastConfig = {
  successToast: ({text1, text2}) => (
    <View style={styles.successContainer}>
      {text2 ? (
        <View style={styles.contentContainer}>
          <Text style={styles.successText}>{text1}</Text>
          <Text style={styles.successDescription}>{text2}</Text>
        </View>
      ) : (
        <Text style={styles.successText}>{text1}</Text>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          Toast.hide();
        }}>
        <ICCloseWhite />
      </TouchableOpacity>
    </View>
  ),

  errorToast: ({text1, text2}) => (
    <View style={styles.errorContainer}>
      {text2 ? (
        <View style={styles.contentContainer}>
          <Text style={styles.errorText}>{text1}</Text>
          <Text style={styles.errorDescription}>{text2}</Text>
        </View>
      ) : (
        <Text style={styles.errorText}>{text1}</Text>
      )}
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

export const showSuccess = ({title = 'Success', description}) => {
  Toast.show({
    type: 'successToast',
    text1: title,
    text2: description && description,
    onPress: () => Toast.hide(),
    autoHide: true,
  });
};

export const showError = ({title = 'Error', description}) => {
  Toast.show({
    type: 'errorToast',
    text1: title,
    text2: description && description,
    onPress: () => Toast.hide(),
    autoHide: true,
  });
};

const styles = StyleSheet.create({
  successContainer: {
    height: moderateScale(60),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.SUCCESS,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(16),
  },
  successText: {
    color: Colors.WHITE,
    fontSize: moderateScale(14),
    fontFamily: Fonts.PRIMARY.MEDIUM,
  },
  successDescription: {
    color: Colors.WHITE,
    fontSize: moderateScale(10),
    fontFamily: Fonts.PRIMARY.REGULAR,
  },
  errorContainer: {
    height: moderateScale(60),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.ERROR,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(16),
  },
  errorText: {
    color: Colors.WHITE,
    fontSize: moderateScale(14),
    fontFamily: Fonts.PRIMARY.MEDIUM,
  },
  errorDescription: {
    color: Colors.WHITE,
    fontSize: moderateScale(10),
    fontFamily: Fonts.PRIMARY.REGULAR,
  },
  contentContainer: {
    flexDirection: 'column',
  },
});
