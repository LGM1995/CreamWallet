import {combineReducers, configureStore} from '@reduxjs/toolkit' // Redux 스토어 생성
import authReducer from "../features/slices/authSlice";
import messageReducer from "../slices/message";
import creamReducer from "../features/slices/creamSlice";
import costReducer from "../slices/cost";
import yearListReducer from "../slices/yearList";

const reducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  cream: creamReducer,
  cost: costReducer,
  yearList: yearListReducer,
});

export const store = configureStore({
  reducer : reducers,
  // devTools: true, redux-toolkit은 기본적으로 DevTolls확장을 내장 구성하고 있어 크롬이나, 파이어 폭스 등의 개발자 도구에서 React Component Tree를 검사 할 수 있다.
});

export default store;