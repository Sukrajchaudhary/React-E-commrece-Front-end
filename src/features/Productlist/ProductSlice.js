import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllproducts, fetchProuctsByFilters,updateProduct, fetchAllCategories,createProduct, fetchAllbrands,fetchProductBYId } from './ProductAPI';

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
  async ({ filter, sort, pagination ,admin}) => {
    const response = await fetchProuctsByFilters(filter, sort, pagination,admin);
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
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct=null
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
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.products.findIndex(item=>item.id==action.payload.id)
        state.products[index]=action.payload;
      })
      ;
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selecCategories = (state) => state.product.Categories;
export const selecbrand = (state) => state.product.brands;
export const selecteProductbyID = (state) => state.product.selectedProduct;
export const selecteProductListStatus = (state) => state.product.status;
export default productSlice.reducer;
