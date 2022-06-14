import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Fonts} from '../utils';
import Gap from './Gap';

const BaseInput = ({
  label,
  type,
  placeholder,
  onChangeText,
  onBlur,
  value,
  styles: stylesProps,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Gap height={4} />
      <TextInput
        style={[styles.input, ...stylesProps]}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        secureTextEntry={type === 'password' ? true : false}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default BaseInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: Fonts.PRIMARY.REGULAR,
  },
  input: {
    fontSize: 12,
    fontFamily: Fonts.PRIMARY.REGULAR,
  },
});

BaseInput.propTypes = {
  label: propTypes.string,
  type: propTypes.oneOf[('text', 'password')],
  placeholder: propTypes.string,
  onChangeText: propTypes.func,
  onBlur: propTypes.func,
  value: propTypes.string,
  styles: propTypes.object,
};
