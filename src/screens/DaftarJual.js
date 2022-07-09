import React, {Fragment, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Gap, CardUser, BaseNotif, CategoryButtonItem} from '../components';
import {ICBox, ICDollarSign, ICLoveActive} from '../assets';
import {Colors} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {Fonts} from '../utils';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct} from '../store/actions/seller';
import {getAllBidProducts} from '../store/actions/buyer';

const DaftarJual = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const [categorySelected, setCategorySelected] = useState('produk');

  const [listData, setListData] = useState([]);

  const buyerState = useSelector(state => state.buyer);

  const usersState = useSelector(state => state.users);

  const getData = async tabSelected => {
    if (tabSelected === 'diminati') {
      const res = await dispatch(getAllBidProducts());

      if (res) {
        setListData(res?.payload);
      }
    }
  };

  useEffect(() => {
    if (!usersState?.users.hasOwnProperty('access_token')) {
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    getData(categorySelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <Text style={styles.header}>Daftar Jual Saya</Text>
        <Gap height={16} />
        <CardUser
          avatar={usersState?.profile?.image_url}
          name={usersState.profile?.full_name}
          city={usersState.profile?.city}
          button={false}
        />
        <Gap height={24} />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoryButtonItem
              isActive={categorySelected === ''}
              icon={<ICBox />}
              title="Semua"
              onPress={() => setCategorySelected('')}
            />
            <Gap width={moderateScale(16)} />
            <CategoryButtonItem
              isActive={categorySelected === 'produk'}
              icon={<ICLoveActive />}
              title="Produk"
              onPress={() => setCategorySelected('produk')}
            />
            <Gap width={moderateScale(16)} />
            <CategoryButtonItem
              isActive={categorySelected === 'diminati'}
              icon={<ICDollarSign />}
              title="Diminati"
              onPress={() => setCategorySelected('diminati')}
            />
            <Gap width={moderateScale(16)} />
            <CategoryButtonItem
              isActive={categorySelected === 'terjual'}
              title="Terjual"
              onPress={() => setCategorySelected('terjual')}
            />
          </ScrollView>
        </View>
        <Gap height={24} />
        {listData.length > 0 &&
          listData.map(item => {
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
                  onPress={() => navigation.navigate('InfoPenawar', {id: item.id})}
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
