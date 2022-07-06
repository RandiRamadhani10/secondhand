import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Colors} from '../utils/Colors';
import {ICPlus} from '../assets';
import propTypes from 'prop-types';
import {Fonts} from '../utils';
import Gap from './Gap';
import {moderateScale, scale} from 'react-native-size-matters';
const BaseUploadPhoto = ({scale, label, onPress}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Gap height={4} />
      <TouchableOpacity activeOpacity={0.7} style={styles.parent} onPress={onPress}>
        <ICPlus />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: Colors.DISABLE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.TEXT,
  },
});
BaseUploadPhoto.propTypes = {
  scale: propTypes.number,
  label: propTypes.string,
  onPress: propTypes.func,
};
export default BaseUploadPhoto;
