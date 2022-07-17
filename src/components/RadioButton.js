import React, {Fragment, useState} from 'react';
import propTypes from 'prop-types';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors, Fonts} from '../utils';
import Gap from './Gap';

const RadioButton = ({choices}) => {
  const [isChecked, setIsChecked] = useState(0);

  return (
    <Fragment>
      {choices.map((choice, index) => {
        return (
          <Fragment key={index}>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => {
                  setIsChecked(index);
                  choice?.onChecked();
                }}>
                {isChecked === index && <View style={styles.selectedRb} />}
              </TouchableOpacity>
              <Gap width={moderateScale(16)} />
              <View style={styles.textContainer}>
                <Text style={styles.choiceTitle}>{choice?.text}</Text>
                <Text style={styles.choiceDesc}>{choice?.subText}</Text>
              </View>
            </View>
            <Gap height={moderateScale(24)} />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  choices: propTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  radioCircle: {
    marginTop: moderateScale(5),
    height: moderateScale(17),
    width: moderateScale(17),
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(50),
    backgroundColor: Colors.PRIMARY,
  },
  result: {
    marginTop: moderateScale(10),
    color: Colors.WHITE,
    fontFamily: Fonts.PRIMARY.REGULAR,
    backgroundColor: Colors.DISABLE,
  },
  textContainer: {
    marginRight: moderateScale(20),
  },
  choiceTitle: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  choiceDesc: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.SECONDARY,
  },
});
