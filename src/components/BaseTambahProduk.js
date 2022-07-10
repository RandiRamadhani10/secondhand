import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {ICPlusNoBorder} from '../assets';
import {Colors, Fonts} from '../utils';
import Gap from './Gap';

const BaseTambahProduk = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.container}>
      <ICPlusNoBorder />
      <Gap height={moderateScale(8)} />
      <Text style={styles.text}>Tambah Produk</Text>
    </TouchableOpacity>
  );
};

export default BaseTambahProduk;

const styles = StyleSheet.create({
  container: {
    margin: moderateScale(12),
    width: '44%',
    height: moderateScale(205),
    backgroundColor: Colors.WHITE,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: Colors.DISABLE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.SECONDARY,
    fontSize: moderateScale(12),
  },
});

BaseTambahProduk.propTypes = {
  onPress: propTypes.func,
};
