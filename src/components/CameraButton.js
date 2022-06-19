import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ICCamera} from '../assets';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../utils';

const CameraButton = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cameraCard}>
        <ICCamera />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cameraCard: {
    width: moderateScale(96),
    height: moderateScale(96),
    backgroundColor: Colors.SOFTPRIMARY,
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

CameraButton.propTypes = {
  onPress: propTypes.func,
};

export default CameraButton;
