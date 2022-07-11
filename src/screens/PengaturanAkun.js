import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';

import {moderateScale} from 'react-native-size-matters';
import {useForm, Controller} from 'react-hook-form';
import {BaseButton, BaseInput, Gap} from '../components';
import {Colors} from '../utils/Colors';
import {ICArrowLeft} from '../assets';
import {authChangePassword} from '../store/actions/users';
import {Fonts} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const PengaturanAkun = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.users.isLoading);

  const schema = yup
    .object()
    .shape({
      current_password: yup.string().min(5).required('Silahkan isi password yang sekarang'),
      new_password: yup.string().min(5, 'Password minimal 5 karakter').required('Silahkan isi password yang baru'),
      confirm_password: yup
        .string()
        .min(5, 'Password minimal 5 karakter')
        .required('Silahkan isi konfirmasi password yang baru')
        .when('new_password', {
          is: val => (val && val.length > 0 ? true : false),
          then: yup.string().oneOf([yup.ref('new_password')], ' Password harus sesuai'),
        }),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit = async data => {
    dispatch(authChangePassword(data));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Main', {screen: 'Akun'})}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Gap height={40} />
        <Text style={styles.header}>Pengaturan Akun</Text>
        <Gap height={24} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <BaseInput
              label="Password Lama"
              type="password"
              placeholder="Masukkan Password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="current_password"
        />
        {errors?.current_password && <Text style={styles.errors}>{errors.current_password.message}</Text>}
        <Gap height={16} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <BaseInput
              label="Password Baru"
              type="password"
              placeholder="Masukkan Password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="new_password"
        />
        {errors.new_password && <Text style={styles.errors}>{errors.new_password.message}</Text>}
        <Gap height={16} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <BaseInput
              label="Konfirmasi Password Baru"
              type="password"
              placeholder="Masukkan Konfirmasi Password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="confirm_password"
        />
        {errors.confirm_password && <Text style={styles.errors}>{errors.confirm_password.message}</Text>}
        <Gap height={16} />
        <BaseButton disable={isLoading} isLoading={isLoading} title="Ubah Password" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

export default PengaturanAkun;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: moderateScale(20),
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(24),
    color: Colors.TEXT,
  },
  errors: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
    color: Colors.ERROR,
    paddingBottom: moderateScale(8),
  },
});
