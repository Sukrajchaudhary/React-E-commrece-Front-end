import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllproducts, fetchProuctsByFilters, fetchAllCategories, fetchAllbrands,fetchProductBYId } from '../Productlist/ProductAPI';

const initialState = {
  products: [],
  totalItems: 0,
  brands: [],
  Categories: [],
  selectedProduct:null,
  status: 'idle',
};

export const fetchAllproductsAsync = createAsyncThunk(
  'product/fetchAllproducts',
  async () => {
    const response = await fetchAllproducts();
    return response.data;
  }
);
export const fetchProductbyIdAsync = createAsyncThunk(
  'product/fetchProductBYId',
  async (id) => {
    const response = await fetchProductBYId(id);
    return response.data;
  }
);


export const fetchProuctsByFiltersAsync = createAsyncThunk(
  'product/fetchProuctsByFilters',
  async ({ filter, sort, pagination }) => {
    const response = await fetchProuctsByFilters(filter, sort, pagination);
    return response.data;
  }
);

export const fetchProuctByCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);
export const fetchProuctByBrandAsync = createAsyncThunk(
  'product/fetchAllbrands',
  async () => {
    const response = await fetchAllbrands();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllproductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllproductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProuctsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProuctsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProuctByCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProuctByCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Categories = action.payload;
      })
      .addCase(fetchProuctByBrandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProuctByBrandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands= action.payload;
      })
      .addCase(fetchProductbyIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductbyIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct= action.payload;
      })
      ;
  },
});

export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selecCategories = (state) => state.product.Categories;
export const selecbrand = (state) => state.product.brands;
export const selecteProductbyID = (state) => state.product.selectedProduct;
export default productSlice.reducer;
