import { createSlice } from '@reduxjs/toolkit';

// <!-- auth slice -->
const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: {},
    users: [],
    posts: []
  },
  reducers: {
    getUserData: (state, action) => {
      state.user = action.payload.user;
      state.users = action.payload.users;
      state.posts = action.payload.posts;
    }
  }
});

// <!-- export selector -->
export const getAllAuthState = (state) => state.userState;

// <!-- export actions -->
export const { getUserData } = authSlice.actions;

// <!-- export reducer -->
export default authSlice.reducer;
