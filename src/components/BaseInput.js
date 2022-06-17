import React, {useState} from 'react';
import propTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Fonts} from '../utils';
import Gap from './Gap';
import {Colors} from '../utils/Colors';
import {ICEye, ICEyeActive} from '../assets';

import {moderateScale} from 'react-native-size-matters';

const BaseInput = ({
  label,
  type,
  placeholder,
  onChangeText,
  onBlur,
  value,
  multiline,
  numberOfLines,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Gap height={4} />
      <TextInput
        style={styles.formInput(type)}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        multiline={multiline == undefined ? false : multiline}
        numberOfLines={numberOfLines == undefined ? 1 : numberOfLines}
        secureTextEntry={
          type === 'password' ? (showPassword ? true : false) : false
        }
        onChangeText={onChangeText}
      />
      {type === 'password' && (
        <TouchableOpacity
          style={styles.eyeIcon}
          accessibilityLabel="icon-toggle-password"
          onPress={handleShowPassword}
          activeOpacity={0.7}>
          {showPassword ? <ICEye /> : <ICEyeActive />}
        </TouchableOpacity>
      )}

      <Gap height={16} />
    </View>
  );
};

export default BaseInput;

const styles = StyleSheet.create({
  label: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.TEXT,
  },
  formInput: type => ({
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
    paddingLeft: moderateScale(16),
    paddingRight: type === 'password' ? moderateScale(56) : moderateScale(18),
    paddingVertical: moderateScale(14),
    borderColor: Colors.PLACEHOLDER,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
  }),
  eyeIcon: {
    position: 'absolute',
    top: moderateScale(0),
    right: moderateScale(24),
    bottom: moderateScale(-10),
    justifyContent: 'center',
    color: Colors.TEXT,
  },
});

BaseInput.propTypes = {
  label: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChangeText: propTypes.func,
  onBlur: propTypes.func,
  value: propTypes.string,
  styles: propTypes.object,
  multiline: propTypes.bool,
  numberOfLines: propTypes.number,
};
