import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create Api Slice
const apiSlice = createApi({
  tagTypes: ['Me'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL, credentials: 'include' }),
  endpoints: (build) => ({})
});

export default apiSlice;
