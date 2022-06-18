import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {ICNotifActive} from '../assets';
import {Fonts} from '../utils';
import Gap from './Gap';
import {Colors} from '../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const BaseNotif = ({status, image, title, price, bid, tanggal}) => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <View>
          <Gap height={5} />
          <FastImage source={image} style={styles.image} resizeMode="center" />
        </View>
        <View style={styles.contents}>
          <Text style={styles.statusText}>{status}</Text>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.Text}>{price}</Text>
          <Text style={styles.Text}>{bid}</Text>
        </View>
        <View style={styles.status}>
          <ICNotifActive />
          <Text style={styles.statusText}>{tanggal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
  },
  contents: {
    paddingLeft: moderateScale(16),
  },
  image: {
    borderRadius: moderateScale(12),
    width: moderateScale(48),
    height: moderateScale(48),
  },
  status: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  statusText: {
    fontFamily: Fonts.PRIMARY.LIGHT,
    fontSize: moderateScale(10),
  },
  titleText: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.TEXT,
    fontSize: moderateScale(18),
  },
  Text: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.TEXT,
    fontSize: moderateScale(14),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.DISABLE,
  },
});

BaseNotif.propTypes = {
  status: propTypes.string,
  image: propTypes.any,
  title: propTypes.string,
  price: propTypes.oneOfType([propTypes.string, propTypes.number]),
  bid: propTypes.string,
  tanggal: propTypes.string,
};

export default BaseNotif;
