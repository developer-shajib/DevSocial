import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create Api Slice
const apiSlice = createApi({
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev-social-s1li.onrender.com', credentials: 'include' }),
  endpoints: (build) => ({})
});

export default apiSlice;
