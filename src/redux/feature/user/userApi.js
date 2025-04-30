import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://stockbackend-znbu.onrender.com',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        // register
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/api/users/register',
                method: 'POST',
                body: userData
            }),
        }),

        // login
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/api/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // logout
        logoutUser: builder.mutation({
            query: () => ({
                url: '/api/users/logout',
                method: 'POST'
            }),
        }),

        // get all users
        fetchUsers: builder.query({
            query: () => ({
                url: '/api/users/users',
                method: 'GET',
                credentials: 'include',
            }),
        }),

        // Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/users/users/${id}`,
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