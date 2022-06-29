import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {
  BaseNotif, 
  Gap,
  NotifItemSkeleton
} from '../components';
import {Colors, Fonts} from '../utils';
import {moderateScale} from 'react-native-size-matters';
import {IMGDummyProduct} from '../assets';
import {useDispatch, useSelector} from 'react-redux';

const Notif = ({navigation}) => {
  const dispatch = useDispatch();

  const notificationState = useSelector(state => state.notification);

  const emptyContent = (
    <View style={styles.screen}>
      <Text style={styles.emptyText}>Belum ada Notifikasi</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Notifikasi</Text>
      <Gap height={24} />
      <FlatList
        data={notificationState}
        keyExtractor={item => item.id}
        ListEmptyComponent={emptyContent}
        renderItem={({item}) => {
          return notificationState.isLoading ? (
            <View style={styles.loadingContainer}>
              <NotifItemSkeleton />
            </View>
          ) : (
            <View>
              <BaseNotif
                key={item.id}
                image={item.image_url}
                status={item.status}
                title={item.product_id}
                price={item.product_id}
                bid={item.bid_price}
                tanggal={item.transaction_date}
                onPress={() => navigation.navigate('InfoPenawar')}
              />
              <Gap height={16} />
              <View style={styles.divider} />
              <Gap height={16} />
            </View>
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
  emptyText: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(12),
    color: Colors.TEXT,
    textAlign: 'center',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Notif;
