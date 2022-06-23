import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../utils';

const Divider = () => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.divider} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.SECONDARY,
  },
});
