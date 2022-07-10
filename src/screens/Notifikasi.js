import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {BaseNotif, EmptyContent, Gap, NotificationItemSkeleton} from '../components';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import {getNotification, patchNotificationById} from '../store/actions/notification';
import {useIsFocused} from '@react-navigation/native';
import {getProductById} from '../store/actions/buyer';

const Notif = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const usersState = useSelector(state => state.users.users);
  const notificationState = useSelector(state => state.notification);
  const buyerState = useSelector(state => state.buyerState);

  const [isChangedReadStatus, setIsChangedReadStatus] = useState(false);

  const handleClickItem = async (id, payload) => {
    const response = await dispatch(patchNotificationById({id: id, payload: {...payload, read: true}}));

    if (response?.payload && payload?.notification_type === null) {
      setIsChangedReadStatus(true);
      navigation.navigate('InfoPenawar', {id: id});
    }

    setIsChangedReadStatus(true);
  };

  useEffect(() => {
    dispatch(getNotification());
    setIsChangedReadStatus(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, isChangedReadStatus]);

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
                title={item?.Product?.name ? item?.Product?.name : '-'}
                price={item?.Product?.base_price ? item?.Product?.base_price : 0}
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

export default Notif;
