import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { 
    Gap, 
    BaseInput, 
    BaseButton } from '../components';
import SelectDropdown from 'react-native-select-dropdown';
import { 
    ICArrowLeft,
    ICDummyAvatar,
    ICChevronDown,
    ICChevronUp
} from '../assets';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils';
import { moderateScale } from 'react-native-size-matters';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nama: '',
            kota: '',
            alamat: '',
            nohp: '',
        },
    });

    const schema = yup
        .object({
            nama: yup.string().required('Nama'),
            kota: yup.string().required('Pilih Kota'),
            alamat: yup.string().required('Contoh: Jalan Ikan Hiu 33'),
            nohp: yup.string().required('Contoh: +628523456789'),
        })
        .required();
    
    const onSubmit = data => {
        console.log(data)
    }

    const kota = [
        "Jakarta",
        "Bandung",
        "Surabaya",
        "Malang",
        "Yogyakarta",
    ]

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
            paddingLeft: moderateScale(80)
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
        buttonTextStyle:{
            textAlign: 'left',
            fontSize: moderateScale(14), 
            fontFamily: Fonts.PRIMARY.REGULAR
        }
    })

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.head}>
                <Gap height={16} />
                <ICArrowLeft />
                <Text style={styles.header}>Lengkapi Info Akun</Text>
                <Gap height={40} />
            </View>
            <ScrollView>
            <View>
                <View style={styles.avatar}> 
                    <ICDummyAvatar style={styles.avatar}/>
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
                {errors.nama && <Text>{errors.nama.message}</Text>}
                <Gap height={4} />
                    <Text style={styles.label}>Kota*</Text>
                <Gap height={4}/>
                <Controller
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, onBlur, value}}) => (
                        <SelectDropdown
                            data={kota}
                            defaultButtonText={'Pilih Kota'}
                            buttonTextStyle={styles.buttonTextStyle}
                            renderDropdownIcon={isOpened => {
                                return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={15}/>;
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
                    name="kota"
                />
                {errors.kota && <Text>{errors.kota.message}</Text>}
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
                {errors.alamat && <Text>{errors.alamat.message}</Text>}
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
                {errors.nohp && <Text>{errors.nohp.message}</Text>}
                <Gap height={24} />
                <BaseButton title="Simpan" onPress={handleSubmit(onSubmit)} />
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;