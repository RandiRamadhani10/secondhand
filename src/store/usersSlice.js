import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = {};
    },
    clearAllUserData: state => {
      state.user = {};
    },
  },
});

export const {setUser, clearUser, clearAllUserData} = userSlice.actions;

export default userSlice.reducer;
