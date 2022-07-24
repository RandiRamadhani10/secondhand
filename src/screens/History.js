import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import {BaseNotif, EmptyContent, Gap, NotificationItemSkeleton} from '../components';
import {moderateScale} from 'react-native-size-matters';
import {ICArrowLeft} from '../assets';
import {Colors, Fonts} from '../utils';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getHistory} from '../store/actions/buyer';

const History = ({navigation}) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const usersState = useSelector(state => state.users.users);

  const buyerState = useSelector(state => state.buyer);

  useEffect(() => {
    if (usersState.hasOwnProperty('access_token')) {
      dispatch(getHistory());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.head}>
        <Gap height={moderateScale(16)} />
        <TouchableOpacity
          style={styles.btnBack}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}>
          <ICArrowLeft />
        </TouchableOpacity>
        <Text style={styles.header}>History Transaksi</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        data={buyerState?.history}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyContent text="Belum Ada History Transaksi saat ini" />}
        renderItem={({item}) => {
          return buyerState.isLoading ? (
            <View>
              <NotificationItemSkeleton />
            </View>
          ) : (
            <View key={item.id}>
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
                isRead={true}
                onPress={() => navigation.navigate('DetailProduk', {id: item.product_id})}
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

export default History;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  head: {
    padding: moderateScale(20),
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnBack: {
    position: 'absolute',
    left: moderateScale(20),
    top: moderateScale(20),
  },
  header: {
    fontFamily: Fonts.PRIMARY.BOLD,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  divider: {
    borderBottomColor: Colors.DISABLE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listContainer: {
    paddingHorizontal: moderateScale(20),
    backgroundColor: Colors.BACKGROUND,
  },
});
