import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors, Fonts} from '../utils';
import {ICSearch, ICSearchWhite} from '../assets';
import Gap from './Gap';

const CategoryButtonItem = ({
  icon = <ICSearchWhite />,
  isActive = false,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container(isActive)}>
      {icon}
      <Gap width={moderateScale(8)} />
      <Text style={styles.title(isActive)}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: isActive => ({
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: isActive ? Colors.PRIMARY : Colors.CATEGORY,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
  }),
  title: isActive => ({
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
    color: isActive ? Colors.WHITE : Colors.TEXT,
  }),
});

CategoryButtonItem.propTypes = {
  isActive: propTypes.bool,
  onPress: propTypes.func,
  title: propTypes.string,
  icon: propTypes.any,
};

export default CategoryButtonItem;
