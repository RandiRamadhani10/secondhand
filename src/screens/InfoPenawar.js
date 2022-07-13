import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Share} from 'react-native';
import {Gap, CardUser, BaseNotif, BaseButton} from '../components';
import {ICArrowLeft, ICWhatsApp} from '../assets';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {getNotificationById} from '../store/actions/notification';
import NumberFormat from 'react-number-format';
import {getOrderById, getProductById, patchOrderById} from '../store/actions/seller';
const InfoPenawar = ({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState({id: 0, status: false});

  const detailProdukState = useSelector(state => state.seller.bidProductOrderDetail);
  const [status, setStatus] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      bid_price: '',
    },
  });

  useEffect(() => {
    dispatch(getOrderById({id}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setIsActive({id: detailProdukState?.Product?.id, status: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDecline = async (paramsId, paramsPayload) => {
    dispatch(patchOrderById({id: paramsId, payload: paramsPayload}));
  };

  const handleAccept = async paramsId => {
    const response = await dispatch(
      patchOrderById({id: paramsId, payload: {...detailProdukState, status: 'accepted'}}),
    );

    if (response) {
      handleOpenPress();
    }
  };

  const handleShare = () => {
    const shareOptions = {
      title: `Penawaran Produk ${detailProdukState?.Product?.name}`,
      message: `Penawaran Produk ${detailProdukState?.Product?.name} yang telah kamu tawar berhasil diterima`,
      url: `https://api.whatsapp.com/send?phone=${detailProdukState?.User?.phone_number}&text=Penawaran%20Produk%20%${detailProdukState?.Product?.name}%20yang%20telah%20kamu%20tawar%20berhasil%20diterima`,
      subject: 'Penawaran Produk',
    };

    Share.share(shareOptions);
  };

  // ref
  const bottomSheetRef = useRef(null);

  //   variables
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('sheet index', index);
  }, []);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const renderContentBottomSheet1 = () => {
    return (
      <Fragment>
        <Text style={styles.titleBtmSheet}>Yeay kamu berhasil mendapat harga yang sesuai</Text>
        <Gap height={moderateScale(16)} />
        <Text style={styles.descBtmSheet}>Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya</Text>
        <Gap height={moderateScale(16)} />

        <View style={styles.cardWrapper}>
          <Text style={styles.cardWrapperTitle}>Product Match</Text>
          <Gap height={moderateScale(16)} />

          <CardUser
            avatar={detailProdukState?.User?.image_url}
            name={detailProdukState?.User?.full_name}
            city={detailProdukState?.User?.city}
            button={false}
            isHaveBorder={false}
          />
          <Gap height={moderateScale(16)} />

          {/* Card For Product */}
          <View style={styles.mainCard}>
            <View style={styles.icon}>
              <FastImage
                source={{uri: detailProdukState?.Product?.image_url}}
                style={styles.imageBtmSheet}
                resizeMode="cover"
              />
            </View>
            <View style={styles.contentText}>
              <Text style={styles.name}>
                {detailProdukState?.Product?.name ? detailProdukState?.Product?.name : '-'}
              </Text>
              <NumberFormat
                value={detailProdukState?.Product?.base_price ? detailProdukState?.Product?.base_price : 0}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'Rp. '}
                renderText={formattedValue => <Text style={styles.basePrice}>{formattedValue}</Text>}
              />
              <NumberFormat
                value={detailProdukState?.bid_price ? detailProdukState?.bid_price : 0}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'Rp. '}
                renderText={formattedValue => (
                  <Text style={styles.bidPrice}>
                    {(detailProdukState?.status === 'bid' || detailProdukState?.status === 'declined') && 'Ditawar'}{' '}
                    {formattedValue}
                  </Text>
                )}
              />
            </View>
          </View>
        </View>

        <Gap height={moderateScale(24)} />
        <BaseButton
          title="Hubungi Via Whatsapp"
          icon={<ICWhatsApp />}
          onPress={() => {
            handleShare();
            handleClosePress();
          }}
        />
      </Fragment>
    );
  };

  const renderContentBottomSheet2 = () => {
    return (
      <Fragment>
        <Text style={styles.titleBtmSheet}>Perbarui status penjualan produkmu</Text>
        <Gap height={moderateScale(24)} />
        <View style={styles.choiceContainer}>
          <Text style={styles.choiceTitle}>Berhasil Terjual</Text>
          <Text style={styles.choiceDesc}>Kamu telah sepakat menjual produk ini kepada pembeli</Text>
        </View>
        <Gap height={moderateScale(24)} />
        <View style={styles.choiceContainer}>
          <Text style={styles.choiceTitle}>Batalkan Transaksi</Text>
          <Text style={styles.choiceDesc}>Kamu membatalkan transaksi produk ini dengan pembeli</Text>
        </View>
        <Gap height={moderateScale(24)} />
        <BaseButton title="Kirim" onPress={() => handleClosePress()} />
      </Fragment>
    );
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={16} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Main', {screen: 'DaftarJual'});
          }}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Text style={styles.header}>Info Penawar</Text>

        <Gap height={40} />
      </View>
      <Gap height={24} />
      <CardUser
        avatar={detailProdukState?.User?.image_url}
        name={detailProdukState?.User?.full_name}
        city={detailProdukState?.User?.city}
        button={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={24} />
        <Text style={styles.title}>Daftar Produkmu yang Ditawar</Text>
        <Gap height={16} />
        <BaseNotif
          image={detailProdukState?.Product?.image_url}
          status={detailProdukState?.status}
          title={detailProdukState?.Product?.name ? detailProdukState?.Product?.name : '-'}
          price={detailProdukState?.Product?.base_price ? detailProdukState?.Product?.base_price : '-'}
          bid={detailProdukState?.bid_price}
          tanggal={detailProdukState?.transaction_date}
          isRead={true}
          onPress={() => setIsActive(prevState => ({id: detailProdukState?.Product?.id, status: !prevState.status}))}
        />
        <Gap height={16} />
        {isActive?.id === detailProdukState?.Product?.id && isActive.status === true ? (
          <View style={styles.buttons}>
            <View>
              <BaseButton
                title={
                  detailProdukState?.status == 'declined' || detailProdukState?.status == 'avalaible'
                    ? 'Tolak'
                    : 'Status'
                }
                // handleDecline(detailProdukState?.id, {...detailProdukState, status: 'declined'}
                style={styles.decline}
                onPress={() =>
                  detailProdukState?.status == 'declined' || detailProdukState?.status == 'avalaible'
                    ? handleDecline(detailProdukState?.id, {...detailProdukState, status: 'declined'})
                    : handleOpenPress()
                }
              />
            </View>
            <View>
              {console.log(detailProdukState?.status)}
              {detailProdukState?.status == 'declined' || detailProdukState?.status == 'avalaible' ? (
                <BaseButton
                  title={'Terima'}
                  style={styles.accept}
                  onPress={() => {
                    handleDecline(detailProdukState?.id, {...detailProdukState, status: 'accepted'});
                    handleOpenPress();
                  }}
                />
              ) : (
                <BaseButton
                  icon={<ICWhatsApp />}
                  title={'Hubungi'}
                  style={styles.accept}
                  onPress={() => handleShare()}
                />
              )}
            </View>
          </View>
        ) : null}
        <Gap height={16} />
        <View style={styles.divider} />
      </ScrollView>

      <BottomSheet
        enablePanDownToClose
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        animateOnMount={true}
        enableOverDrag={true}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={props => (
          <BottomSheetBackdrop {...props} pressBehavior={'close'} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          {detailProdukState?.status == 'available' || detailProdukState?.status == 'declined'
            ? renderContentBottomSheet1()
            : renderContentBottomSheet2()}
        </View>
      </BottomSheet>
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
    borderWidth: moderateScale(1.5),
  },
  decline: {
    width: moderateScale(156),
    paddingVertical: moderateScale(7),
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
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

  mainCard: {
    height: moderateScale(80),
    width: '100%',
    alignItems: 'center',
    borderRadius: moderateScale(16),
    backgroundColor: 'transparent',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 4,
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
  cardWrapper: {
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    backgroundColor: 'transparent',
    shadowColor: Colors.SECONDARY,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
  },
  cardWrapperTitle: {
    fontFamily: Fonts.PRIMARY.MEDIUM,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
    textAlign: 'center',
  },
  basePrice: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  bidPrice: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  choiceTitle: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  choiceDesc: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.SECONDARY,
  },
});

export default InfoPenawar;
