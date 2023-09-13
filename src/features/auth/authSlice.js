import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  checkUser,
  signOut,
  resetPasswordRequest,
  resetPassword,
} from "./authAPI";
import { updateUser } from "../user/userAPI";

const initialState = {
  loggedInuserToken: null,
  status: "idle",
  error: null,
  mailsend: false,
  passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);

    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (logininfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(logininfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);
export const signOutUserAsync = createAsyncThunk(
  "auth/signOut",
  async (userID) => {
    const response = await signOut(userID);
    return response.data;
  }
);
export const resetPasswordRequestAsync = createAsyncThunk(
  "auth/resetPasswordRequest",
  async (email,{rejectWithValue}) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error)
    }
  }
);
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data,{rejectWithValue}) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = action.payload;
      })
      // for signout
      .addCase(signOutUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInuserToken = null;
      })
      .addCase(resetPasswordRequestAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailsend = true;
      })

      .addCase(resetPasswordAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.passwordReset = action.payload;
      });
  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUsr = (state) => state.auth.loggedInuserToken;
export const selectErrors = (state) => state.auth.error;
export const selectedmailsend = (state) => state.auth.mailsend;
export const selectePasswordReset = (state) => state.auth.passwordReset;

export default authSlice.reducer;
