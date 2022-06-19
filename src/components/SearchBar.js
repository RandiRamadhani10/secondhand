import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, TextInput, View} from 'react-native';
import {ICSearch} from '../assets';
import {Colors, Fonts} from '../utils';
import Gap from './Gap';

import {moderateScale} from 'react-native-size-matters';

const SearchBar = props => {
  const {value, placeholder, onSubmit, onChangeText, onBlur} = props;
  return (
    <View style={styles.searchContainer}>
      <TextInput
        accessibilityLabel="searchInput"
        value={value}
        onChangeText={onChangeText}
        style={styles.searchInput}
        placeholder={placeholder}
        onSubmitEditing={onSubmit}
        onBlur={onBlur}
      />
      <ICSearch />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(16),
  },
  searchInput: {
    width: '90%',
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(24),
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(12),
    color: Colors.TEXT,
  },
});

SearchBar.propTypes = {
  value: propTypes.string,
  placeholder: propTypes.string,
  onSubmit: propTypes.func,
  onChangeText: propTypes.func,
  onBlur: propTypes.func,
};

export default SearchBar;
