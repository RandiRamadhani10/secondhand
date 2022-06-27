import {createSlice} from '@reduxjs/toolkit';
import {getNotification, getNotificationById} from './actions/notification';

const initialState = {
  notification: [],
  notificationDetail: {},
  isLoading: false,
  error: null,
};

export const buyerSlice = createSlice({
  name: 'notification',
  initialState,
  extraReducers: {
    //   Get All Products
    [getNotification.pending]: state => {
      return {...state, isLoading: true};
    },
    [getNotification.fulfilled]: (state, action) => {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    },
    [getNotification.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Get Product By ID
    [getNotificationById.pending]: state => {
      return {...state, isLoading: true};
    },
    [getNotificationById.fulfilled]: (state, action) => {
      return {
        ...state,
        productDetail: action.payload,
        isLoading: false,
      };
    },
    [getNotificationById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
  },
});

export default buyerSlice.reducer;
