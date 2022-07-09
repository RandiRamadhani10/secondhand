import {createSlice} from '@reduxjs/toolkit';
import {getNotification, getNotificationById} from './actions/notification';

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
    //   Get All Notification
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

    //   Get Notification By ID
    [getNotificationById.pending]: state => {
      return {...state, isLoading: true};
    },
    [getNotificationById.fulfilled]: (state, action) => {
      return {
        ...state,
        detailNotification: action.payload,
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

export default notificationSlice.reducer;
