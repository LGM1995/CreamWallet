import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../slices/message";

import CreamService from "../../service/cream.service"

export const createCream = createAsyncThunk(
  "cream/create",
  async ({ username, menu, date, temperature, state }, thunkAPI) => {
    try {
      const response = await CreamService.scoop( username, menu, date, temperature, state );
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

export const updateCream = createAsyncThunk(
  "cream/update",
  async ({ id, menu, date, temperature, state }, thunkAPI) => {
    try {
      const response = await CreamService.updateCream( id, menu, date, temperature, state );
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
  creams: [],
  // 받아올 가계부 리스트를 creams로 배열에 담는다.
  // yearList: [],
  // // 사용자가 등록한 가계부들의 년도 목록
  // year: new Date().getFullYear(),
  // // 화면에 로드할 기본 년도는 현재 년도를 기본값으로 한다.
  // ice: "",
  // // 수입
  // hot: "",
  // // 지출
  // sum: ""
  // // 계
}

const creamSlice = createSlice({
  name: "cream",
  initialState,
  reducers: {
    getCreamList:(state, action) => {
      state.creams = action.payload;
    },
    setYearList:(state, action) => {
      state.yearList = action.payload;
    },
    setYear:(state, action) => {
      state.year = action.payload;
    },
    setCost:(state, action) => {
      state.ice = action.payload.ice;
      state.hot = action.payload.hot;
      state.sum = action.payload.ice - action.payload.hot;
    }
  },
  extraReducers: {
    [createCream.fulfilled]: (state, action) => {
      state.creams.push(action.payload);
      // if(action.payload.state == 0 ) {
      //   state.ice += action.payload.temperature;
      //   state.sum += action.payload.temperature;
      // } else if (action.payload.state == 1) {
      //   state.hot += action.payload.temperature;
      //   state.sum -= action.payload.temperature;
      // }
    },
    [createCream.rejected]: (state, action) => {
    },
    [deleteCream.fulfilled]: (state, action) => {
      // state.creams.filter((item) => item.id !== action.payload.id);
      window.location.reload();
    },
    [deleteCream.rejected]: (state, action) => {

    },
    [updateCream.fulfilled]: (state, action) => {
      window.location.reload();
    },
    [updateCream.rejected]: (state, action) => {

    }
  },
});

export const {getCreamList} = creamSlice.actions;
export default creamSlice.reducer;
