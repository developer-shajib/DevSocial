'use client';

import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice.js';
import authReducer from '@/features/auth/authSlice.js';

// Create store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userState: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === 'development' ? true : false
});
