import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../services/api';
import {showError, showSuccess} from '../../utils';

export const getProduct = createAsyncThunk('buyer/getProduct', async (params, {rejectWithValue}) => {
  try {
    const response = await apiClient.get(
      `buyer/product?search=${params?.search}&category_id=${params?.category_id}&status=${params?.status}`,
    );

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Gagal Mendapatkan Data Semua Produk',
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
      title: 'Gagal Mendapatkan Produk',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const getCategory = createAsyncThunk('buyer/getCategory', async (params, {rejectWithValue}) => {
  try {
    const response = await apiClient.get('seller/category');

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Gagal Mendapatkan Category',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const getAllBidProducts = createAsyncThunk(
  'buyer/getAllbBidProducts',
  async (payload, {getState, rejectWithValue}) => {
    const state = getState();
    try {
      const response = await apiClient.get('buyer/order', {
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
        title: 'Gagal Mendapatkan Data Semua Bid',
        description: error.response?.data?.message,
      });

      return rejectWithValue(error.response.data);
    }
  },
);

export const bidProduct = createAsyncThunk(
  'buyer/bidProduct',
  async (payload, {getState, dispatch, rejectWithValue}) => {
    const state = getState();
    try {
      const response = await apiClient.post('buyer/order', payload, {
        headers: {
          access_token: state?.users.users?.access_token,
        },
      });

      if (response?.data) {
        showSuccess({title: 'Penawaran Dikirim', description: 'Harga tawarmu berhasil dikirim ke penjual'});
        dispatch(getAllBidProducts());
      }

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      showError({
        title: 'Gagal Mendapatkan Bid',
        description: error.response?.data?.message,
      });

      return rejectWithValue(error.response.data);
    }
  },
);

export const getBidProductById = createAsyncThunk(
  'buyer/getBidProductById',
  async (id, {getState, rejectWithValue}) => {
    const state = getState();
    try {
      const response = await apiClient.get(`buyer/order/${id}`, {
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
        title: 'Gagal Mendapatkan Data Detail Bid',
        description: error.response?.data?.message,
      });

      return rejectWithValue(error.response.data);
    }
  },
);

export const getBanners = createAsyncThunk('buyer/getBanners', async (id, {rejectWithValue}) => {
  try {
    const response = await apiClient.get('seller/banner');

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    showError({
      title: 'Gagal Mendapatkan Data Banners',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const getWishlist = createAsyncThunk('buyer/getWishlist', async (id, {getState, rejectWithValue}) => {
  const state = getState();
  try {
    const response = await apiClient.get('buyer/wishlist', {
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
      title: 'Gagal Mendapatkan Data Wishlist',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const getWishlistById = createAsyncThunk('buyer/getWishlistById', async (id, {getState, rejectWithValue}) => {
  const state = getState();
  try {
    const response = await apiClient.get(`buyer/wishlist/${id}`, {
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
      title: 'Gagal Mendapatkan Data Wishlist By Id',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const postWishlist = createAsyncThunk('buyer/postWishlist', async (payload, {getState, rejectWithValue}) => {
  const state = getState();
  try {
    const response = await apiClient.post('buyer/wishlist', payload, {
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
      title: 'Gagal Menambahkan Data Wishlist',
      description: error.response?.data?.message,
    });

    return rejectWithValue(error.response.data);
  }
});

export const deleteWishlistById = createAsyncThunk(
  'buyer/deleteWishlistById',
  async (id, {getState, rejectWithValue}) => {
    const state = getState();
    try {
      const response = await apiClient.delete(`buyer/wishlist/${id}`, {
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
        title: 'Gagal Menghapus Data Wishlist By Id',
        description: error.response?.data?.message,
      });

      return rejectWithValue(error.response.data);
    }
  },
);
