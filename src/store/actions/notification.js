import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../services/api';
import {showError} from '../../utils';

export const getNotification = createAsyncThunk('global/notification', async (payload, {getState, rejectWithValue}) => {
  try {
    const state = getState();
    const response = await apiClient.get('notification', {
      headers: {
        access_token: state?.users.users?.access_token,
      },
    });

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Gagal Mendapatkan Notifikasi',
      description: error.response.data.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const getNotificationById = createAsyncThunk(
  'global/notificationById',
  async (id, {getState, rejectWithValue}) => {
    try {
      const state = getState();
      const response = await apiClient.get(`notification/${id}`, {
        headers: {
          access_token: state?.users.users?.access_token,
        },
      });

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      showError({
        title: 'Gagal Mendapatkan Notifikasi By ID',
        description: error.response.data.message,
      });

      return rejectWithValue(error.response.data);
    }
  },
);

export const patchNotificationById = createAsyncThunk(
  'global/patchNotificationById',
  async ({id, payload}, {getState, rejectWithValue}) => {
    try {
      const state = getState();
      const response = await apiClient.patch(`notification/${id}`, payload, {
        headers: {
          access_token: state?.users.users?.access_token,
        },
      });

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      showError({
        title: 'Gagal melakukan Patch Notifikasi By ID',
        description: error.response.data.message,
      });

      return rejectWithValue(error.response.data);
    }
  },
);
