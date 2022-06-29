import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Gap, CardUser, BaseNotif, BaseButton} from '../components';
import {ICArrowLeft, IMGDummyProduct} from '../assets';
import {Colors} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {Fonts} from '../utils';

const InfoPenawar = ({navigation}) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={16} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Main', {screen: 'Notifikasi'});
          }}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Text style={styles.header}>Info Penawar</Text>
        <Gap height={40} />
      </View>
      <Gap height={24} />
      <CardUser name={'Nama Pembeli'} city={'kota'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={24} />
        <Text style={styles.title}>Daftar Produkmu yang Ditawar</Text>
        <Gap height={16} />
        <BaseNotif
          image={IMGDummyProduct}
          status={'Penawaran Produk'}
          title={'Jam Tangan Casio'}
          price={'Rp. 250.000'}
          bid={'Ditawar Rp. 200.000'}
          tanggal={'20 Apr, 14.04'}
        />
        <Gap height={16} />
        <View style={styles.buttons}>
          <View>
            <BaseButton title={'Tolak'} style={styles.decline} />
          </View>
          <View>
            <BaseButton title={'Terima'} style={styles.accept} />
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.divider} />
        <Gap height={16} />
        <BaseNotif
          image={IMGDummyProduct}
          status={'Penawaran Produk'}
          title={'Smartwatch Samsung Galaxy Pro 5'}
          price={'Rp 3.550.000'}
          bid={'Ditawar Rp 2.000.000'}
          tanggal={'1 Apr, 09:08'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: moderateScale(20),
  },
  label: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.PRIMARY.REGULAR,
    color: Colors.TEXT,
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
    marginLeft: moderateScale(100),
  },
  head: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: Fonts.PRIMARY.MEDIUM,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  divider: {
    borderBottomColor: Colors.DISABLE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accept: {
    paddingVertical: moderateScale(7),
    width: moderateScale(156),
    borderRadius: moderateScale(16),
  },
  decline: {
    width: moderateScale(156),
    paddingVertical: moderateScale(7),
    height: moderateScale(36),
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
  },
});

export default InfoPenawar;
