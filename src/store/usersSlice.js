import {createSlice} from '@reduxjs/toolkit';
import {authChangePassword, authLogin, authRegister, authUser, putAuthUser} from './actions/users';

const initialState = {
  users: {},
  profile: {},
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: state => {
      state.users = {};
    },
  },
  extraReducers: {
    [authRegister.pending]: state => {
      return {...state, isLoading: true};
    },
    [authRegister.fulfilled]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [authRegister.rejected]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [authLogin.pending]: state => {
      return {...state, isLoading: true};
    },
    [authLogin.fulfilled]: (state, action) => {
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    },
    [authLogin.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Get Profile
    [authUser.pending]: state => {
      return {...state, isLoading: true};
    },
    [authUser.fulfilled]: (state, action) => {
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    },
    [authUser.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    // Change Password
    [authChangePassword.pending]: state => {
      return {...state, isLoading: true};
    },
    [authChangePassword.fulfilled]: state => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [authChangePassword.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },

    [putAuthUser.pending]: state => {
      return {...state, isLoading: true};
    },
    [putAuthUser.fulfilled]: (state, action) => {
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    },
    [putAuthUser.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
  },
});

export const {clearUser} = userSlice.actions;

export default userSlice.reducer;
