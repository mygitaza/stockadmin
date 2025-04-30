import { configureStore } from '@reduxjs/toolkit';
import userApi from './feature/user/userApi';
import { stockApi } from './feature/stock/stockApi';
import authReducer from './feature/slice/authSlice'


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(userApi.middleware, stockApi.middleware),
});