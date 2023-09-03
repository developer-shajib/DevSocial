import apiSlice from '../apiSlice.js';

// Create inject endpoint api
const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `/api/v1/post`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Me']
    }),
    postUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/post/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Me']
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/v1/post/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Me']
    })
  })
});

// export endpoints
export const { useCreatePostMutation, usePostUpdateMutation,useDeletePostMutation } = postApiSlice;
