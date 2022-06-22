import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../utils';
import {Gap, BaseButton, CardUser} from '../components';
import {Fonts} from '../utils';
import {ICArrowLeft} from '../assets';
const screen = Dimensions.get('screen');
const DetailProduk = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.screen}>
        <ScrollView>
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                zIndex: 99,
                padding: 5,
                borderRadius: 50,
                left: 16,
                top: 44,
              }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Main', {screen: 'Home'})}>
              <ICArrowLeft />
            </TouchableOpacity>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRdbhQQ3WnSAlLTQ16icqtcUo7H2mDGk9SqyC0vN9OXG3LFeyZyUF1aw_WKFuGY4pE0FujTymiXMMkTclEL6LKl4zd_iqdnjQPv6bM27Y8&usqp=CAE',
                }}
              />
              <View style={styles.abs}>
                <View style={styles.absSet}>
                  <View style={styles.title}>
                    <Text style={styles.txtTitle}>Jam Tangan Hitam</Text>
                    <Text style={styles.txtCat}>Aksesoris</Text>
                    <Text style={styles.txtTitle}>Rp. 250.000</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <CardUser
                name={'Randi Pandugo'}
                city={'Jombang'}
                button={false}
              />
            </View>
            <View style={styles.title}>
              <Text style={styles.txtTitle}>Deskripsi</Text>
              <Text style={styles.des}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
            <Gap height={60} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          padding: 16,
          position: 'absolute',
          width: '100%',
          bottom: 1,
        }}>
        <BaseButton title="Saya Tertarik dan ingin Nego" />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    height: screen.height * 0.5,
    width: screen.width,
  },
  abs: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  absSet: {
    width: '100%',
  },
  image: {
    height: '80%',
    width: '100%',
  },
  title: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 16,
    marginBottom: 30,
    elevation: 5,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
  txtTitle: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: 'black',
  },
  txtCat: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
  },
  des: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
});

export default DetailProduk;
