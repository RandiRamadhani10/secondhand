import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts} from '../utils';

import {moderateScale} from 'react-native-size-matters';
import {ICArrowLeft} from '../assets';
import {BaseButton, BaseInput, Gap} from '../components';
import {Controller, useForm} from 'react-hook-form';

const Daftar = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={Colors.WHITE} />
      <View>
        <ICArrowLeft />
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
          name="nama"
        />
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
        <Gap height={16} />
        <BaseButton title="Daftar" onPress={() => {}} />
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
});
