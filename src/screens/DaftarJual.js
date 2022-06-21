import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import { 
  Gap,
  CardUser,
  BaseNotif,
  CategoryButtonItem
} from '../components';
import { IMGDummyProduct } from '../assets';
import { Colors } from '../utils';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../utils';


const DaftarJual = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Daftar Jual Saya</Text>
      <Gap height={16} />
      <CardUser 
        name={'John Doe'}
        city={'Jakarta'}
        button={false}
      />
      <Gap height={24} />
      <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <CategoryButtonItem title="Semua"onPress={() => {}}/>
              <Gap width={moderateScale(16)} />
              <CategoryButtonItem isActive={true} title="Produk" onPress={() => {}} />
              <Gap width={moderateScale(16)} />
              <CategoryButtonItem title="Diminati" onPress={() => {}} />
              <Gap width={moderateScale(16)} />
              <CategoryButtonItem title="Terjual" onPress={() => {}} />
            </ScrollView>
          </View>
        <Gap height={24} />
        <BaseNotif
        image={IMGDummyProduct}
        status={'Penawaran Produk'}
        title={'Jam Tangan Casio'}
        price={'Rp. 250.000'}
        bid={'Ditawar Rp. 200.000'}
        tanggal={'20 Apr, 14.04'}
      />
      <Gap height={16} />
      <View style={styles.divider} />
      <Gap height={16} />
      <BaseNotif
        image={IMGDummyProduct}
        status={'Penawaran Produk'}
        title={'Jam Tangan Casio'}
        price={'Rp. 250.000'}
        bid={'Ditawar Rp. 200.000'}
        tanggal={'20 Apr, 14.04'}
      />
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
