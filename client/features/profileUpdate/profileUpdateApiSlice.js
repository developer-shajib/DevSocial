import apiSlice from '../apiSlice.js';

// Create inject endpoint api
const profileUpdateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profileUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/user/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Me']
    })
  })
});

// export endpoints
export const { useProfileUpdateMutation } = profileUpdateApiSlice;
