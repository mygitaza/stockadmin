import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/users',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        // register
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            }),
        }),

        // login
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // logout
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            }),
        }),

        // get all users
        fetchUsers: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
                credentials: 'include',
            }),
        }),

        // Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useFetchUsersQuery,
    useDeleteUserMutation,
} = userApi

export default userApi;