import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../services/api';
import {showError} from '../../utils';

export const getNotification = createAsyncThunk('notification/getNotification', async (params, {rejectWithValue}) => {
  try {
    const response = await apiClient.get('mn/');
    console.log(response);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Oops Terjadi kesalahan',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const getNotificationById = createAsyncThunk('notification/getNotificationById', async (id, {rejectWithValue}) => {
  try {
    const response = await apiClient.get(`notification/${id}`);

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Oops Terjadi kesalahan',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});
