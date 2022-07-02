import React, {Fragment, useCallback, useMemo, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Gap, CardUser, BaseNotif, BaseButton} from '../components';
import {ICArrowLeft, ICWhatsApp} from '../assets';
import {Colors} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {Fonts} from '../utils';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const InfoPenawar = ({navigation, route}) => {
  const {id} = route.params;
  const [isActive, setIsActive] = useState({id: 0, status: false});

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      bid_price: '',
    },
  });

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

  const renderContentBottomSheet1 = (
    <Fragment>
      <Text style={styles.titleBtmSheet}>Yeay kamu berhasil mendapat harga yang sesuai</Text>
      <Gap height={moderateScale(16)} />
      <Text style={styles.descBtmSheet}>Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya</Text>
      <Gap height={moderateScale(16)} />

      <View style={styles.cardWrapper}>
        <Text style={styles.cardWrapperTitle}>Product Match</Text>
        <Gap height={moderateScale(16)} />

        <CardUser name={'Nama Pembeli'} city={'Malang'} button={false} isHaveBorder={false} />
        <Gap height={moderateScale(16)} />
        {/* Card For Dummy Product */}
        <View style={styles.mainCard}>
          <View style={styles.icon}>
            <FastImage
              // source={stateBuyer?.productDetail?.image_url}
              style={styles.imageBtmSheet}
              resizeMode="cover"
            />
          </View>
          <View style={styles.contentText}>
            <Text style={styles.name}>Jam Tangan Casio</Text>
            <Text style={styles.basePrice}>Rp.250.000</Text>
            <Text style={styles.discPrice}>Rp 200.000</Text>
          </View>
        </View>
      </View>

      <Gap height={moderateScale(24)} />
      <BaseButton title="Hubungi Via Whatsapp" icon={<ICWhatsApp />} onPress={() => handleClosePress()} />
    </Fragment>
  );

  const renderContentBottomSheet2 = (
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
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={16} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Main', {screen: 'Notifikasi'});
          }}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Text style={styles.header}>Info Penawar</Text>
        <Gap height={40} />
      </View>
      <Gap height={24} />
      <CardUser name={'Nama Pembeli'} city={'kota'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={24} />
        <Text style={styles.title}>Daftar Produkmu yang Ditawar</Text>
        <Gap height={16} />
        <BaseNotif
          image={'https://via.placeholder.com/48?text=Dummy'}
          status={'Penawaran Produk'}
          title={'Jam Tangan Casio'}
          price={'Rp. 250.000'}
          bid={'Ditawar Rp. 200.000'}
          tanggal={'20 Apr, 14.04'}
          onPress={() => setIsActive(prevState => ({id: 0, status: !prevState.status}))}
        />
        <Gap height={16} />
        {isActive?.id === 0 && isActive.status === true ? (
          <View style={styles.buttons}>
            <View>
              <BaseButton title={'Tolak'} style={styles.decline} />
            </View>
            <View>
              <BaseButton title={'Terima'} style={styles.accept} onPress={() => handleOpenPress()} />
            </View>
          </View>
        ) : null}
        <Gap height={16} />
        <View style={styles.divider} />
        <Gap height={16} />
        <BaseNotif
          image={'https://via.placeholder.com/48?text=Dummy'}
          status={'Penawaran Produk'}
          title={'Smartwatch Samsung Galaxy Pro 5'}
          price={'Rp 3.550.000'}
          bid={'Ditawar Rp 2.000.000'}
          tanggal={'1 Apr, 09:08'}
          onPress={() => setIsActive(prevState => ({id: 1, status: !prevState.status}))}
        />
        <Gap height={16} />
        {isActive?.id === 1 && isActive.status === true ? (
          <View style={styles.buttons}>
            <View>
              <BaseButton title={'Tolak'} style={styles.decline} />
            </View>
            <View>
              <BaseButton title={'Terima'} style={styles.accept} onPress={() => handleOpenPress()} />
            </View>
          </View>
        ) : null}
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
        <View style={styles.contentContainer}>{renderContentBottomSheet1}</View>
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
  discPrice: {
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
