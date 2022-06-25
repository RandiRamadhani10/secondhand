import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, FlatList} from 'react-native';

import {Colors, Fonts} from '../utils';

import {moderateScale} from 'react-native-size-matters';

import {SearchBar, Gap, CategoryButtonItem, ProductItem, ProductItemSkeleton} from '../components';

import {useForm, Controller} from 'react-hook-form';

import {useIsFocused} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';

import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

import {useDispatch, useSelector} from 'react-redux';
import {getProduct, getProductById} from '../store/actions/buyer';
import {IMGGift} from '../assets';

const Home = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const buyerState = useSelector(state => state.buyer);

  const [categorySelected, setCategorySelected] = useState({
    id: 0,
    name: '',
  });

  const [listCategory, setListCategory] = useState([]);

  const filterCategory = () => {
    const filteredId = [];
    const filtered = [];
    buyerState.products.length > 0 &&
      buyerState.products.map(item => {
        if (item?.Categories.length > 0 && item?.Categories.length === 1) {
          // console.log('ini item category 1', item);
          if (!filteredId.includes(item.Categories[0].id)) {
            filteredId.push(item?.Categories[0].id);
            filtered.push(item?.Categories[0]);
          }
        } else if (item?.Categories.length >= 2) {
          // console.log('ini item category 2', item);

          for (const value of item?.Categories) {
            // console.log('ini value', value.id);
            if (!filteredId.includes(value.id)) {
              filteredId.push(value.id);
              filtered.push(value);
            }
          }
        }
      });

    return setListCategory(filtered);
  };

  const {control, watch, handleSubmit} = useForm({
    defaultValues: {
      keyword: '',
    },
  });

  const keyword = watch('keyword');

  useEffect(() => {
    dispatch(
      getProduct({
        category_id: categorySelected?.id !== 0 ? categorySelected?.id : '',
        search: keyword,
        status: 'available',
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, categorySelected?.id, keyword, listCategory.length]);

  useEffect(() => {
    if (buyerState.products.length > 0) {
      filterCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = data => {
    if (keyword === data.keyword) {
      return;
    } else {
      dispatch(
        getProduct({
          category_id: categorySelected?.id,
          search: data.keyword,
          status: 'available',
        }),
      );
    }
  };

  const headerContent = (
    <View>
      <LinearGradient colors={[Colors.YELLOW, Colors.WHITE]} style={styles.linerGradient}>
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
            <Text style={styles.textHeader}>Bulan Ramadhan Banyak diskon!</Text>
            <Gap height={moderateScale(16)} />
            <Text style={styles.textSubHeader}>Diskon hingga</Text>
            <Text style={styles.textDiscHeader}>60%</Text>
          </View>
          <View style={styles.imageHeaderContainer}>
            <FastImage source={IMGGift} style={styles.imageHeader} resizeMode="center" />
          </View>
        </View>
        <Gap height={moderateScale(40)} />
        <Text style={styles.textCategory}>Telusuri Kategori</Text>
        <Gap height={moderateScale(16)} />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoryButtonItem
              isActive={categorySelected?.id === 0}
              title="Semua"
              onPress={() => {
                setCategorySelected({id: 0, name: ''});
              }}
            />
            <Gap width={moderateScale(16)} />
            {listCategory.length > 0 &&
              listCategory?.map((item, index) => (
                <Fragment key={item.id || index}>
                  <CategoryButtonItem
                    isActive={categorySelected?.id === item?.id}
                    title={item.name}
                    onPress={() => {
                      setCategorySelected(item);
                    }}
                  />
                  <Gap width={moderateScale(16)} />
                </Fragment>
              ))}
          </ScrollView>
        </View>
        <Gap height={moderateScale(28)} />
      </LinearGradient>
    </View>
  );

  const emptyContent = (
    <View style={styles.screen}>
      <Text style={styles.emptyText}>Produk yang anda cari tidak ada</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        ListHeaderComponent={headerContent}
        numColumns={2}
        data={buyerState?.products}
        keyExtractor={item => item.id}
        ListEmptyComponent={emptyContent}
        renderItem={({item}) => {
          return buyerState.isLoading ? (
            <View style={styles.loadingContainer}>
              <ProductItemSkeleton />
            </View>
          ) : (
            <ProductItem
              key={item.id}
              title={item?.name}
              image={item?.image_url}
              category={item.Categories}
              price={item?.base_price}
              onPress={() => {
                navigation.navigate('DetailProduk', {id: item.id});
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  emptyText: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(12),
    color: Colors.TEXT,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
