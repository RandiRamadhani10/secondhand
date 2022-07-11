import React from 'react';
import propTypes from 'prop-types';

import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import {
  ICBell,
  ICBellActive,
  ICBellActiveWithBadge,
  ICHome,
  ICHomeActive,
  ICList,
  ICListActive,
  ICPlus,
  ICPlusActive,
  ICUser,
  ICUserActive,
} from '../assets';

import {Colors, Fonts} from '../utils';
import Gap from './Gap';

import {useSelector} from 'react-redux';

const TabItem = props => {
  const {title, isActive, onPress, onLongPress} = props;

  const notificationState = useSelector(state => state.notification);

  const Icon = () => {
    const isHaveNotification = notificationState?.notification.filter(notif => notif.read === false);

    switch (title) {
      case 'Home':
        return isActive ? <ICHomeActive /> : <ICHome />;
      case 'Notifikasi':
        return isActive ? isHaveNotification?.length > 0 ? <ICBellActiveWithBadge /> : <ICBellActive /> : <ICBell />;
      case 'Jual':
        return isActive ? <ICPlusActive /> : <ICPlus />;
      case 'DaftarJual':
        return isActive ? <ICListActive /> : <ICList />;
      case 'Akun':
        return isActive ? <ICUserActive /> : <ICUser />;
      default:
        return <ICHomeActive />;
    }
  };

  const titleShow = () => {
    let displayTitle;

    switch (title) {
      case 'Home':
        displayTitle = 'Home';
        break;
      case 'Notifikasi':
        displayTitle = 'Notifikasi';
        break;
      case 'Jual':
        displayTitle = 'Jual';
        break;
      case 'DaftarJual':
        displayTitle = 'Daftar Jual';
        break;
      case 'Akun':
        displayTitle = 'Akun';
        break;
      default:
        displayTitle = 'Other';
        break;
    }

    return displayTitle;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
      testID="tab-item">
      <Icon />
      <Gap height={moderateScale(4)} />
      <Text style={styles.title(isActive)}>{titleShow()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: moderateScale(14),
  },
  title: isActive => ({
    fontFamily: isActive ? Fonts.PRIMARY.BOLD : Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
    color: isActive ? Colors.PRIMARY : Colors.SECONDARY,
  }),
});

TabItem.propTypes = {
  title: propTypes.string,
  isActive: propTypes.bool,
  onPress: propTypes.func,
  onLongPress: propTypes.func,
};

export default TabItem;
