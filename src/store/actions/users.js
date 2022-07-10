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
      description: error.response.data.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const authLogin = createAsyncThunk('users/authLogin', async (payload, {dispatch, rejectWithValue}) => {
  try {
    const response = await apiClient.post('auth/login', payload);
    if (response.data) {
      showSuccess({
        title: 'Login Berhasil',
        description: `Halo, ${response?.data?.name}`,
      });
      dispatch(authUser(response?.data?.access_token));
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
        access_token: token ? token : state?.users?.users?.access_token,
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
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response) {
      showSuccess({
        title: 'Update Data Berhasil',
      });
    }

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Gagal Mengedit Data',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});
