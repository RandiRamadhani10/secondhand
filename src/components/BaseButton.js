import React from 'react';
import propTypes from 'prop-types';

import {moderateScale} from 'react-native-size-matters';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors, Fonts} from '../utils';

const BaseButton = props => {
  const {title, onPress, style, isLoading, disable} = props;
  return (
    <TouchableOpacity
      testID="base-button"
      accessibilityLabel={`button-${title}`}
      activeOpacity={0.7}
      style={[styles.container(style), style, disable && styles.disable]}
      onPress={onPress}
      disabled={disable}>
      {isLoading && (
        <ActivityIndicator
          size="small"
          accessibilityLabel="loading"
          color={Colors.WHITE}
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: style => ({
    width: style ? style.width : '100%',
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    borderRadius: style ? style.borderRadius : 100,
    justifyContent: 'center',
    alignItems: 'center',
    ...style,
  }),
  title: {
    fontFamily: Fonts.PRIMARY.MEDIUM,
    fontSize: moderateScale(16),
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    color: Colors.WHITE,
  },
  disable: {
    backgroundColor: Colors.DISABLE,
  },
});

BaseButton.propTypes = {
  title: propTypes.string,
  onPress: propTypes.func,
  style: propTypes.object,
  isLoading: propTypes.bool,
  disable: propTypes.bool,
};

export default BaseButton;
