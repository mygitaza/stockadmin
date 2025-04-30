// In your Redux slice or store (stockSlice.js)
import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    status: 'Processing', // Default status
  },
  reducers: {
    updateStockStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { updateStockStatus } = stockSlice.actions;
export default stockSlice.reducer;
