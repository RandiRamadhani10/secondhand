import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import {EmptyContent, Gap, ProductItem, ProductItemSkeleton} from '../components';
import {moderateScale} from 'react-native-size-matters';
import {ICArrowLeft} from '../assets';
import {Colors, Fonts} from '../utils';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getWishlist} from '../store/actions/buyer';

const Wishlist = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const usersState = useSelector(state => state.users.users);

  const buyerState = useSelector(state => state.buyer);

  useEffect(() => {
    if (usersState.hasOwnProperty('access_token')) {
      dispatch(getWishlist());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={moderateScale(16)} />
        <TouchableOpacity
          style={styles.btnBack}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Text style={styles.header}>Wishlist</Text>
      </View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={buyerState?.wishlist}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyContent text="Belum Ada Wishlist Produk saat ini" />}
        renderItem={({item}) => {
          return buyerState.isLoadingWishlist ? (
            <View style={styles.loadingContainer}>
              <ProductItemSkeleton />
            </View>
          ) : (
            <ProductItem
              key={item.id}
              title={item?.Product?.name}
              image={item?.Product?.image_url}
              category={item?.Product?.Categories}
              price={item?.Product?.base_price}
              onPress={() => navigation.navigate('DetailProduk', {id: item.product_id})}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  head: {
    padding: moderateScale(20),
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnBack: {
    position: 'absolute',
    left: moderateScale(20),
    top: moderateScale(20),
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
