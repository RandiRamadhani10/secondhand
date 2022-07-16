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
import {Colors} from '../utils';
import {Gap, BaseButton, CardUser} from '../components';
import {Fonts} from '../utils';
import {ICArrowLeft} from '../assets';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {postProduct} from '../store/actions/seller';
import NumberFormat from 'react-number-format';

const screen = Dimensions.get('screen');

const PreviewJual = ({navigation, route}) => {
  const {data} = route.params;

  const dispatch = useDispatch();

  const profileUsersState = useSelector(state => state.users.profile);

  const isLoadingSeller = useSelector(state => state.seller.isLoading);

  const onSubmit = async () => {
    const formData = new FormData();

    formData.append('name', data?.name);
    formData.append('base_price', +data?.base_price);
    formData.append('category_ids', +data?.category_ids);
    formData.append('description', data?.description);
    formData.append('location', profileUsersState?.city);
    formData.append('image', {uri: data?.image?.uri, name: data?.image?.fileName, type: data?.image?.type});

    let response = await dispatch(postProduct(formData));

    if (response) {
      navigation.navigate('DaftarJual');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <ScrollView style={styles.scrollScreen}>
          <View style={styles.btnBackContainer}>
            <TouchableOpacity style={styles.btnBack} activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <ICArrowLeft />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri: data?.image?.uri,
              }}
            />
            <View style={styles.abs}>
              <View style={styles.absSet}>
                <View style={styles.title}>
                  <Text style={styles.txtTitle}>{data?.name}</Text>
                  <Text style={styles.txtCat}>
                    <Text style={styles.category}>{data?.category_name}</Text>
                  </Text>
                  <NumberFormat
                    value={data?.base_price}
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
              avatar={profileUsersState?.image_url}
              name={profileUsersState?.full_name}
              city={profileUsersState?.city}
              button={false}
            />
          </View>
          <View style={styles.title}>
            <Text style={styles.txtTitle}>Deskripsi</Text>
            <Text style={styles.des}>{data?.description}</Text>
          </View>
          <Gap height={60} />
        </ScrollView>

        <View style={styles.btnNego}>
          <BaseButton
            isLoading={isLoadingSeller}
            disable={isLoadingSeller}
            onPress={() => onSubmit()}
            title={'Terbitkan'}
          />
        </View>
      </SafeAreaView>
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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
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
  category: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.SECONDARY,
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
});

export default PreviewJual;
