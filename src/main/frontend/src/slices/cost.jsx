import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ice: "",
  hot: "",
  sum: ""
};

const costSlice = createSlice({
  name: "cost",
  initialState,
  reducers: {
    setCost:(state, action) => {
      state.cost = action.payload;
    },
  },
});

const { reducer, actions } = costSlice;

export const { setCost } = actions
export default reducer;