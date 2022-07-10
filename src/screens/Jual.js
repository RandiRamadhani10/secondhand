import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Gap, BaseInput, BaseButton, BaseUploadPhoto} from '../components';
import SelectDropdown from 'react-native-select-dropdown';
import {ICArrowLeft, ICChevronDown, ICChevronUp, ICClosePrimary} from '../assets';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {useForm, Controller} from 'react-hook-form';
import {useIsFocused} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {launchImageLibrary} from 'react-native-image-picker';

import {useSelector, useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {postProduct} from '../store/actions/seller';

const options = {
  selectionLimit: 1,
  mediaType: 'mixed',
  includeExtra: true,
};

const Jual = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const usersState = useSelector(state => state.users);

  const [images, setImages] = useState([]);

  const categoryState = useSelector(state => state.buyer.category);

  const [categoryList, setCategoryList] = useState([]);

  const handleCamera = async () => {
    const result = await launchImageLibrary(options);
    if (result?.assets) {
      setImages(result?.assets);
    }
  };

  const schema = yup
    .object()
    .shape({
      name: yup.string().required('Silahkan Isi Nama Produk'),
      base_price: yup.number().required('Silahkan Isi Harga Produk'),
      category_ids: yup.string().required('Silahkan Pilih Kategori'),
      description: yup.string().required('Silahkan Isi Deskripsi Produk'),
    })
    .required();

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      base_price: 0,
      category_ids: '',
      description: '',
    },
  });

  useEffect(() => {
    for (const key in usersState?.profile) {
      if (usersState?.profile[key] === '-' || usersState?.profile[key] === '' || usersState?.profile[key] === 0) {
        navigation.navigate('Profile');
      }
    }
  }, [isFocused, navigation, usersState?.profile]);

  useEffect(() => {
    if (categoryState?.length > 0) {
      const filteredItem = [];
      categoryState.map(item => filteredItem.push(item));

      return setCategoryList(filteredItem);
    }
  }, [categoryState]);

  const onSubmit = async data => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('base_price', +data.base_price);
    formData.append('category_ids', +data.category_ids);
    formData.append('description', data.description);
    formData.append('location', 'Jakarta');
    formData.append('image', {uri: images[0].uri, name: images[0].fileName, type: images[0].type});

    dispatch(postProduct(formData));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={16} />
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Main', {screen: 'Home'})}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Text style={styles.header}>Lengkapi Detail Produk</Text>
        <Gap height={40} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Gap height={43} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <BaseInput
                label="Nama Produk"
                type="text"
                placeholder="Nama Produk"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="name"
          />
          {errors?.name && <Text style={styles.errors}>{errors.name.message}</Text>}
          <Gap height={4} />
          <Controller
            control={control}
            rules={{required: true, validate: val => Number(val)}}
            render={({field: {onChange, onBlur, value}}) => (
              <BaseInput
                label="Harga Produk"
                type="number"
                placeholder="Rp 0,00"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="base_price"
          />
          {errors?.base_price && <Text style={styles.errors}>{errors.base_price.message}</Text>}
          <Gap height={16} />
          <Text style={styles.label}>Kategori</Text>
          <Gap height={4} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onBlur, value}}) => (
              <SelectDropdown
                data={categoryList}
                defaultButtonText={'Pilih Kategori'}
                buttonTextStyle={styles.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return isOpened ? <ICChevronUp /> : <ICChevronDown />;
                }}
                onSelect={selectedItem => {
                  setValue('category_ids', selectedItem.id);
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem.name;
                }}
                rowTextForSelection={item => {
                  return item.name;
                }}
                dropdownIconPosition={'right'}
                buttonStyle={styles.dropdownBtnStyle}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="category_ids"
          />
          <Gap height={16} />
          {errors?.category_ids && <Text style={styles.errors}>{errors.category_ids.message}</Text>}
          <Gap height={16} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <BaseInput
                label="Deskripsi"
                type="text"
                placeholder="Contoh: Jalan ikan pari"
                multiline={true}
                numberOfLines={5}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="description"
          />
          {errors?.description && <Text style={styles.errors}>{errors.description.message}</Text>}
          <Gap height={16} />
          <ScrollView
            contentContainerStyle={styles.uploadPhotoContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <BaseUploadPhoto label="Foto Produk" onPress={handleCamera} />
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <Fragment key={index}>
                    <Gap width={16} />
                    <View style={styles.uploadItemContainer}>
                      <TouchableOpacity
                        style={styles.removePhotoItem}
                        activeOpacity={0.7}
                        onPress={() => {
                          setImages(prevImage => prevImage.filter((_, idx) => idx !== index));
                        }}>
                        <ICClosePrimary />
                      </TouchableOpacity>
                      <FastImage source={{uri: image.uri}} style={styles.uploadPhotoItem} />
                    </View>
                  </Fragment>
                );
              })}
          </ScrollView>
          <Gap height={24} />
          <View style={styles.btnContainer}>
            <BaseButton style={styles.btnPreview} title="Preview" onPress={handleSubmit(onSubmit)} />
            <BaseButton style={styles.btnTerbitkan} title="Terbitkan" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
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
    paddingLeft: moderateScale(80),
  },
  head: {
    flexDirection: 'row',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownBtnStyle: {
    width: '100%',
    height: moderateScale(55),
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.SECONDARY,
  },
  buttonTextStyle: {
    textAlign: 'left',
    fontSize: moderateScale(14),
    fontFamily: Fonts.PRIMARY.REGULAR,
  },
  errors: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
    color: Colors.ERROR,
    paddingBottom: moderateScale(8),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnPreview: {
    width: '48%',
    borderRadius: moderateScale(16),
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    color: Colors.TEXT,
  },
  btnTerbitkan: {width: '48%', borderRadius: moderateScale(16)},
  uploadPhotoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  uploadItemContainer: {
    position: 'relative',
  },
  uploadPhotoItem: {
    zIndex: 10,
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removePhotoItem: {
    backgroundColor: Colors.WHITE,
    padding: 5,
    borderRadius: 100,
    zIndex: 11,
    alignSelf: 'flex-end',
    marginTop: 0,
    position: 'absolute',
  },
});

export default Jual;
