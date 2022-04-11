import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../app/store'
import { Product } from '../../types/product'
import { fetchProducts } from './productsAPI'

export interface ProductsState {
  products: Product[],
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
}

export const getProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const productsFromServer = await fetchProducts();
    return productsFromServer;
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products.push(...action.payload);
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'failed';
      })
  },
})

export const selectProducts = (state: AppState) => state.products.products;
export const selectHotPrices = (state: AppState) => state.products.products.filter(product => product.discount > 0);
export const selectBrandNew = (state: AppState) => state.products.products.filter(product => product.discount === 0);
export const selectPhonesCount = (state: AppState) => state.products.products.filter(product => product.type === 'phone').length;
export const selectTabletsCount = (state: AppState) => state.products.products.filter(product => product.type === 'tablet').length;

export default productsSlice.reducer;