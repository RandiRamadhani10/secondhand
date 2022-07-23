import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, FlatList, TouchableOpacity} from 'react-native';

import {Colors, Fonts} from '../utils';

import {moderateScale} from 'react-native-size-matters';

import {SearchBar, Gap, CategoryButtonItem, ProductItem, ProductItemSkeleton, EmptyContent} from '../components';

import {useForm, Controller} from 'react-hook-form';

import FastImage from 'react-native-fast-image';

import LinearGradient from 'react-native-linear-gradient';

import {SliderBox} from 'react-native-image-slider-box';

const {width} = Dimensions.get('window');

import {useDispatch, useSelector} from 'react-redux';
import {getBanners, getCategory, getProduct, getWishlist} from '../store/actions/buyer';
import {authUser} from '../store/actions/users';

import {useIsFocused} from '@react-navigation/native';
import {ICLoveFill, ICLoveFillActive, ICShopping} from '../assets';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const buyerState = useSelector(state => state.buyer);

  const usersState = useSelector(state => state.users.users);

  const [listBanners, setListBanners] = useState([]);

  const [categorySelectedId, setCategorySelectedId] = useState(0);

  const {control, watch, handleSubmit} = useForm({
    defaultValues: {
      keyword: '',
    },
  });

  const keyword = watch('keyword');

  const getListBanners = useCallback(async () => {
    const response = await dispatch(getBanners());

    if (response) {
      const filteredBanners = [];
      response?.payload.length > 0 && response?.payload?.map(item => filteredBanners.push(item?.image_url));

      return setListBanners(filteredBanners);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    dispatch(
      getProduct({
        category_id: categorySelectedId !== 0 ? categorySelectedId : '',
        search: keyword,
        status: 'available',
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelectedId, keyword, isFocused]);

  useEffect(() => {
    if (buyerState?.category?.length < 1) {
      dispatch(getCategory());
    }

    if (buyerState?.banners?.length < 1) {
      getListBanners();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    if (usersState.hasOwnProperty('access_token')) {
      dispatch(authUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersState?.access_token]);

  useEffect(() => {
    if (usersState.hasOwnProperty('access_token')) {
      dispatch(getWishlist());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onSubmit = data => {
    if (keyword === data.keyword) {
      return;
    } else {
      dispatch(
        getProduct({
          category_id: categorySelectedId !== 0 ? categorySelectedId : '',
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
        <View style={styles.searchBarContainer}>
          <View style={styles.search}>
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
          </View>

          <View style={styles.btnWishlistContainer}>
            <Gap width={10} />
            <TouchableOpacity style={styles.btnWishlist} activeOpacity={0.7} onPress={() => {}}>
              <ICLoveFill />
            </TouchableOpacity>
            <Gap width={10} />
            <TouchableOpacity style={styles.btnWishlist} activeOpacity={0.7} onPress={() => {}}>
              <ICShopping />
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={moderateScale(24)} />
        {listBanners.length > 0 ? (
          <SliderBox
            ImageComponent={FastImage}
            images={listBanners}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            sliderBoxHeight={moderateScale(250)}
            parentWidth={width * 0.9}
            ImageComponentStyle={{borderRadius: moderateScale(16)}}
            resizeMode={'center'}
            imageLoadingColor={Colors.PRIMARY}
            dotColor={Colors.PRIMARY}
            inactiveDotColor={Colors.DISABLE}
            autoplay
            circleLoop
          />
        ) : (
          <EmptyContent text="Belum Ada Banner Terbaru" />
        )}

        <Gap height={moderateScale(32)} />
        <Text style={styles.textCategory}>Telusuri Kategori</Text>
        <Gap height={moderateScale(16)} />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoryButtonItem
              isActive={categorySelectedId === 0}
              title="Semua"
              onPress={() => {
                setCategorySelectedId(0);
              }}
            />
            <Gap width={moderateScale(16)} />
            {buyerState?.category?.length > 0 &&
              buyerState?.category?.map((item, index) => (
                <Fragment key={item.id || index}>
                  <CategoryButtonItem
                    isActive={categorySelectedId === item?.id}
                    title={item.name}
                    onPress={() => {
                      setCategorySelectedId(item?.id);
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

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        ListHeaderComponent={headerContent}
        numColumns={2}
        data={buyerState?.products}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyContent text="Produk yang anda cari tidak ada" />}
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
              onPress={() => navigation.navigate('DetailProduk', {id: item.id})}
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
  searchBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWishlist: {
    backgroundColor: Colors.WHITE,
    padding: moderateScale(18),
    borderRadius: moderateScale(16),
  },
  btnWishlistContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 8,
  },
});

export default Home;
