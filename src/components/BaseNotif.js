import React from "react";
import propTypes from "prop-types";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { ICDummyProduct, ICNotifActive } from "../assets";
import { Fonts } from "../utils";
import Gap from "./Gap";
import { Colors } from "../utils/Colors";
import { moderateScale } from "react-native-size-matters";


const BaseNotif = ({status, title, price, bid, tanggal}) => {

    BaseNotif.propTypes = {
        status: propTypes.string,
        title: propTypes.string,
        price: propTypes.number,
        bid: propTypes.string,
        tanggal: propTypes.string,
    };

    

    const styles = StyleSheet.create({
        card:{
            flexDirection: "row"
        },
        contents:{
            paddingLeft: moderateScale(16),
        },
        status:{
            flex: 1,
            flexDirection: "row-reverse",
        },
        statusText:{
            fontFamily: Fonts.PRIMARY.LIGHT,
            fontSize: moderateScale(10),
        },
        titleText:{
            fontFamily: Fonts.PRIMARY.REGULAR,
            color: Colors.TEXT,
            fontSize: moderateScale(18),
        },
        Text:{
            fontFamily: Fonts.PRIMARY.REGULAR,
            color: Colors.TEXT,
            fontSize: moderateScale(14),
        },
        divider:{
            flex: 1, 
            height: 1, 
            backgroundColor: Colors.DISABLE,
        }
    });

    return(
        <TouchableOpacity>
        <View style={styles.card}>
            <View>
                <Gap height={5}/>
                <ICDummyProduct/>
            </View>
            <View style={styles.contents}>
                <Text style={styles.statusText}>{status}</Text>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.Text}>{price}</Text>
                <Text style={styles.Text}>{bid}</Text>
            </View>
            <View style={styles.status}>
                <ICNotifActive/>
                <Text style={styles.statusText}>{tanggal}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
};

export default BaseNotif;