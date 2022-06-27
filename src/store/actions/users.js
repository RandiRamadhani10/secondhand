import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../services/api';
import {ErrorCode, navigate, showError, showSuccess} from '../../utils';

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
      description: error.response.data,
    });

    return rejectWithValue(error.response.data);
  }
});

export const authLogin = createAsyncThunk('users/authLogin', async (payload, {rejectWithValue}) => {
  try {
    const response = await apiClient.post('auth/login', payload);
    if (response.data) {
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

export const authUser = createAsyncThunk('auth/user', async (token, {getState, rejectWithValue}) => {
  try {
    const state = getState();
    const response = await apiClient.get('auth/user', {
      headers: {
        access_token: state?.users?.users?.access_token,
      },
    });

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

export const putAuthUser = createAsyncThunk('auth/user', async (payload, {getState, rejectWithValue}) => {
  try {
    const state = getState();
    const response = await apiClient.put('auth/user', payload, {
      headers: {
        access_token: state?.users?.users?.access_token,
      },
    });

    if (response) {
      showSuccess({
        title: 'Update Data Berhasil',
      });
      navigate('Main', {screen: 'Home'});
    }

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    console.log(error?.response?.status);

    const err = ErrorCode.filter(status => status.code === error?.response?.status);

    showError({
      title: 'Gagal Mengedit Data',
      description: err.message,
    });

    return rejectWithValue(error.response.data);
  }
});
