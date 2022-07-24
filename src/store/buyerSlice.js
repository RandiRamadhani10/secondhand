import {createSlice} from '@reduxjs/toolkit';
import {
  getProduct,
  getProductById,
  bidProduct,
  getAllBidProducts,
  getCategory,
  getBidProductById,
  getBanners,
  getWishlist,
  getWishlistById,
  postWishlist,
  deleteWishlistById,
  getHistory,
  getHistoryById,
} from './actions/buyer';

const initialState = {
  products: [],
  productDetail: {},
  bidProducts: [],
  bidProductDetail: {},
  category: [],
  banners: [],
  wishlist: [],
  wishlistDetail: {},
  history: [],
  historyDetail: [],
  isLoading: false,
  isLoadingBid: false,
  isLoadingWishlist: false,
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

    // Get Wishlist
    [getWishlist.pending]: state => {
      return {...state, isLoadingWishlist: true};
    },
    [getWishlist.fulfilled]: (state, action) => {
      return {
        ...state,
        wishlist: action.payload,
        isLoadingWishlist: false,
      };
    },
    [getWishlist.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoadingWishlist: false,
      };
    },

    // Get Wishlist By Id
    [getWishlistById.pending]: state => {
      return {...state, isLoadingWishlist: true};
    },
    [getWishlistById.fulfilled]: (state, action) => {
      return {
        ...state,
        wishlistDetail: action.payload,
        isLoadingWishlist: false,
      };
    },
    [getWishlistById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoadingWishlist: false,
      };
    },

    // Post Wishlist
    [postWishlist.pending]: state => {
      return {...state, isLoadingWishlist: true};
    },
    [postWishlist.fulfilled]: state => {
      return {
        ...state,
        isLoadingWishlist: false,
      };
    },
    [postWishlist.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoadingWishlist: false,
      };
    },

    // Delete Wishlist
    [deleteWishlistById.pending]: state => {
      return {...state, isLoadingWishlist: true};
    },
    [deleteWishlistById.fulfilled]: state => {
      return {
        ...state,
        isLoadingWishlist: false,
      };
    },
    [deleteWishlistById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoadingWishlist: false,
      };
    },

    //   Get All History
    [getHistory.pending]: state => {
      return {...state, isLoading: true};
    },
    [getHistory.fulfilled]: (state, action) => {
      return {
        ...state,
        history: action.payload,
        isLoading: false,
      };
    },
    [getHistory.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    //   Get History By Id
    [getHistoryById.pending]: state => {
      return {...state, isLoading: true};
    },
    [getHistoryById.fulfilled]: (state, action) => {
      return {
        ...state,
        historyDetail: action.payload,
        isLoading: false,
      };
    },
    [getHistoryById.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
  },
});

export default buyerSlice.reducer;
