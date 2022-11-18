import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import creamReducer from "./slices/cream";
import costReducer from "./slices/cost";
import yearListReducer from "./slices/yearList";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  cream: creamReducer,
  cost: costReducer,
  yearList: yearListReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});