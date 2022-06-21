import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableHighlight, Button} from 'react-native';
import {Fonts} from '../utils';
import {Gap} from './Gap';
import {ICAvatarExample} from '../assets';
import {Colors} from '../utils/Colors';
import {moderateScale} from 'react-native-size-matters';

const CardUser = ({avatar, name, city, button, isActive = false}) => {
    return (
        <View style={styles.mainCard}>
            <View style={styles.icon}>
                <ICAvatarExample />
            </View>
            <View style={styles.contentText}>
                <Text style={styles.name}>{name}</Text>
                <Text>{city}</Text>
            </View>
            <View style={styles.buttonPlace}>
                <TouchableHighlight style={styles.button(isActive)}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

CardUser.propTypes = {
    isActive: propTypes.bool,
    avatar: propTypes.string,
    name: propTypes.string,
    city: propTypes.string,
    button: propTypes.bool,
}

const styles = StyleSheet.create({
    mainCard: {
        height: moderateScale(80),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
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
        marginLeft: moderateScale(18),
    },
    name:{
        fontFamily: Fonts.PRIMARY.BOLD,
        fontSize: moderateScale(14),
        color: Colors.TEXT,
    },
    contentText: {
        marginLeft: moderateScale(16)
    },
    buttonPlace: {
        marginLeft: 'auto',
        marginRight: moderateScale(16)
    },
    button: isActive => ({
        backgroundColor: Colors.WHITE,
        borderWidth: moderateScale(1.5),
        borderRadius: moderateScale(10),
        width: moderateScale(47),
        height: moderateScale(26),
        alignItems: 'center',
        borderColor: Colors.PRIMARY
    }),
    buttonText: {
        fontFamily: Fonts.PRIMARY.REGULAR,
        color: Colors.TEXT,
        fontSize: moderateScale(12),
        marginTop: moderateScale(2),
    }
})

export default CardUser;
