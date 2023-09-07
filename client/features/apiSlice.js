import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create Api Slice
const apiSlice = createApi({
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({
    baseUrl: ' https://dev-social-s1li.onrender.com',
    // 'http://localhost:5050',
    //
    credentials: 'include',
    withCredentials: true
  }),
  endpoints: (build) => ({})
});

export default apiSlice;
