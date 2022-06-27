import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Gap, BaseInput, BaseButton} from '../components';
import SelectDropdown from 'react-native-select-dropdown';
import {ICArrowLeft, ICChevronDown, ICChevronUp} from '../assets';
import {Colors} from '../utils/Colors';
import {Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import CameraButton from '../components/CameraButton';

import {useDispatch, useSelector} from 'react-redux';
import {authUser, putAuthUser} from '../store/actions/users';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const usersState = useSelector(state => state.users);

  const schema = yup
    .object({
      nama: yup.string().required('Silahkan Isi Nama'),
      kota: yup.string().required('Silahkan Pilih Kota'),
      alamat: yup.string().required('Silahkan Isi Alamat'),
      nohp: yup.number().typeError('Silahkan isi dengan No Handphone').required('Silahkan Isi No Handphone'),
    })
    .required();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: '',
      city: '',
      address: '',
      phone_number: '',
    },
  });

  const watchCity = watch('city');

  const watchAllFields = watch();

  // useEffect(() => {
  //   dispatch(authUser());
  // }, [dispatch]);

  useEffect(() => {
    // Dynamic Set Value
    for (const key in usersState?.profile) {
      setValue(key, usersState?.profile[key]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    const {full_name, address, city, phone_number} = watchAllFields;
    dispatch(putAuthUser({full_name, address, city, phone_number}));
  };

  const kota = ['Jakarta', 'Bandung', 'Surabaya', 'Malang', 'Yogyakarta'];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={16} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Main', {screen: 'Akun'});
          }}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Text style={styles.header}>Lengkapi Info Akun</Text>
        <Gap height={40} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={24} />
        <View>
          <View style={styles.avatar}>
            <CameraButton onPress={() => {}} />
          </View>
          <Gap height={24} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <BaseInput
                label="Nama*"
                type="text"
                placeholder="Nama"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="full_name"
          />
          {errors.full_name && <Text style={styles.errors}>{errors.full_name.message}</Text>}
          <Gap height={4} />
          <Text style={styles.label}>Kota*</Text>
          <Gap height={4} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onBlur, value}}) => (
              <SelectDropdown
                data={kota}
                defaultValue={watchCity ? watchCity : ''}
                defaultButtonText={'Pilih Kota'}
                buttonTextStyle={styles.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return isOpened ? <ICChevronUp /> : <ICChevronDown />;
                }}
                onSelect={selectedItem => {
                  setValue('city', selectedItem);
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
            name="city"
          />
          <Gap height={16} />
          {errors.city && <Text style={styles.errors}>{errors.city.message}</Text>}
          <Gap height={16} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <BaseInput
                label="Alamat*"
                type="text"
                placeholder="Contoh Jalan Ikan Hiu 33"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="address"
          />
          {errors.address && <Text style={styles.errors}>{errors.address.message}</Text>}
          <Gap height={16} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <BaseInput
                label="No Handphone*"
                type="text"
                placeholder="Contoh: +628523456789"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="phone_number"
          />
          {errors.phone_number && <Text style={styles.errors}>{errors.phone_number.message}</Text>}
          <Gap height={24} />
          <BaseButton
            disable={usersState?.isLoading}
            isLoading={usersState?.isLoading}
            title="Simpan"
            onPress={() => {
              console.log('triggered');
              onSubmit();
            }}
          />
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
});

export default Profile;
