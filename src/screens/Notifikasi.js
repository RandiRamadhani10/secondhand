import React, {Fragment, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {BaseNotif, EmptyContent, Gap, NotificationItemSkeleton} from '../components';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import {getNotification, patchNotificationById} from '../store/actions/notification';
import {useIsFocused} from '@react-navigation/native';

const Notifikasi = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const notificationState = useSelector(state => state.notification);

  const handleClickItem = async (id, payload) => {
    // If Navigate to InfoPenawar
    // const response = await dispatch(patchNotificationById({id: id, payload: {...payload, read: true}}));

    // if (response?.payload && payload?.notification_type === null) {
    //   setIsChangedReadStatus(true);
    //   navigation.navigate('InfoPenawar', {id: id});
    // }

    // Just Change Status Read
    let payloadBody = {
      id: id,
      payload: {
        id: payload.id,
        product_id: payload.product_id,
        bid_price: payload.bid_price,
        transaction_date: payload.transaction_date,
        status: payload.status,
        seller_name: payload.seller_name,
        buyer_name: payload.buyer_name,
        receiver_id: payload.receiver_id,
        image_url: payload.image_url,
        created_at: payload.created_at,
        updated_at: payload.updated_at,
        read: true,
      },
    };

    // Loading is Show Every Dispatch
    // const response = await dispatch(patchNotificationById({id: id, payload: payloadBody}));

    // if (response) {
    //   dispatch(getNotification());
    // }

    // PatchData & Navigate
    dispatch(patchNotificationById({id: id, payload: payloadBody}));
    navigation.navigate('DetailProduk', {id: payload?.product_id});
  };

  useEffect(() => {
    dispatch(getNotification());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Notifikasi</Text>
      <Gap height={24} />
      <FlatList
        showsVerticalScrollIndicator={false}
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
                status={item.status}
                title={item?.status === 'create' ? item?.product_name : item?.Product?.name ? item?.Product?.name : '-'}
                price={
                  item?.status === 'create'
                    ? item?.base_price
                    : item?.Product?.base_price
                    ? item?.Product?.base_price
                    : 0
                }
                bid={item.bid_price}
                tanggal={item.status === 'bid' ? item.transaction_date : item.createdAt}
                isRead={item.read}
                onPress={async () => await handleClickItem(item.id, item)}
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

export default Notifikasi;
