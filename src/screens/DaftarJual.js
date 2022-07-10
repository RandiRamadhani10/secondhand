import React, {Fragment, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {
  Gap,
  CardUser,
  BaseNotif,
  CategoryButtonItem,
  ProductItem,
  ProductItemSkeleton,
  NotificationItemSkeleton,
  BaseTambahProduk,
} from '../components';
import {ICBox, ICBoxActive, ICDollarSign, ICDollarSignActive, ICLove, ICLoveActive, ILPeople} from '../assets';
import {Colors} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {Fonts} from '../utils';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getOrder, getProduct} from '../store/actions/seller';

const DaftarJual = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const [categorySelected, setCategorySelected] = useState('produk');

  const [listData, setListData] = useState([]);

  const [numColumns] = useState({
    produk: 2,
    diminati: 1,
    terjual: 1,
  });

  const usersState = useSelector(state => state.users);

  const isLoadingSellerState = useSelector(state => state.seller.isLoading);

  const getData = async tabSelected => {
    if (tabSelected === 'produk') {
      const res = await dispatch(getProduct());

      if (res) {
        setListData(res?.payload);
      }
    } else if (tabSelected === 'diminati') {
      const res = await dispatch(getOrder({status: ''}));

      if (res) {
        setListData(res?.payload);
      }
    } else if (tabSelected === 'terjual') {
      const res = await dispatch(getOrder({status: 'accepted'}));

      if (res) {
        setListData(res?.payload);
      }
    }
  };

  useEffect(() => {
    getData(categorySelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected, isFocused]);

  const renderList = tabSelected => {
    if (tabSelected === 'produk') {
      return (
        <FlatList
          key={numColumns.produk}
          numColumns={numColumns.produk}
          data={[{}, ...listData]}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          ListEmptyComponent={<BaseTambahProduk />}
          renderItem={({item, index}) => {
            return isLoadingSellerState ? (
              <View key={index} style={styles.loadingContainer}>
                <ProductItemSkeleton />
              </View>
            ) : index === 0 ? (
              <BaseTambahProduk onPress={() => navigation.navigate('Jual')} />
            ) : (
              <ProductItem
                key={index}
                title={item?.name}
                image={item?.image_url}
                category={item.Categories}
                price={item?.base_price}
                onPress={() => navigation.navigate('DetailProduk', {id: item.id})}
              />
            );
          }}
        />
      );
    } else if (tabSelected === 'diminati') {
      return (
        <FlatList
          key={numColumns.diminati}
          numColumns={numColumns.diminati}
          style={styles.listDiminati}
          data={listData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContent}>
              <Gap height={moderateScale(50)} />
              <ILPeople />
              <Gap height={moderateScale(16)} />
              <Text style={styles.emptyText}>
                Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok
              </Text>
            </View>
          }
          renderItem={({item, index}) => {
            return isLoadingSellerState ? (
              <View key={index}>
                <NotificationItemSkeleton />
              </View>
            ) : (
              <Fragment key={item.id}>
                <Gap height={16} />
                <BaseNotif
                  image={item?.Product?.image_url}
                  status={item?.status}
                  title={item?.Product?.name}
                  price={item?.Product?.base_price}
                  bid={`${item?.price}`}
                  tanggal={item?.transaction_date}
                  onPress={() => navigation.navigate('InfoPenawar', {id: item.id})}
                  isRead={true}
                />
                <Gap height={16} />
                <View style={styles.divider} />
              </Fragment>
            );
          }}
        />
      );
    } else if (tabSelected === 'terjual') {
      return (
        <FlatList
          key={numColumns.terjual}
          numColumns={numColumns.terjual}
          style={styles.listDiminati}
          data={listData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContent}>
              <Gap height={moderateScale(50)} />
              <ILPeople />
              <Gap height={moderateScale(16)} />
              <Text style={styles.emptyText}>
                Belum ada produkmu yang terjual nih, sabar ya rejeki nggak kemana kok
              </Text>
            </View>
          }
          renderItem={({item, index}) => {
            return isLoadingSellerState ? (
              <View key={index}>
                <NotificationItemSkeleton />
              </View>
            ) : (
              <Fragment key={item.id}>
                <Gap height={16} />
                <BaseNotif
                  image={item?.Product?.image_url}
                  status={item?.status}
                  title={item?.Product?.name}
                  price={item?.Product?.base_price}
                  bid={`${item?.price}`}
                  tanggal={item?.transact}
                  onPress={() => navigation.navigate('InfoPenawar', {id: item.id})}
                  isRead={true}
                />
                <Gap height={16} />
                <View style={styles.divider} />
              </Fragment>
            );
          }}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.header}>Daftar Jual Saya</Text>
        <Gap height={16} />
        <CardUser
          avatar={usersState?.profile?.image_url}
          name={usersState.profile?.full_name}
          city={usersState.profile?.city}
          button={true}
          onPressEdit={() => navigation.navigate('Profile')}
        />
        <Gap height={24} />
      </View>
      <View style={styles.category}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryButtonItem
            isActive={categorySelected === 'produk'}
            icon={categorySelected === 'produk' ? <ICBoxActive /> : <ICBox />}
            title="Produk"
            onPress={() => setCategorySelected('produk')}
          />
          <Gap width={moderateScale(16)} />
          <CategoryButtonItem
            isActive={categorySelected === 'diminati'}
            icon={categorySelected === 'diminati' ? <ICLoveActive /> : <ICLove />}
            title="Diminati"
            onPress={() => setCategorySelected('diminati')}
          />
          <Gap width={moderateScale(16)} />
          <CategoryButtonItem
            isActive={categorySelected === 'terjual'}
            icon={categorySelected === 'terjual' ? <ICDollarSignActive /> : <ICDollarSign />}
            title="Terjual"
            onPress={() => setCategorySelected('terjual')}
          />
        </ScrollView>
      </View>
      <Gap height={24} />
      {renderList(categorySelected)}
    </SafeAreaView>
  );
};

export default DaftarJual;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(20),
    color: Colors.TEXT,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(16),
  },
  category: {
    paddingHorizontal: moderateScale(20),
  },
  divider: {
    borderBottomColor: Colors.DISABLE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listDiminati: {
    paddingHorizontal: moderateScale(20),
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.SECONDARY,
    textAlign: 'center',
  },
});
