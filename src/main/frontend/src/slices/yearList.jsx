import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  yearList: [],
  year: new Date().getFullYear(),
  }
;

const yearListSlice = createSlice({
  name: "yearList",
  initialState,
  reducers: {
    setYearList: (state, action) => {
      state.yearList = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

const { reducer, actions } = yearListSlice;

export const { setYearList, setYear } = actions;
export default reducer;