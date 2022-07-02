import {createSlice} from '@reduxjs/toolkit';
import {getProduct, getProductById} from './actions/seller';

const initialState = {
  products: [],
  productDetail: {},
  isLoading: false,
  error: null,
};

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  extraReducers: {
    //   Get All Products
    [getProduct.pending]: state => {
      return {...state, isLoading: true};
    },
    [getProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    },
    [getProduct.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Get Product By ID
    [getProductById.pending]: state => {
      return {...state, isLoading: true};
    },
    [getProductById.fulfilled]: (state, action) => {
      return {
        ...state,
        productDetail: action.payload,
        isLoading: false,
      };
    },
    [getProductById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
  },
});

export default sellerSlice.reducer;
