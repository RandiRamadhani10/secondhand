import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ICNotifActive} from '../assets';
import {Fonts, FormatDate} from '../utils';
import Gap from './Gap';
import {Colors} from '../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import NumberFormat from 'react-number-format';

const BaseNotif = ({status, image, title, price, bid, tanggal, onPress, isRead}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View>
          <Gap height={5} />
          <FastImage source={{uri: image}} style={styles.image} resizeMode="center" alt="" testID="productava" />
        </View>
        <View style={styles.contents}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {status === 'bid' || status === 'pending'
                ? 'Penawaran Produk'
                : status === 'accepted'
                ? 'Berhasil terjual'
                : status === 'declined'
                ? 'Penolakan Penawaran'
                : status === 'create'
                ? 'Berhasil diterbitkan'
                : 'Tidak Diketahui'}
            </Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{tanggal ? FormatDate(tanggal) : '-'}</Text>
              {!isRead ? (
                <>
                  <Gap width={5} />
                  <ICNotifActive />
                </>
              ) : null}
            </View>
          </View>
          <Text style={styles.titleText}>{title}</Text>
          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => <Text style={styles.Text}>{formattedValue}</Text>}
          />

          <NumberFormat
            value={bid}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp. '}
            renderText={formattedValue => (
              <Text style={status === 'declined' ? styles.TextStripped : styles.Text}>
                {status === 'accepted' && 'Berhasil Ditawar '}
                {(status === 'bid' || status === 'pending' || status === 'declined') && 'Ditawar '}
                {formattedValue}
              </Text>
            )}
          />
          {status === 'accepted' && (
            <Text style={styles.subTextBidSuccess}>Kamu akan segera dihubungi penjual via whatsapp</Text>
          )}
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
    flex: 1,
    paddingLeft: moderateScale(14),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    borderRadius: moderateScale(12),
    width: moderateScale(48),
    height: moderateScale(48),
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
  TextStripped: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.TEXT,
    fontSize: moderateScale(14),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  subTextBidSuccess: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.SECONDARY,
    fontSize: moderateScale(10),
  },
});

BaseNotif.propTypes = {
  status: propTypes.string,
  image: propTypes.any,
  title: propTypes.string,
  price: propTypes.oneOfType([propTypes.string, propTypes.number]),
  bid: propTypes.oneOfType([propTypes.string, propTypes.number]),
  tanggal: propTypes.string,
  onPress: propTypes.func,
  isRead: propTypes.bool,
};

export default BaseNotif;
