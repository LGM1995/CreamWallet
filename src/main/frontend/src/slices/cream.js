import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import CreamService from "../service/cream.service"

const user = localStorage.getItem("user");
const user_id = localStorage.getItem("user_id");

export const create = createAsyncThunk(
  "cream/create",
  async ({ menu, date, temperature, state, user_id, username }, thunkAPI) => {
    try {
      const response = await CreamService.scoop( menu, date, temperature, state, user_id, username );
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

export const getTT = createAsyncThunk(
  "cream/list",
  async ({username , token}, thunkAPI) => {
    try {
      const response = await CreamService.getCreams( username , token);
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
    getC:(state, action) => {
      state.creams = action.payload;
    }
  },
  extraReducers: {
    [create.fulfilled]: (state, action) => {
    },
    [create.rejected]: (state, action) => {
    },
    [getTT.fulfilled]: (state, action) => {
      state.creams = action.payload;
    },
    [getTT.rejected]: (state, action) => {

    }
  },
});

const { reducer } = creamSlice;
export const {getC, set} = creamSlice.actions;
export default reducer;
