import apiSlice from '../apiSlice.js';

// Create inject endpoint api
const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: `/api/v1/comment`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Me']
    })
  })
});

// export endpoints
export const { useCreateCommentMutation } = commentApiSlice;
