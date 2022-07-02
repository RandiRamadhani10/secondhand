import React, {useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {Divider, Gap} from '../components';
import CameraButton from '../components/CameraButton';
import {ICEdit, ICLogout, ICSettings} from '../assets';

import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../store/usersSlice';

const Akun = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const usersState = useSelector(state => state.users.users);

  useEffect(() => {
    if (!usersState.hasOwnProperty('access_token')) {
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Akun Saya</Text>
      <Gap height={moderateScale(24)} />
      <View style={styles.cameraContainer}>
        <CameraButton onPress={() => {}} />
      </View>
      <Gap height={moderateScale(24)} />

      <TouchableOpacity
        style={styles.menuAkunItem}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <ICEdit />
        <Gap width={moderateScale(16)} />
        <Text style={styles.menuAkunItemTitle}>Ubah Akun</Text>
      </TouchableOpacity>
      <Gap height={moderateScale(16)} />
      <Divider />

      <Gap height={moderateScale(16)} />
      <TouchableOpacity style={styles.menuAkunItem} activeOpacity={0.7} onPress={() => {}}>
        <ICSettings />
        <Gap width={moderateScale(16)} />
        <Text style={styles.menuAkunItemTitle}>Pengaturan Akun</Text>
      </TouchableOpacity>
      <Gap height={moderateScale(16)} />
      <Divider />

      <Gap height={moderateScale(16)} />
      <TouchableOpacity
        style={styles.menuAkunItem}
        activeOpacity={0.7}
        onPress={() => {
          dispatch(clearUser());
          navigation.navigate('Main', {screen: 'Home'});
        }}>
        <ICLogout />
        <Gap width={moderateScale(16)} />
        <Text style={styles.menuAkunItemTitle}>Keluar</Text>
      </TouchableOpacity>
      <Gap height={moderateScale(16)} />
      <Divider />

      <Gap height={moderateScale(16)} />
      <Text style={styles.version}>Version 1.0.0</Text>
    </SafeAreaView>
  );
};

export default Akun;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: moderateScale(20),
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(20),
    color: Colors.TEXT,
  },
  cameraContainer: {
    alignItems: 'center',
  },
  menuAkunItem: {
    flexDirection: 'row',
  },
  menuAkunItemTitle: {
    fontFamily: Fonts.PRIMARY.MEDIUM,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  version: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(12),
    color: Colors.SECONDARY,
    textAlign: 'center',
  },
});
