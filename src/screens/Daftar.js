import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../utils';

import {moderateScale} from 'react-native-size-matters';
import {ICArrowLeft} from '../assets';
import {BaseButton, BaseInput, Gap} from '../components';
import {Controller, useForm} from 'react-hook-form';

import {yupResolver} from '@hookform/resolvers/yup';

import * as yup from 'yup';

import {useDispatch, useSelector} from 'react-redux';
import {authRegister} from '../store/actions/users';

const Daftar = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.users.isLoading);
  const schema = yup
    .object()
    .shape({
      full_name: yup.string().min(5, 'Silahkan isi nama minimal 5 karakter').required('Silahkan isi nama lengkap'),
      email: yup.string().email('Silahkan isi alamat email yang valid').required('Silahkan isi alamat email'),
      password: yup.string().min(5, 'Silahkan isi password minimal 5 karakter').required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    let payload = {
      ...data,
      phone_number: 0,
      address: '-',
      image: 'test.png',
      city: '-',
    };

    dispatch(authRegister(payload));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={Colors.WHITE} />
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Main', {screen: 'Home'})}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Gap height={40} />
        <Text style={styles.header}>Daftar</Text>
        <Gap height={24} />
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <BaseInput
              label="Nama"
              type="text"
              placeholder="Nama Lengkap"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="full_name"
        />
        {errors?.full_name && <Text style={styles.errors}>{errors.full_name.message}</Text>}
        <Gap height={16} />
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <BaseInput
              label="Email"
              type="text"
              placeholder="Contoh: johndee@gmail.com"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="email"
        />
        {errors?.email && <Text style={styles.errors}>{errors.email.message}</Text>}
        <Gap height={16} />
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <BaseInput
              label="Buat Password"
              type="password"
              placeholder="Buat Password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="password"
        />
        {errors?.password && <Text style={styles.errors}>{errors.password.message}</Text>}
        <Gap height={16} />
        <BaseButton disable={isLoading} isLoading={isLoading} title="Daftar" onPress={handleSubmit(onSubmit)} />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.loginWrapper}>
          <Text style={styles.loginSub}>Sudah punya Akun? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.loginCTA}>Masuk disini</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Daftar;

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
  loginContainer: {
    flex: moderateScale(1),
    justifyContent: 'flex-end',
  },
  loginWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginSub: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  loginCTA: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(14),
    color: Colors.PRIMARY,
  },
  errors: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
    color: Colors.ERROR,
    paddingBottom: moderateScale(8),
  },
});
