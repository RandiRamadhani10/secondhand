import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Share, Linking} from 'react-native';
import {Gap, CardUser, BaseNotif, BaseButton, RadioButton} from '../components';
import {ICArrowLeft, ICWhatsApp} from '../assets';
import {Colors, Fonts, showError} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
import {getOrderById, patchOrderById} from '../store/actions/seller';

const InfoPenawar = ({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState({id: 0, status: false});

  const [renderBottomSheet, setRenderBottomSheet] = useState('');

  const detailProdukState = useSelector(state => state.seller.bidProductOrderDetail);

  const isLoadingDetailProduk = useSelector(state => state.seller.isLoading);

  const [statusOption, setStatusOption] = useState('');

  const [radioButtonContent] = useState([
    {
      text: 'Berhasil Terjual',
      subText: 'Kamu telah sepakat menjual produk ini kepada pembeli',
      onChecked: () => setStatusOption('accepted'),
    },
    {
      text: 'Batalkan Transaksi',
      subText: 'Kamu membatalkan transaksi produk ini dengan pembeli',
      onChecked: () => setStatusOption('declined'),
    },
  ]);

  useEffect(() => {
    dispatch(getOrderById({id}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setIsActive({id: detailProdukState?.Product?.id, status: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDecline = async (paramsId, paramsPayload) => {
    const response = await dispatch(patchOrderById({id: paramsId, payload: paramsPayload}));

    if (response) {
      dispatch(getOrderById({id}));
    }
  };

  const handleAccept = async paramsId => {
    const response = await dispatch(
      patchOrderById({id: paramsId, payload: {...detailProdukState, status: 'accepted'}}),
    );

    if (response) {
      setRenderBottomSheet('hubungi');
      handleOpenPress(1);
    }
  };

  const handleShare = () => {
    // Optional for Share
    const shareOptions = {
      title: `Penawaran Produk ${detailProdukState?.Product?.name}`,
      message: `Penawaran Produk ${detailProdukState?.Product?.name} yang telah kamu tawar berhasil diterima`,
      url: `https://api.whatsapp.com/send?phone=${detailProdukState?.User?.phone_number}&text=Penawaran%20Produk%20%${detailProdukState?.Product?.name}%20yang%20telah%20kamu%20tawar%20berhasil%20diterima`,
      subject: 'Penawaran Produk',
    };
    // Share.share(shareOptions);

    // Direct Share to Whatsapp
    let url = `https://api.whatsapp.com/send?phone=${detailProdukState?.User?.phone_number}&text=Penawaran%20Produk%20%${detailProdukState?.Product?.name}%20yang%20telah%20kamu%20tawar%20berhasil%20diterima`;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        showError({title: 'Share WhatsApp Gagal'});
      });
  };

  // ref
  const bottomSheetRef = useRef(null);

  //   variables
  const snapPoints = useMemo(() => ['1%', '80%', '60%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('sheet index', index);
  }, []);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenPress = snapPoint => {
    bottomSheetRef.current?.snapToIndex(snapPoint);
  };

  const handleSubmitStatus = async () => {
    if (statusOption === 'accepted') {
      const response = await dispatch(
        patchOrderById({id: detailProdukState?.id, payload: {...detailProdukState, status: 'accepted'}}),
      );

      if (response) {
        handleClosePress();
        dispatch(getOrderById({id}));
      }
    } else if (statusOption === 'declined') {
      const response = await dispatch(
        patchOrderById({id: detailProdukState?.id, payload: {...detailProdukState, status: 'declined'}}),
      );

      if (response) {
        handleClosePress();
        dispatch(getOrderById({id}));
      }
    }
  };

  const renderContentBottomSheetHubungi = (
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
            <Text style={styles.name}>{detailProdukState?.Product?.name ? detailProdukState?.Product?.name : '-'}</Text>
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

  const renderContentBottomSheetPerbaruiStatus = (
    <Fragment>
      <Text style={styles.titleBtmSheet}>Perbarui status penjualan produkmu</Text>
      <Gap height={moderateScale(24)} />
      <RadioButton choices={radioButtonContent} />
      <Gap height={moderateScale(24)} />
      <BaseButton
        disable={isLoadingDetailProduk}
        isLoading={isLoadingDetailProduk}
        title="Kirim"
        onPress={() => handleSubmitStatus()}
      />
    </Fragment>
  );
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
          type={'seller'}
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
        {isActive?.id === detailProdukState?.Product?.id &&
        detailProdukState?.status === 'pending' &&
        isActive.status === true ? (
          <View style={styles.buttons}>
            <View>
              <BaseButton
                title={'Tolak'}
                style={styles.decline}
                onPress={() => handleDecline(detailProdukState?.id, {...detailProdukState, status: 'declined'})}
              />
            </View>
            <View>
              <BaseButton title={'Terima'} style={styles.accept} onPress={() => handleAccept(detailProdukState?.id)} />
            </View>
          </View>
        ) : (isActive?.id === detailProdukState?.Product?.id && detailProdukState?.status === 'accepted') ||
          (detailProdukState?.status === 'declined' && isActive.status === true) ? (
          <View style={styles.buttons}>
            <View>
              <BaseButton
                title={'Status'}
                style={styles.decline}
                onPress={() => {
                  setRenderBottomSheet('perbaruiStatus');
                  handleOpenPress(2);
                }}
              />
            </View>
            <View>
              <BaseButton
                title={'Hubungi'}
                icon={<ICWhatsApp />}
                style={styles.accept}
                onPress={() => {
                  setRenderBottomSheet('hubungi');
                  handleOpenPress(1);
                }}
              />
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
          {renderBottomSheet === 'hubungi'
            ? renderContentBottomSheetHubungi
            : renderBottomSheet === 'perbaruiStatus'
            ? renderContentBottomSheetPerbaruiStatus
            : null}
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
