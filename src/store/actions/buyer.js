import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../services/api';
import {showError} from '../../utils';

export const getProduct = createAsyncThunk('buyer/getProduct', async (params, {rejectWithValue}) => {
  try {
    const response = await apiClient.get(`buyer/product?search=${params?.search}&category_id=${params?.category_id}`);

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

export const getProductById = createAsyncThunk('buyer/getProductById', async (id, {rejectWithValue}) => {
  try {
    const response = await apiClient.get(`buyer/product/${id}`);

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
