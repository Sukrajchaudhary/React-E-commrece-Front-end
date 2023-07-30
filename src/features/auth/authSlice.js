import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser,signOut} from './authAPI';
import {updateUser} from '../user/userAPI'

const initialState = {
  loggedInuser:null,
  status: 'idle',
  error:null
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    
    return response. data;
   
  }
);

export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (logininfo) => {
    const response = await checkUser(logininfo);
    return response.data;
   
  }
);
export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
   
  }
);
export const signOutUserAsync = createAsyncThunk(
  'auth/signOut',
  async (userID) => {
    const response = await signOut(userID);
    return response.data;
   
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
   reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error= action.error;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = 'loading';
       
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser=action.payload;
       
      })
      // for signout
      .addCase(signOutUserAsync.pending, (state, action) => {
        state.status = 'loading';
       
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInuser=null;
       
      })
      
  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUsr = (state) => state.auth.loggedInuser;
export const selectErrors = (state) => state.auth.error;

export default authSlice.reducer;
