import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableHighlight, Button} from 'react-native';
import {Fonts} from '../utils';
import {Gap} from './Gap';
import { ICAvatarExample } from '../assets';
import {Colors} from '../utils/Colors';
import {moderateScale} from 'react-native-size-matters';

const CardUser = () => {
    return (
        <View style={styles.mainCard}>
            <View style={styles.icon}>
                <ICAvatarExample />
            </View>
            <View style={styles.text}>
                <Text>Nama Penjual</Text>
                <Text>kota</Text>
            </View>
            <View style={styles.buttonPlace}>
                <TouchableHighlight style={styles.button}>
                    <Text>Edit</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CardUser;

const styles = StyleSheet.create({
    mainCard: {
        height: moderateScale(80),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(16),
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: moderateScale(1),
        shadowRadius: moderateScale(8),
        elevation: moderateScale(8),
        flexDirection: 'row',
        justifyContent: 'flex-start', 
    },
    icon: {
        marginLeft: moderateScale(16)
    },
    text: {
        marginLeft: moderateScale(16)
    },
    buttonPlace: {
        marginLeft: 'auto',
        marginRight: moderateScale(16)
    },
    button:{
        backgroundColor: Colors.WHITE,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(10),
        width: moderateScale(47),
        height: moderateScale(26),
        alignItems: 'center'

    }
})