import React from 'react';
import {View} from 'react-native';
import propTypes from 'prop-types';

const Gap = ({height, width}) => {
  return <View style={{height: height, width: width}} />;
};

Gap.propTypes = {
  height: propTypes.number,
  width: propTypes.number,
};

export default Gap;
