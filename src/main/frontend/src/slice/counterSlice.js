import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const asyncUpFetch = createAsyncThunk(
  'counterSlice/asyncUpFetch',
  async () => {
    const resp = await axios.get('/api/hello')
    const data = await  resp.data;
    console.log(data);
    return data;
  }
)

const counterSlice = createSlice({
  name:'counterSlice',
  initialState:{
    value:0,
    status:'Welcome'
  },
  reducers:{
    up:(state, action)=>{
      state.value = state.value + action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = 'complete';
    })
    builder.addCase(asyncUpFetch.rejected, (state, action) => {
      state.status = 'fail';
    })
  }
});
export default counterSlice;
export const {up, set} = counterSlice.actions;
export {asyncUpFetch}