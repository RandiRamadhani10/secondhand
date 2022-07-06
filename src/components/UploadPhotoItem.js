import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from 'react-native-size-matters';
import {ICClosePrimary} from '../assets';
import {Colors} from '../utils';

const UploadPhotoItem = ({onPress, source}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.removePhotoItem} activeOpacity={0.7} onPress={onPress}>
        <ICClosePrimary />
      </TouchableOpacity>
      <FastImage source={{uri: source}} style={styles.uploadPhotoItem} />
    </View>
  );
};

UploadPhotoItem.propTypes = {
  onPress: propTypes.func,
  source: propTypes.any,
};

export default UploadPhotoItem;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  uploadPhotoItem: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: Colors.DISABLE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removePhotoItem: {
    top: moderateScale(0),
    right: moderateScale(0),
  },
});
