import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create Api Slice
const apiSlice = createApi({
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5050', credentials: 'include' }),
  endpoints: (build) => ({})
});

export default apiSlice;
