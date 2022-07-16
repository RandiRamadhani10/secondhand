import React from 'react';
import propTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from 'react-native-size-matters';
import {Colors, Fonts} from '../utils';
import Gap from './Gap';
import NumberFormat from 'react-number-format';

// Alternative for choose width & height
const {width} = Dimensions.get('window');

const ProductItem = ({title, image, category, price, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.containerShadow} onPress={onPress}>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <Gap height={moderateScale(8)} />
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {title}
        </Text>
        <Gap height={moderateScale(4)} />

        <View style={styles.categoryContainer}>
          {typeof category === 'string' ? (
            <Text style={styles.category}>{category}</Text>
          ) : Array.isArray(category) ? (
            category.map((item, index) => (
              <Text key={item.id} style={styles.category}>
                {index > 0 ? ',' : ''}
                {item.name}
              </Text>
            ))
          ) : (
            <Text style={styles.category}>{category}</Text>
          )}
        </View>

        <Gap height={moderateScale(8)} />
        <NumberFormat
          value={price}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          prefix={'Rp. '}
          renderText={formattedValue => <Text style={styles.price}>{formattedValue}</Text>}
        />
        <Gap height={moderateScale(8)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerShadow: {
    margin: moderateScale(12),
    width: width * 0.42,
    borderRadius: 8,
    backgroundColor: Colors.BACKGROUND,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  container: {
    width: '100%',
    borderRadius: 8,
    padding: moderateScale(10),
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 100,
    borderRadius: moderateScale(5),
  },
  title: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  category: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(10),
    color: Colors.SECONDARY,
  },
  price: {
    fontFamily: Fonts.PRIMARY.REGULAR,
    fontSize: moderateScale(14),
    color: Colors.TEXT,
  },
  categoryContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    overflow: 'hidden',
  },
});

ProductItem.propTypes = {
  title: propTypes.string,
  image: propTypes.any,
  category: propTypes.oneOfType([propTypes.string, propTypes.array]),
  price: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onPress: propTypes.func,
};

export default ProductItem;
