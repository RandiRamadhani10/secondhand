import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../utils';

const RadioButton = ({selected}) => {
  return <View style={styles.radioActive}>{selected ? <View style={styles.radio} /> : null}</View>;
};

export default RadioButton;

const styles = StyleSheet.create({
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.PRIMARY,
  },
});
