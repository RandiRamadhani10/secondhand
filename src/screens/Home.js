import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';

import {Colors, Fonts} from '../utils';

import {moderateScale} from 'react-native-size-matters';

import {SearchBar, Gap, CategoryButtonItem, ProductItem} from '../components';

import {useForm, Controller} from 'react-hook-form';

import FastImage from 'react-native-fast-image';

import {IMGDummyProduct, IMGGift} from '../assets';

import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      keyword: '',
    },
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.YELLOW, Colors.WHITE]}
          style={styles.linerGradient}>
          <Gap height={moderateScale(8)} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <SearchBar
                value={value}
                placeholder={'Cari di Disini...'}
                onChangeText={onChange}
                onBlur={onBlur}
                onSubmit={handleSubmit(onSubmit)}
              />
            )}
            name="keyword"
          />
          <Gap height={moderateScale(32)} />
          <View style={styles.headerContent}>
            <View style={styles.textHeaderContainer}>
              <Text style={styles.textHeader}>
                Bulan Ramadhan Banyak diskon!
              </Text>
              <Gap height={moderateScale(16)} />
              <Text style={styles.textSubHeader}>Diskon hingga</Text>
              <Text style={styles.textDiscHeader}>60%</Text>
            </View>
            <View style={styles.imageHeaderContainer}>
              <FastImage
                source={IMGGift}
                style={styles.imageHeader}
                resizeMode="center"
              />
            </View>
          </View>
          <Gap height={moderateScale(40)} />
          <Text style={styles.textCategory}>Telusuri Kategori</Text>
          <Gap height={moderateScale(16)} />
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <CategoryButtonItem
                isActive={true}
                title="Semua"
                onPress={() => {}}
              />
              <Gap width={moderateScale(16)} />
              <CategoryButtonItem title="Hobi" onPress={() => {}} />
              <Gap width={moderateScale(16)} />
              <CategoryButtonItem title="Kendaraan" onPress={() => {}} />
              <Gap width={moderateScale(16)} />
              <CategoryButtonItem title="Pakaian" onPress={() => {}} />
            </ScrollView>
          </View>
          <Gap height={moderateScale(28)} />
        </LinearGradient>
        <View style={styles.productContainer}>
          <ProductItem
            title="Jam Tangan Casio Murah"
            image={IMGDummyProduct}
            category="Aksesoris"
            price={250000}
            onPress={() => {
              navigation.navigate('DetailProduk');
            }}
          />
          <ProductItem
            title="Smartwatch Samsung"
            image={IMGDummyProduct}
            category="Aksesoris"
            price={320000}
            onPress={() => {
              navigation.navigate('DetailProduk');
            }}
          />
        </View>
        <Gap height={moderateScale(24)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  linerGradient: {
    flex: 1,
    padding: moderateScale(20),
  },
  headerContent: {
    flexDirection: 'row',
  },
  textHeaderContainer: {
    flex: 9,
  },
  imageHeaderContainer: {
    flex: 6,
  },
  textHeader: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(20),
    lineHeight: moderateScale(30),
    color: Colors.TEXT,
  },
  imageHeader: {
    minWidth: moderateScale(125),
    height: moderateScale(125),
  },
  textSubHeader: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
    color: Colors.TEXT,
  },
  textDiscHeader: {
    fontFamily: Fonts.PRIMARY.MEDIUM,
    fontSize: moderateScale(18),
    color: Colors.ERROR,
  },
  textCategory: {
    fontFamily: Fonts.PRIMARY.MEDIUM,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Home;
