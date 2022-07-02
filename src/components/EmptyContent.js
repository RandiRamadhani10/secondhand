import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import propTypes from 'prop-types';

const EmptyContent = ({text}) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
};

EmptyContent.propTypes = {
  text: propTypes.string,
};

export default EmptyContent;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  emptyText: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(12),
    color: Colors.TEXT,
    textAlign: 'center',
  },
});
