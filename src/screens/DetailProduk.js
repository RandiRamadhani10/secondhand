import React, {useRef, useMemo, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Colors, showSuccess} from '../utils';
import {Gap, BaseButton, CardUser, BaseInput, EmptyContent} from '../components';
import {Fonts} from '../utils';
import {ICArrowLeft, ICLoveWhite, ICLoveFillActive} from '../assets';
import {Controller, useForm} from 'react-hook-form';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {bidProduct, deleteWishlistById, postWishlist} from '../store/actions/buyer';
import NumberFormat from 'react-number-format';
import {deleteProductById} from '../store/actions/seller';

const screen = Dimensions.get('screen');

const DetailProduk = ({navigation, route}) => {
  const {id} = route.params;

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const stateUsers = useSelector(state => state.users.users);

  const profileUsersState = useSelector(state => state.users.profile);

  const stateBuyer = useSelector(state => state.buyer);

  const isLoadingSubmit = useSelector(state => state.seller.isLoading);

  const [isAlreadyBid, setIsAlreadyBid] = useState(false);

  const [isOnWishlist, setIsOnWishlist] = useState(false);

  const checkStatusBid = useCallback(() => {
    const bids = [];

    stateBuyer?.bidProducts?.length > 0 &&
      stateBuyer?.bidProducts.map(item => {
        if (item?.product_id === id && item?.status === 'pending') {
          bids.push(item);
        }
      });

    return bids?.length ? setIsAlreadyBid(true) : setIsAlreadyBid(false);
  }, [stateBuyer?.bidProducts, id]);

  useEffect(() => {
    checkStatusBid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    if (stateBuyer.wishlist.length > 0) {
      const findId = stateBuyer.wishlist.filter(item => item.product_id === id);
      if (Array.isArray(findId) && findId?.length) {
        setIsOnWishlist(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  // ref
  const bottomSheetRef = useRef(null);

  //   variables
  const snapPoints = useMemo(() => ['1%', '70%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('sheet index', index);
  }, []);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      bid_price: '',
    },
  });

  const handleWishlist = async prodId => {
    try {
      const response = await dispatch(postWishlist({product_id: prodId}));

      if (response?.payload.hasOwnProperty('name')) {
        setIsOnWishlist(true);
      }
    } catch (err) {
      setIsOnWishlist(false);
    }
  };

  const handleDeleteWishList = async prodId => {
    const findId = stateBuyer.wishlist.filter(item => item.product_id === prodId);

    if (Array.isArray(findId) && findId.length) {
      const response = await dispatch(deleteWishlistById(findId[0]?.id));

      if (response?.payload.hasOwnProperty('name')) {
        setIsOnWishlist(false);
      }
    }
  };

  const onSubmit = async data => {
    try {
      const response = await dispatch(bidProduct({product_id: id, bid_price: Number(data?.bid_price)}));

      if (response?.payload.hasOwnProperty('status')) {
        setIsAlreadyBid(true);
      }
      handleClosePress();
    } catch (err) {
      setIsAlreadyBid(false);
    }
  };

  const onDelete = async productId => {
    const response = await dispatch(deleteProductById(productId));

    if (response?.payload) {
      showSuccess({title: 'Berhasil Menghapus Produk'});
      navigation.navigate('Main', {screen: 'DaftarJual'});
    }
  };

  return (
    <>
      {stateBuyer?.isLoading ? (
        <View style={styles.screen}>
          <ActivityIndicator style={styles.loading} size={'large'} color={Colors.PRIMARY} />
        </View>
      ) : id && stateBuyer.productDetail === null ? (
        <SafeAreaView style={styles.emptyScreen}>
          <Text style={styles.header}>Oops. Terjadi Kesalahan</Text>
          <Text style={styles.emptyText}>Produk yang anda cari sudah dihapus penjual</Text>
          <Gap height={20} />
          <BaseButton
            title="Kembali ke Home"
            style={styles.btnBackToHome}
            onPress={() => navigation.navigate('Main', {screen: 'Home'})}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.screen}>
          <ScrollView style={styles.scrollScreen}>
            <View style={styles.btnBackContainer}>
              <TouchableOpacity style={styles.btnBack} activeOpacity={0.7} onPress={() => navigation.goBack()}>
                <ICArrowLeft />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnWishlist}
                activeOpacity={0.7}
                onPress={() => {
                  if (isOnWishlist) {
                    handleDeleteWishList(stateBuyer?.productDetail?.id);
                  } else if (!isOnWishlist) {
                    handleWishlist(stateBuyer?.productDetail?.id);
                  }
                }}>
                {isOnWishlist ? <ICLoveFillActive /> : <ICLoveWhite />}
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <FastImage
                style={styles.image}
                source={{
                  uri: stateBuyer?.productDetail?.image_url,
                }}
              />
              <View style={styles.abs}>
                <View style={styles.absSet}>
                  <View style={styles.title}>
                    <Text style={styles.txtTitle}>{stateBuyer?.productDetail?.name}</Text>
                    <Text style={styles.txtCat}>
                      {stateBuyer?.productDetail?.Categories?.length > 0 &&
                        stateBuyer?.productDetail?.Categories.map((item, index) => (
                          <Text key={item.id} style={styles.category}>
                            {index > 0 ? ',' : ''}
                            {item.name}
                          </Text>
                        ))}
                    </Text>
                    <NumberFormat
                      value={stateBuyer?.productDetail?.base_price}
                      displayType={'text'}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      prefix={'Rp. '}
                      renderText={formattedValue => <Text style={styles.txtTitle}>{formattedValue}</Text>}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <CardUser
                avatar={stateBuyer?.productDetail?.User?.image_url}
                name={stateBuyer?.productDetail?.User?.full_name}
                city={stateBuyer?.productDetail?.User?.city}
                button={false}
              />
            </View>
            <View style={styles.title}>
              <Text style={styles.txtTitle}>Deskripsi</Text>
              <Text style={styles.des}>{stateBuyer?.productDetail?.description}</Text>
            </View>
            <Gap height={60} />
          </ScrollView>

          {profileUsersState?.id !== stateBuyer.productDetail?.User?.id ? (
            <View style={styles.btnNego}>
              {stateBuyer.productDetail?.status !== 'sold' ? (
                <BaseButton
                  disable={isAlreadyBid}
                  isLoading={stateBuyer?.isLoadingBid}
                  onPress={() => {
                    if (!stateUsers.hasOwnProperty('access_token')) {
                      return navigation.navigate('Login');
                    }

                    handleOpenPress();
                  }}
                  title={isAlreadyBid ? 'Menunggu respon penjual' : 'Saya Tertarik dan ingin Nego'}
                />
              ) : null}
            </View>
          ) : null}

          {profileUsersState?.id === stateBuyer.productDetail?.User?.id ? (
            <View style={styles.btnActionContainer}>
              {/* Edit Product */}
              {/* <BaseButton
                style={styles.editAction}
                disable={isLoadingSubmit}
                isLoading={isLoadingSubmit}
                onPress={() => navigation.navigate('Main', {screen: 'Jual', params: {id: id}})}
                title={'Edit Produk'}
              /> */}
              {/* <Gap height={moderateScale(10)} /> */}

              <BaseButton
                style={styles.deleteAction}
                disable={isLoadingSubmit}
                isLoading={isLoadingSubmit}
                onPress={() => onDelete(id)}
                title={'Hapus Produk'}
              />
            </View>
          ) : null}

          <BottomSheet
            enablePanDownToClose
            enableContentPanningGesture={true}
            enableHandlePanningGesture={true}
            animateOnMount={true}
            enableOverDrag={true}
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            backdropComponent={props => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />}
            onChange={handleSheetChanges}>
            <View style={styles.contentContainer}>
              <Text style={styles.titleBtmSheet}>Masukkan Harga Tawarmu</Text>
              <Gap height={moderateScale(16)} />
              <Text style={styles.descBtmSheet}>
                Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.
              </Text>
              <Gap height={moderateScale(16)} />

              {/* Card For Product */}
              <View style={styles.mainCard}>
                <View style={styles.icon}>
                  <FastImage
                    source={{uri: stateBuyer?.productDetail?.image_url}}
                    style={styles.imageBtmSheet}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.contentText}>
                  <Text style={styles.name}>{stateBuyer?.productDetail?.name}</Text>
                  <NumberFormat
                    value={stateBuyer?.productDetail?.base_price}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'Rp. '}
                    renderText={formattedValue => <Text>{formattedValue}</Text>}
                  />
                </View>
              </View>

              <Gap height={moderateScale(16)} />
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <BaseInput
                    label="Harga Tawar"
                    type="text"
                    placeholder="Rp. 0,00"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="bid_price"
                rules={{required: {value: true, message: 'Silahkan Isi Penawaran'}}}
              />
              {errors?.bid_price && <Text style={styles.errors}>{errors.bid_price.message}</Text>}

              <Gap height={moderateScale(24)} />
              <BaseButton
                disable={stateBuyer?.isLoadingBid}
                isLoading={stateBuyer?.isLoadingBid}
                title="Kirim"
                onPress={handleSubmit(async data => await onSubmit(data))}
              />
            </View>
          </BottomSheet>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    height: screen.height * 0.5,
    width: screen.width,
  },
  btnBackContainer: {
    position: 'relative',
  },
  btnBack: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 99,
    padding: 10,
    borderRadius: 50,
    left: 16,
    top: 44,
  },
  btnWishlist: {
    position: 'absolute',
    backgroundColor: Colors.PRIMARY,
    zIndex: 99,
    padding: 10,
    borderRadius: 50,
    right: 16,
    top: 44,
  },
  abs: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  absSet: {
    width: '100%',
  },
  image: {
    height: '80%',
    width: '100%',
  },
  title: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND,
    marginHorizontal: 16,
    marginBottom: 30,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
  },
  category: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.SECONDARY,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
  txtTitle: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  txtCat: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
  },
  des: {
    color: Colors.SECONDARY,
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
  },
  scrollScreen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  btnNego: {
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 1,
  },

  btnActionContainer: {
    padding: 16,
    position: 'absolute',
    width: '100%',
    bottom: 1,
    justifyContent: 'space-between',
  },
  btnAction: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  editAction: {
    width: '100%',
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(16),
    alignItems: 'center',
  },
  deleteAction: {
    width: '100%',
    paddingVertical: moderateScale(14),
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
    alignItems: 'center',
  },

  container: {
    flex: 1,
    padding: moderateScale(24),
    backgroundColor: Colors.SECONDARY,
  },
  contentContainer: {
    flex: 1,
    padding: moderateScale(32),
  },
  titleBtmSheet: {
    fontFamily: Fonts.PRIMARY.MEDIUM,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  descBtmSheet: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.SECONDARY,
  },

  //   Styles for Card Product
  mainCard: {
    height: moderateScale(80),
    width: '100%',
    alignItems: 'center',
    borderRadius: moderateScale(16),
    backgroundColor: 'transparent',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: moderateScale(18),
  },
  name: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  contentText: {
    marginLeft: moderateScale(16),
  },
  imageBtmSheet: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.PRIMARY,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errors: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
    color: Colors.ERROR,
    paddingBottom: moderateScale(8),
  },
  emptyScreen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(12),
    color: Colors.TEXT,
    textAlign: 'center',
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(20),
    color: Colors.TEXT,
  },
  btnBackToHome: {
    width: '50%',
    borderRadius: moderateScale(16),
  },
});

export default DetailProduk;
