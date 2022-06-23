import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors, Fonts} from '../utils';

import {moderateScale} from 'react-native-size-matters';

import {useSelector} from 'react-redux';

const Splash = props => {
  const {navigation} = props;

  const usersState = useSelector(state => state.users.user);

  useEffect(() => {
    setTimeout(() => {
      if (usersState.hasOwnProperty('access_token')) {
        navigation.reset({index: 0, routes: [{name: 'Main'}]});
      } else {
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Second</Text>
        <Text style={styles.title}>Hand.</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(40),
    lineHeight: moderateScale(46),
    color: Colors.WHITE,
    fontFamily: Fonts.PRIMARY.BOLD,
  },
});
