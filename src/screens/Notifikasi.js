import React, {Fragment, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {BaseNotif, EmptyContent, Gap, NotificationItemSkeleton} from '../components';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import {getNotification} from '../store/actions/notification';
import {useIsFocused} from '@react-navigation/native';
import {getProductById} from '../store/actions/buyer';

const Notif = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const usersState = useSelector(state => state.users.users);
  const notificationState = useSelector(state => state.notification);
  const buyerState = useSelector(state => state.buyerState);

  useEffect(() => {
    if (!usersState.hasOwnProperty('access_token')) {
      navigation.navigate('Login');
    } else {
      dispatch(getNotification());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Notifikasi</Text>
      <Gap height={24} />
      <FlatList
        data={notificationState.notification}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyContent text="Belum ada Notifikasi" />}
        renderItem={({item}) => {
          return notificationState.isLoading ? (
            <View>
              <NotificationItemSkeleton />
            </View>
          ) : (
            <Fragment key={item.id}>
              <BaseNotif
                image={item.image_url}
                status={'Penawaran Produk'}
                title={item.product_id}
                price={item.product_id}
                bid={item.bid_price}
                tanggal={item.transaction_date}
                // onPress={() => navigation.navigate('InfoPenawar', {id: item.id})}
              />
              <Gap height={16} />
              <View style={styles.divider} />
              <Gap height={16} />
            </Fragment>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: moderateScale(20),
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(20),
    color: Colors.TEXT,
  },
  divider: {
    borderBottomColor: Colors.DISABLE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Notif;
