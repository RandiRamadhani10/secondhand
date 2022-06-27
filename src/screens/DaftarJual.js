import React, {Fragment, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Gap, CardUser, BaseNotif, CategoryButtonItem} from '../components';
import {ICBox, ICDollarSign, ICLove, ICLoveActive, IMGDummyProduct} from '../assets';
import {Colors} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {Fonts} from '../utils';

import {useDispatch, useSelector} from 'react-redux';
import {getAllBidProducts} from '../store/actions/buyer';

const DaftarJual = () => {
  const dispatch = useDispatch();

  const buyerState = useSelector(state => state.buyer);

  useEffect(() => {
    dispatch(getAllBidProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <Text style={styles.header}>Daftar Jual Saya</Text>
        <Gap height={16} />
        <CardUser name={'John Doe'} city={'Jakarta'} button={false} />
        <Gap height={24} />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoryButtonItem icon={<ICBox />} title="Semua" onPress={() => {}} />
            <Gap width={moderateScale(16)} />
            <CategoryButtonItem icon={<ICLoveActive />} isActive={true} title="Produk" onPress={() => {}} />
            <Gap width={moderateScale(16)} />
            <CategoryButtonItem icon={<ICDollarSign />} title="Diminati" onPress={() => {}} />
            <Gap width={moderateScale(16)} />
            <CategoryButtonItem title="Terjual" onPress={() => {}} />
          </ScrollView>
        </View>
        <Gap height={24} />
        {buyerState?.bidProducts?.length > 0 &&
          buyerState?.bidProducts?.map(item => {
            return (
              <Fragment key={item.id}>
                <Gap height={16} />
                <BaseNotif
                  image={item?.Product?.image_url}
                  status={'Penawaran Produk'}
                  title={item?.Product?.name}
                  price={item?.Product?.base_price}
                  bid={`Ditawar Rp. ${item?.price}`}
                  tanggal={'20 Apr, 14.04'}
                />
                <Gap height={16} />
                <View style={styles.divider} />
              </Fragment>
            );
          })}
      </ScrollView>
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
