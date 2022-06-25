import {createSlice} from '@reduxjs/toolkit';
import {authLogin, authRegister, authUser} from './actions/users';

const initialState = {
  users: {},
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
    [authUser.pending]: state => {
      return {...state, isLoading: true};
    },
    [authUser.fulfilled]: (state, action) => {
      return {
        ...state,
        users: Object.assign(state.users, action.payload),
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
  },
});

export const {clearUser} = userSlice.actions;

export default userSlice.reducer;
