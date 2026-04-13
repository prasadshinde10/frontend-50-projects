import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrderApi, getAllOrdersApi, getMyOrdersApi, getUsersApi } from '../services/orderService';

const initialState = {
  myOrders: [],
  allOrders: [],
  adminUsers: [],
  latestOrder: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk('orders/create', async (order, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await createOrderApi({ token, order });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create order');
  }
});

export const fetchMyOrders = createAsyncThunk('orders/my', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await getMyOrdersApi(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

export const fetchAllOrders = createAsyncThunk('orders/all', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await getAllOrdersApi(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch admin orders');
  }
});

export const fetchAdminUsers = createAsyncThunk('orders/adminUsers', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await getUsersApi(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearLatestOrder: (state) => {
      state.latestOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.latestOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.adminUsers = action.payload;
      });
  },
});

export const { clearLatestOrder } = orderSlice.actions;
export default orderSlice.reducer;
