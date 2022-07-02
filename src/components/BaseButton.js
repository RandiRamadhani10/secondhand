import React from 'react';
import propTypes from 'prop-types';

import {moderateScale} from 'react-native-size-matters';

import {Text, TouchableOpacity, StyleSheet, ActivityIndicator, View} from 'react-native';
import {Colors, Fonts} from '../utils';
import Gap from './Gap';

const BaseButton = props => {
  const {title, onPress, style, isLoading, disable, icon} = props;
  return (
    <TouchableOpacity
      testID="base-button"
      accessibilityLabel={`button-${title}`}
      activeOpacity={0.7}
      style={[styles.container(style, icon ? true : false), style, disable && styles.disable]}
      onPress={onPress}
      disabled={disable}>
      {icon ? <View /> : null}

      <View style={styles.titleWrapper}>
        {isLoading && (
          <>
            <ActivityIndicator size="small" accessibilityLabel="loading" color={Colors.WHITE} />
            <Gap width={moderateScale(4)} />
          </>
        )}
        <Text style={styles.title(style)}>{title}</Text>
      </View>

      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (style, isHaveIcon) => ({
    width: style ? style.width : '100%',
    paddingVertical: moderateScale(14),
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    borderRadius: style ? style.borderRadius : moderateScale(16),
    justifyContent: isHaveIcon ? 'space-between' : 'center',
    alignItems: 'center',
    ...style,
  }),
  title: style => ({
    fontFamily: Fonts.PRIMARY.MEDIUM,
    fontSize: moderateScale(14),
    color: style?.color ? style?.color : Colors.WHITE,
  }),
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disable: {
    backgroundColor: Colors.DISABLE,
  },
  iconWrapper: {
    paddingRight: moderateScale(14),
  },
});

BaseButton.propTypes = {
  title: propTypes.string,
  onPress: propTypes.func,
  style: propTypes.object,
  isLoading: propTypes.bool,
  disable: propTypes.bool,
  icon: propTypes.any,
};

export default BaseButton;
