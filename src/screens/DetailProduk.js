import React, {useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../utils';
import {Gap, BaseButton, CardUser, BaseInput} from '../components';
import {Fonts} from '../utils';
import {ICArrowLeft, IMGDummyProduct} from '../assets';
import {Controller, useForm} from 'react-hook-form';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
const screen = Dimensions.get('screen');
const DetailProduk = ({navigation}) => {
  // ref
  const bottomSheetRef = useRef(null);

  //   variables
  const snapPoints = useMemo(() => ['5%', '50'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = () => bottomSheetRef.current.close();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      harga_tawar: '',
    },
  });

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  const onSubmit = data => {
    console.log(data);
    handleClosePress();
  };

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <ScrollView>
          <View style={styles.btnBackContainer}>
            <TouchableOpacity
              style={styles.btnBack}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Main', {screen: 'Home'})}>
              <ICArrowLeft />
            </TouchableOpacity>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRdbhQQ3WnSAlLTQ16icqtcUo7H2mDGk9SqyC0vN9OXG3LFeyZyUF1aw_WKFuGY4pE0FujTymiXMMkTclEL6LKl4zd_iqdnjQPv6bM27Y8&usqp=CAE',
                }}
              />
              <View style={styles.abs}>
                <View style={styles.absSet}>
                  <View style={styles.title}>
                    <Text style={styles.txtTitle}>Jam Tangan Hitam</Text>
                    <Text style={styles.txtCat}>Aksesoris</Text>
                    <Text style={styles.txtTitle}>Rp. 250.000</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <CardUser
                name={'Randi Pandugo'}
                city={'Jombang'}
                button={false}
              />
            </View>
            <View style={styles.title}>
              <Text style={styles.txtTitle}>Deskripsi</Text>
              <Text style={styles.des}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
            <Gap height={60} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.btnNego}>
        <BaseButton onPress={() => {}} title="Saya Tertarik dan ingin Nego" />
      </View>

      <BottomSheet
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        animateOnMount={true}
        enableOverDrag={true}
        ref={bottomSheetRef}
        index={1}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleBtmSheet}>Masukkan Harga Tawarmu</Text>
          <Gap height={moderateScale(16)} />
          <Text style={styles.descBtmSheet}>
            Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan
            segera dihubungi penjual.
          </Text>
          <Gap height={moderateScale(16)} />

          {/* Card For Dummy Product */}
          <View style={styles.mainCard}>
            <View style={styles.icon}>
              <FastImage
                source={IMGDummyProduct}
                style={styles.imageBtmSheet}
                resizeMode="cover"
              />
            </View>
            <View style={styles.contentText}>
              <Text style={styles.name}>Jam Tangan Casio</Text>
              <Text>Rp 250.000</Text>
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
            name="harga_tawar"
          />
          {errors?.harga_tawar && (
            <Text style={styles.errors}>{errors.harga_tawar.message}</Text>
          )}

          <Gap height={moderateScale(24)} />
          <BaseButton
            title="Kirim"
            onPress={handleSubmit(data => onSubmit(data))}
          />
        </View>
      </BottomSheet>
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
    padding: 5,
    borderRadius: 50,
    left: 16,
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
    backgroundColor: Colors.WHITE,
    marginHorizontal: 16,
    marginBottom: 30,
    elevation: 5,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
  txtTitle: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: 'black',
  },
  txtCat: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
  },
  des: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
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

  container: {
    flex: 1,
    padding: moderateScale(24),
    backgroundColor: Colors.SECONDARY,
  },
  contentContainer: {
    flex: 1,
    padding: 32,
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
});

export default DetailProduk;
