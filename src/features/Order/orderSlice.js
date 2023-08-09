import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder ,FetchAllOrders,updateOrder} from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder:false,
  totalOrders:0
};

export const placeOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);
export const FetchAllOrdersAsync = createAsyncThunk(
  "order/FetchAllOrders",
  async ({pagination,sort}) => {
    const response = await FetchAllOrders(pagination,sort);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder=action.payload
      })
      .addCase(FetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders=action.payload.order;
        state.totalOrders=action.payload.totalOrder;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index=state.orders.findIndex(order=>order.id==action.payload.id) ;
        state.orders[index]=action.payload
      })
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectOrder = (state) => state.order.orders;
export const currentOrder = (state) => state.order.currentOrder;
export const selectedTotalOrders = (state) => state.order.totalOrders;


export default orderSlice.reducer;
