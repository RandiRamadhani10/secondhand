import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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

const Profile = ({navigation}) => {
  const schema = yup
    .object({
      nama: yup.string().required('Silahkan Isi Nama'),
      kota: yup.string().required('Silahkan Pilih Kota'),
      alamat: yup.string().required('Silahkan Isi Alamat'),
      nohp: yup
        .number()
        .typeError('Silahkan isi dengan No Handphone')
        .required('Silahkan Isi No Handphone'),
    })
    .required();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nama: '',
      kota: '',
      alamat: '',
      nohp: '',
    },
  });

  const onSubmit = data => {
    console.log(data);
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
            name="nama"
          />
          {errors.nama && (
            <Text style={styles.errors}>{errors.nama.message}</Text>
          )}
          <Gap height={4} />
          <Text style={styles.label}>Kota*</Text>
          <Gap height={4} />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onBlur, value}}) => (
              <SelectDropdown
                data={kota}
                defaultButtonText={'Pilih Kota'}
                buttonTextStyle={styles.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return isOpened ? <ICChevronUp /> : <ICChevronDown />;
                }}
                onSelect={selectedItem => {
                  setValue('kota', selectedItem);
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
            name="kota"
          />
          <Gap height={16} />
          {errors.kota && (
            <Text style={styles.errors}>{errors.kota.message}</Text>
          )}
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
            name="alamat"
          />
          {errors.alamat && (
            <Text style={styles.errors}>{errors.alamat.message}</Text>
          )}
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
            name="nohp"
          />
          {errors.nohp && (
            <Text style={styles.errors}>{errors.nohp.message}</Text>
          )}
          <Gap height={24} />
          <BaseButton title="Simpan" onPress={handleSubmit(onSubmit)} />
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
