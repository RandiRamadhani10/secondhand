import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {BaseNotif, Gap} from '../components';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {IMGDummyProduct} from '../assets';

const Notif = ({navigation}) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Notifikasi</Text>
      <Gap height={24} />
      <BaseNotif
        onPress={() => navigation.navigate('InfoPenawar')}
        // image={IMGDummyProduct}
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
        onPress={() => navigation.navigate('InfoPenawar')}
        // image={IMGDummyProduct}
        status={'Penawaran Produk'}
        title={'Jam Tangan Casio'}
        price={'Rp. 250.000'}
        bid={'Ditawar Rp. 200.000'}
        tanggal={'20 Apr, 14.04'}
      />
    </SafeAreaView>
  );
};

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

export default Notif;
