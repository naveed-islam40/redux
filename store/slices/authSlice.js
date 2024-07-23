
"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const signUp = createAsyncThunk("auth/signup", async (data) => {
  try {
    console.log(data);
    const response = await axios.post("http://localhost:3001/api/v1/signup", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

export const signIn = createAsyncThunk("auth/signin", async (data) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/signin", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});


export const { clearError } = authSlice.actions;
export default authSlice.reducer;
