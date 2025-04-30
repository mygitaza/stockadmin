import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    total: 0,
    status: 'Processing',
};

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setTotal: (state, action)=>{
            state.total = Number(action.payload);
        },
        resetTotal: (state)=>{
            state.total = 0
        },
        updateStockStatus: (state, action) => {
            state.status = action.payload;
          },
    }
})
export const { setTotal, resetTotal, updateStockStatus } = stockSlice.actions;
export default stockSlice.reducer;