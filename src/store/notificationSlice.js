import {createSlice} from '@reduxjs/toolkit';
import {getNotification} from './actions/notification';

const initialState = {
  notification: [],
  detailNotification: {},
  isLoading: false,
  error: null,
};

export const notificationSlice = createSlice({
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
        notification: action.payload,
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
  },
});

export default notificationSlice.reducer;
