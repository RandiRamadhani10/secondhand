import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {Colors} from '../utils';
import {moderateScale} from 'react-native-size-matters';

const Home = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: moderateScale(20),
  },
});
