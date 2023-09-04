import apiSlice from '../apiSlice.js';

// Create inject endpoint api
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/v1/auth/logout',
        method: 'POST'
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: data
      })
    }),
    me: builder.query({
      query: () => '/api/v1/auth/me',
      providesTags: ['Me']
    }),
    registerVerifyToken: builder.query({
      query: (token) => `/api/v1/auth/verify/${token}`
    }),
    forgetPasswordRequest: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/forget',
        method: 'POST',
        body: data
      })
    }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/api/v1/auth/forget/${token}`,
        method: 'POST',
        body: data
      })
    })
  })
});

// export endpoints
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useMeQuery, useRegisterVerifyTokenQuery, useForgetPasswordRequestMutation, useResetPasswordMutation } = authApiSlice;
