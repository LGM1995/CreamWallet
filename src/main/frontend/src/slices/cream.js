import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import CreamService from "../service/cream.service"

export const createCream = createAsyncThunk(
  "cream/create",
  async ({ menu, date, temperature, state, username, token }, thunkAPI) => {
    try {
      const response = await CreamService.scoop( menu, date, temperature, state, username, token );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteCream = createAsyncThunk(
  "cream/delete",
  async ({id}, thunkAPI) => {
    try {
      const response = await CreamService.deleteCream(id);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


const initialState = {
  creams: [], cream: null
}

const creamSlice = createSlice({
  name: "cream",
  initialState,
  reducers: {
    getCreamList:(state, action) => {
      state.creams = action.payload;
    }
  },
  extraReducers: {
    [createCream.fulfilled]: (state, action) => {
    },
    [createCream.rejected]: (state, action) => {
    },
    [deleteCream.fulfilled]: (state, action) => {

    },
    [deleteCream.rejected]: (state, action) => {

    }
  },
});

const { reducer } = creamSlice;
export const {getCreamList, set} = creamSlice.actions;
export default reducer;
