import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createProductApi,
  deleteProductApi,
  fetchProductByIdApi,
  fetchProductsApi,
  updateProductApi,
} from '../services/productService';

const initialState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
  try {
    return await fetchProductsApi();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, thunkAPI) => {
  try {
    return await fetchProductByIdApi(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
  }
});

export const createProduct = createAsyncThunk('products/create', async (product, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await createProductApi({ token, product });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create product');
  }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, product }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await updateProductApi({ token, id, product });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update product');
  }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    await deleteProductApi({ token, id });
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.list = state.list.map((item) => (item._id === action.payload._id ? action.payload : item));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
