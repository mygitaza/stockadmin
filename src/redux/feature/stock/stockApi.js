import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stockApi = createApi({
    reducerPath: 'stockApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://stockbackend-znbu.onrender.com',
        credentials: 'include',
    }),
    tagTypes: ['stock'],
    endpoints: (builder)=> ({
        addStock: builder.mutation({
            query: ({userId, units}) => ({
                url: '/api/stock/add',
                method: 'POST',
                body: { userId, units},
            }),
            invalidatesTags: ['stock'],
        }),
        getUserStocks: builder.query({
            query: (userId) => `/api/stock/user/${userId}`,
            providesTags: ['stock'],
    }),
    approveStock: builder.mutation({
        query: ({userId, stockId})=>({
            url: `/api/stock/approve/${userId}/${stockId}`,
            method: 'PUT',
        }),
        invalidatesTags: ['stock'],
    }),
    deleteStock: builder.mutation({
        query: ({ userId, stockId }) => ({
            url: `/api/stock/delete/${userId}/${stockId}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['stock'],
    }),
    getAllStockUnits: builder.query({
        query: () => '/api/stock/all',
        providesTags: ['stock'],
    }),
    }),
});

export const {
    useAddStockMutation,
    useGetUserStocksQuery,
    useApproveStockMutation,
    useDeleteStockMutation,
    useGetAllStockUnitsQuery,
} = stockApi

export default stockApi;