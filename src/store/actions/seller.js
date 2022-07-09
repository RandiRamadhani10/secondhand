import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../services/api';
import {showError, showSuccess} from '../../utils';

export const getProduct = createAsyncThunk('seller/getProduct', async (token, {getState, rejectWithValue}) => {
  try {
    const state = getState();
    const response = await apiClient.get('seller/product', {
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
      title: 'Gagal Mendapatkan Data Produk',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const getProductById = createAsyncThunk('seller/getProductById', async (id, {getState, rejectWithValue}) => {
  const state = getState();
  try {
    const response = await apiClient.get(`seller/product/${id}`, {
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
      title: 'Gagal Mendapatkan Data Produk By ID',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const postProduct = createAsyncThunk('seller/postProduct', async (payload, {getState, rejectWithValue}) => {
  const state = getState();
  try {
    const response = await apiClient.post('seller/product', payload, {
      headers: {
        access_token: state?.users.users?.access_token,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response) {
      showSuccess({
        title: 'Berhasil Menambahkan Produk',
      });
    }

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Gagal Menambahkan Data Produk',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const putProductById = createAsyncThunk(
  'seller/putProductById',
  async ({id, payload}, {getState, rejectWithValue}) => {
    const state = getState();
    try {
      const response = await apiClient.put(`seller/product/${id}`, payload, {
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
        title: 'Gagal Merubah Data Produk By ID',
        description: error.response?.data?.message,
      });

      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteProductById = createAsyncThunk(
  'seller/deleteProductById',
  async (id, {getState, rejectWithValue}) => {
    const state = getState();
    try {
      const response = await apiClient.delete(`seller/product/${id}`, {
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
        title: 'Gagal Menghapus Data Produk By ID',
        description: error.response?.data?.message,
      });

      return rejectWithValue(error.response.data);
    }
  },
);
