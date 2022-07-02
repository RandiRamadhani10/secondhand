import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const NotifItemSkeleton = props => (
  <ContentLoader speed={2} width={width} height={250} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <Rect x="0" y="0" rx="5" ry="5" width="48" height="48" />
    <Rect x="60" y="0" rx="3" ry="3" width="100" height="14" />
    <Rect x="300" y="0" rx="3" ry="3" width="100" height="14" />
    <Rect x="60" y="20" rx="4" ry="4" width="150" height="20" />
    <Rect x="60" y="45" rx="3" ry="3" width="125" height="20" />
    <Rect x="60" y="70" rx="3" ry="3" width="200" height="20" />
    <Rect x="60" y="95" rx="3" ry="3" width="250" height="14" />
  </ContentLoader>
);

export default NotifItemSkeleton;
