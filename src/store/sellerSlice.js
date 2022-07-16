import {createSlice} from '@reduxjs/toolkit';
import {
  getDetailOrderProductById,
  getOrder,
  getOrderById,
  getProduct,
  patchOrderById,
  deleteProductById,
  getProductById,
  postProduct,
  putProductById,
} from './actions/seller';

const initialState = {
  products: [],
  productDetail: {},
  bidProducts: [],
  bidProductDetail: {},
  bidProductOrderDetail: {},
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

    // Get All Bid Product
    [getOrder.pending]: state => {
      return {...state, isLoading: true};
    },
    [getOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        bidProducts: action.payload,
        isLoading: false,
      };
    },
    [getOrder.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Get Bid Product By ID
    [getOrderById.pending]: state => {
      return {...state, isLoading: true};
    },
    [getOrderById.fulfilled]: (state, action) => {
      return {
        ...state,
        bidProductDetail: action.payload,
        isLoading: false,
      };
    },
    [getOrderById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Get Detail Bid Product Detail By ID
    [getDetailOrderProductById.pending]: state => {
      return {...state, isLoading: true};
    },
    [getDetailOrderProductById.fulfilled]: (state, action) => {
      return {
        ...state,
        bidProductOrderDetail: action.payload,
        isLoading: false,
      };
    },
    [getDetailOrderProductById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Patch Order Product By ID
    [patchOrderById.pending]: state => {
      return {...state, isLoading: true};
    },
    [patchOrderById.fulfilled]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [patchOrderById.rejected]: (state, action) => {
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
    [getProductById.fulfilled]: state => {
      return {
        ...state,
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

    // Post Product
    [postProduct.pending]: state => {
      return {...state, isLoading: true};
    },
    [postProduct.fulfilled]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [postProduct.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Put Product By Id
    [putProductById.pending]: state => {
      return {...state, isLoading: true};
    },
    [putProductById.fulfilled]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [putProductById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Delete Product By ID
    [deleteProductById.pending]: state => {
      return {...state, isLoading: true};
    },
    [deleteProductById.fulfilled]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [deleteProductById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
  },
});

export default sellerSlice.reducer;
