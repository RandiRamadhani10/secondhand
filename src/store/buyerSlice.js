import {createSlice} from '@reduxjs/toolkit';
import {
  getProduct,
  getProductById,
  bidProduct,
  getAllBidProducts,
  getCategory,
  getBidProductById,
  getBanners,
} from './actions/buyer';

const initialState = {
  products: [],
  productDetail: {},
  bidProducts: [],
  bidProductDetail: {},
  category: [],
  banners: [],
  isLoading: false,
  isLoadingBid: false,
  error: null,
};

export const buyerSlice = createSlice({
  name: 'buyer',
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

    // Get Category
    [getCategory.pending]: state => {
      return {...state, isLoading: true};
    },
    [getCategory.fulfilled]: (state, action) => {
      return {
        ...state,
        category: action.payload,
        isLoading: false,
      };
    },
    [getCategory.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Bid Product
    [bidProduct.pending]: state => {
      return {...state, isLoadingBid: true};
    },
    [bidProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        bidProductDetail: action.payload,
        isLoadingBid: false,
      };
    },
    [bidProduct.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoadingBid: false,
      };
    },

    // Get All Bid Product
    [getAllBidProducts.pending]: state => {
      return {...state, isLoadingBid: true};
    },
    [getAllBidProducts.fulfilled]: (state, action) => {
      return {
        ...state,
        bidProducts: action.payload,
        isLoadingBid: false,
      };
    },
    [getAllBidProducts.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoadingBid: false,
      };
    },

    // Get Bid Product By Id
    [getBidProductById.pending]: state => {
      return {...state, isLoadingBid: true};
    },
    [getBidProductById.fulfilled]: (state, action) => {
      return {
        ...state,
        bidProductDetail: action.payload,
        isLoadingBid: false,
      };
    },
    [getBidProductById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoadingBid: false,
      };
    },

    // Get Banners
    [getBanners.pending]: state => {
      return {...state, isLoading: true};
    },
    [getBanners.fulfilled]: (state, action) => {
      return {
        ...state,
        banners: action.payload,
        isLoading: false,
      };
    },
    [getBanners.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
  },
});

export default buyerSlice.reducer;
