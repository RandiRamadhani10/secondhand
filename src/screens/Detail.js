import React, {useRef, useMemo, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {BaseButton, BaseInput, Gap} from '../components';
import {IMGDummyProduct} from '../assets';
import FastImage from 'react-native-fast-image';

import {useForm, Controller} from 'react-hook-form';

const Detail = () => {
  // ref
  const bottomSheetRef = useRef(null);

  //   variables
  const snapPoints = useMemo(() => ['30%', '70%'], []);

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
  };

  return (
    <View style={styles.container}>
      <Text>Detail</Text>
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
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
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
