import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Gap, BaseInput, BaseButton, BaseUploadPhoto} from '../components';
import SelectDropdown from 'react-native-select-dropdown';
import {ICArrowLeft, ICChevronDown, ICChevronUp} from '../assets';
import {Colors, Fonts, showError} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {useForm, Controller} from 'react-hook-form';
import {useIsFocused} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {useSelector} from 'react-redux';

const Jual = ({navigation}) => {
  const isFocused = useIsFocused();
  const usersState = useSelector(state => state.users.users);

  useEffect(() => {
    if (!usersState.hasOwnProperty('access_token')) {
      showError({title: 'Akses Menu Tidak Diperkenankan', description: 'Silahkan Daftar & Login terlebih dahulu'});
      navigation.navigate('Login');
    }
  }, [isFocused, navigation, usersState]);

  const schema = yup
    .object()
    .shape({
      namaProduk: yup.string().required('Silahkan Isi Nama Produk'),
      hargaProduk: yup.string().required('Silahkan Isi Harga Produk'),
      kategori: yup.string().required('Silahkan Pilih Kategori'),
      deskripsi: yup.string().required('Silahkan Isi Deskripsi Produk'),
    })
    .required();

  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      namaProduk: '',
      hargaProduk: '',
      kategori: '',
      deskripsi: '',
    },
  });

  const onSubmit = data => {
    console.log(data);
  };

  const kategori = ['Elektronik', 'Fashion', 'Hobi', 'Kesehatan', 'Rumah Tangga'];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={16} />
        <ICArrowLeft />
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
            name="namaProduk"
          />
          {errors?.namaProduk && <Text style={styles.errors}>{errors.namaProduk.message}</Text>}
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
            name="hargaProduk"
          />
          {errors?.hargaProduk && <Text style={styles.errors}>{errors.hargaProduk.message}</Text>}
          <Gap height={16} />
          <Text style={styles.label}>Kategori</Text>
          <Gap height={4} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onBlur, value}}) => (
              <SelectDropdown
                data={kategori}
                defaultButtonText={'Pilih Kategori'}
                buttonTextStyle={styles.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return isOpened ? <ICChevronUp /> : <ICChevronDown />;
                }}
                onSelect={selectedItem => {
                  setValue('kategori', selectedItem);
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem;
                }}
                rowTextForSelection={item => {
                  return item;
                }}
                dropdownIconPosition={'right'}
                buttonStyle={styles.dropdownBtnStyle}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="kategori"
          />
          <Gap height={16} />
          {errors?.kategori && <Text style={styles.errors}>{errors.kategori.message}</Text>}
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
            name="deskripsi"
          />
          {errors?.deskripsi && <Text style={styles.errors}>{errors.deskripsi.message}</Text>}
          <Gap height={16} />
          <BaseUploadPhoto label="Foto Produk" />
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
    fontFamily: Fonts.PRIMARY.REGULAR,
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
});

export default Jual;
