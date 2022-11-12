import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import creamReducer from "./slices/cream";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  cream: creamReducer
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});