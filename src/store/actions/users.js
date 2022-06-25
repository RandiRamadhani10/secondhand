import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../services/api';
import {navigate, showError, showSuccess} from '../../utils';

export const authRegister = createAsyncThunk('users/authRegister', async (payload, {rejectWithValue}) => {
  try {
    const response = await apiClient.post('auth/register', payload);

    if (response.data) {
      showSuccess({
        title: 'Register Berhasil',
        description: 'Silahkan Login dengan data yang telah didaftarkan',
      });
      navigate('Login');
    }

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Register Gagal',
      description: 'Silahkan Lengkapi Semua Field yang tersedia',
    });

    return rejectWithValue(error.response.data);
  }
});

export const authLogin = createAsyncThunk('users/authLogin', async (payload, {dispatch, rejectWithValue}) => {
  try {
    const response = await apiClient.post('auth/login', payload);

    if (response.data) {
      // If need to Get Direct Detail User
      // dispatch(authUser(response?.data?.access_token));
      showSuccess({
        title: 'Login Berhasil',
        description: `Halo, ${response?.data?.name}`,
      });
      navigate('Main', {screen: 'Home'});
    }

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Login Gagal',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const authUser = createAsyncThunk('auth/user', async (token, {rejectWithValue}) => {
  try {
    const response = await apiClient.get('auth/user', token);

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Gagal Mendapatkan Data',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});
