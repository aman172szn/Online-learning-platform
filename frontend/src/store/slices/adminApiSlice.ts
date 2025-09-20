import { apiSlice } from "./apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    promoteUser: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/users/${userId}/promote`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    demoteUser: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/users/${userId}/demote`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePromoteUserMutation,
  useDemoteUserMutation,
} = adminApiSlice;
