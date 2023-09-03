import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create Api Slice
const apiSlice = createApi({
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev-social-s1li.onrender.com', credentials: 'include', withCredentials: true }),
  endpoints: (build) => ({})
});

export default apiSlice;
