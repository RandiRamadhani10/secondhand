import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Gap, BaseNotif, CardUser } from '../components';
import { Colors } from '../utils';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../utils';


const DaftarJual = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Daftar Jual Saya</Text>
      <Gap height={16} />
      <CardUser/>
      <Gap height={24} />
      
    </SafeAreaView>
  );
};

export default DaftarJual;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: moderateScale(20),
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(20),
    color: Colors.TEXT,
  },
  divider: {
    borderBottomColor: Colors.DISABLE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
