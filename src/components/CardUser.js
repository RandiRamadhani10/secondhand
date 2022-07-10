import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {Fonts} from '../utils';
import {Gap} from './Gap';
import {Colors} from '../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const CardUser = ({avatar, name, city, button = true, isActive = false, isHaveBorder = true, onPressEdit}) => {
  return (
    <View style={styles.mainCard(isHaveBorder)}>
      <View style={styles.icon}>
        {avatar ? (
          <FastImage style={styles.image} resizeMode="cover" source={{uri: avatar}} alt="" testID="userava" />
        ) : (
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={require('../assets/images/img-placeholder-product.png')}
            alt=""
            testID="userava"
          />
        )}
      </View>
      <View style={styles.contentText}>
        <Text style={styles.name}>{name}</Text>
        <Text>{city}</Text>
      </View>
      {button ? (
        <View style={styles.buttonPlace}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={Colors.CATEGORY}
            style={styles.button(isActive)}
            onPress={onPressEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
        </View>
      ) : null}
    </View>
  );
};

CardUser.propTypes = {
  isActive: propTypes.bool,
  avatar: propTypes.string,
  name: propTypes.oneOfType([propTypes.string, propTypes.number]),
  city: propTypes.string,
  button: propTypes.bool,
  isHaveBorder: propTypes.bool,
  onPressEdit: propTypes.func,
};

const styles = StyleSheet.create({
  mainCard: isHaveBorder => ({
    height: moderateScale(80),
    width: '100%',
    alignItems: 'center',
    borderRadius: moderateScale(16),
    backgroundColor: 'transparent',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: isHaveBorder ? 1 : 0,
    flexDirection: 'row',
  }),
  icon: {
    marginLeft: moderateScale(18),
  },
  name: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  contentText: {
    marginLeft: moderateScale(16),
  },
  buttonPlace: {
    marginLeft: 'auto',
    marginRight: moderateScale(16),
  },
  button: isActive => ({
    backgroundColor: Colors.WHITE,
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(10),
    width: moderateScale(47),
    height: moderateScale(26),
    alignItems: 'center',
    borderColor: Colors.PRIMARY,
  }),
  buttonText: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.TEXT,
    fontSize: moderateScale(12),
    marginTop: moderateScale(2),
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(4),
  },
});

export default CardUser;
