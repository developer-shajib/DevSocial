'use client';

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// <!-- auth slice -->
const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: {},
    users: [],
    posts: [],
    token: Cookies.get('accessToken') || null
  },
  reducers: {
    getUserData: (state, action) => {
      state.user = action.payload.user;
      state.users = action.payload.users;
      state.posts = action.payload.posts;
    },
    removeUserData: (state) => {
      state.user = {};
      state.users = [];
      state.posts = [];
      state.token = null;
    }
  }
});

// <!-- export selector -->
export const getAllAuthState = (state) => state.userState;

// <!-- export actions -->
export const { getUserData, removeUserData } = authSlice.actions;

// <!-- export reducer -->
export default authSlice.reducer;
