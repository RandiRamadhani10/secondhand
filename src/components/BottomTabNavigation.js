import React from 'react';

import {View, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../utils';
import TabItem from './TabItem';

const BottomTabNavigation = props => {
  const {state, descriptors, navigation} = props;

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        // Checking for Label
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            title={label}
            isActive={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    paddingVertical: moderateScale(12),
    justifyContent: 'space-around',
    elevation: moderateScale(8),
    shadowColor: Colors.SECONDARY,
  },
});

export default BottomTabNavigation;
