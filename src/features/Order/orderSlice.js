import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder:false
};

export const placeOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    const response = await addOrder(order);
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
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectOrder = (state) => state.order.orders;
export const currentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
