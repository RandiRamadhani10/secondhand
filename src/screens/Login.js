import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {moderateScale} from 'react-native-size-matters';
import {useForm, Controller} from 'react-hook-form';
import {BaseButton, BaseInput, Gap} from '../components';
import {Colors} from '../utils/Colors';
import {ICArrowLeft} from '../assets';
import {Fonts} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {authLogin} from '../store/actions/users';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.users.isLoading);

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required('Please input your email'),
      password: yup.string().min(5).required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    dispatch(authLogin(data));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={Colors.WHITE} />
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Main', {screen: 'Home'})}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Gap height={40} />
        <Text style={styles.header}>Masuk</Text>
        <Gap height={24} />
        <Controller
          control={control}
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
        {errors?.email && (
          <Text style={styles.errors}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <BaseInput
              label="Password"
              type="password"
              placeholder="Masukkan Password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errors}>{errors.password.message}</Text>
        )}
        <Gap height={16} />
        <BaseButton
          disable={isLoading}
          isLoading={isLoading}
          title="Masuk"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={styles.registerContainer}>
        <View style={styles.registerWrapper}>
          <Text style={styles.registerSub}>Belum punya Akun? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Daftar');
            }}>
            <Text style={styles.registerCTA}>Daftar disini</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
  registerContainer: {
    flex: moderateScale(1),
    justifyContent: 'flex-end',
  },
  registerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerSub: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  registerCTA: {
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
