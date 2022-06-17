import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Gap, BaseInput, BaseButton} from '../components';
import SelectDropdown from 'react-native-select-dropdown';
import {
  ICArrowLeft,
  ICDummyAvatar,
  ICChevronDown,
  ICChevronUp,
} from '../assets';
import {Colors} from '../utils/Colors';
import {Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';

const TambahBarang = () => {
  const schema = yup
    .object()
    .shape({
      namaProduk: yup.string().required('Please input Nama Produk'),
      hargaProduk: yup.string().required('Please input Harga Produk'),
      kategori: yup.string().required('Pilih kategori'),
      deskripsi: yup.string().required('Please input Deskripsi Produk'),
    })
    .required();
  const {
    control,
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

  const kategori = [
    'Elektronik',
    'Fashion',
    'Hobi',
    'Kesehatan',
    'Rumah Tangga',
  ];

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
      borderColor: Colors.PLACEHOLDER,
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
  });

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={16} />
        <ICArrowLeft />
        <Text style={styles.header}>Lengkapi Detail Produk</Text>
        <Gap height={40} />
      </View>
      <ScrollView>
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
          {errors?.namaProduk && (
            <Text style={styles.errors}>{errors.namaProduk.message}</Text>
          )}
          <Gap height={4} />
          <Controller
            control={control}
            rules={{required: true}}
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
          {errors?.hargaProduk && (
            <Text style={styles.errors}>{errors.hargaProduk.message}</Text>
          )}
          <Gap height={16} />

          <Text style={styles.label}>Kategori</Text>
          <Gap height={4} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <SelectDropdown
                data={kategori}
                defaultButtonText={'Pilih Kategori'}
                buttonTextStyle={styles.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <Icon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      size={15}
                    />
                  );
                }}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  value = selectedItem;
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
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
          {errors?.kategori && (
            <Text style={styles.errors}>{errors.kategori.message}</Text>
          )}
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
          {errors?.deskripsi && (
            <Text style={styles.errors}>{errors.deskripsi.message}</Text>
          )}
          <Gap height={24} />
          <BaseButton title="Simpan" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TambahBarang;
