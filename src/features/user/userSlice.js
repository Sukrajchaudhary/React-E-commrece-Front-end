import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUserInfo,
} from "./userAPI";

const initialState = {
  userOrders: [],
  value: 0,
  status: "idle",
  userInfo: null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/  fetchLoggedInUserOrders",
  async (id) => {
    const response = await   fetchLoggedInUserOrders(id);
    return response.data;

  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (id) => {
    const response = await updateUser(id);
    return response.data;
  }
);
export const fetchLoggedInUserInfoAsync = createAsyncThunk(
  "user/fetchLoggedInUserInfo",
  async () => {
    const response = await fetchLoggedInUserInfo();
    return response.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserInfoAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;
export const selectOrders = (state) => state.user.userOrders;
export const selectLoginuserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
