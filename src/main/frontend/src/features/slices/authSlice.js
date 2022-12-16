import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../slices/message";

import AuthService from "../../service/auth.service";

const username = localStorage.getItem("username");
const jwtToken = localStorage.getItem("Authorization");

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, name, email }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, password, name, email);
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("Authorization", "Bearer " + response.headers.get("authorization"))
      // 헤더에 담긴 쿠키 값을 localStorage에 저장한다.
      localStorage.setItem("username", response.data.username);
      // store는 새로고침 하면 초기화 되는 속성이 있기 때문에 로그인을 유지하기 위한 기본 username과 isLoggedIn 상태를
      // localStroage에 저장한다.
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      // 에러 메시지를 store에 저장 후 사용
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = username ? {
  // 초기 값을 정의한다. ex) value: 0,
  isLoggedIn: true,
  username,
  jwtToken,
} : {
  isLoggedIn: false,
  username: null,
  id: null,
  name: null,
  email: null,
  authorityDtoSet: [],
  jwtToken: null
};

const authSlice = createSlice({
  name: "auth", // slice를 식별하기 위한 이름
  initialState, // 슬라이스 state의 초기값
  reducers: {
    // state에 적용시킬 함수들을 정의 redux-toolkit의 튜토리얼을 읽어보면 해당 상태에 대한 변경은 immer 라이브러리를 포함하고 있기 때문에
    // 불변성을 지킨다고 한다. 내가 이해한 불변성을 지키는 이유는 react에서 상태 변화를 얕은 비교로 판단하고 리렌더링 과정이 일어나기 때문이다.
    // state의 변화를 줄 때 직접적인 공간의 value를 바꾸는 것이 아닌 새로운 공간의 데이터를 저장하고 참조값을 바꾸는 것으로 동작하여 state의 변경을
    // 추적한다. 따라서 원시 타입이 아닌 참조 타입의 경우에는 새로운 객체나 배열을 생성한 후 값을 넣어줘야 한다.
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.name = null;
      state.id = null;
      state.email = null;
      state.authorityDtoSet = [];
      state.jwtToken = null;
    }
  },
  extraReducers: {
    // 비동기 로직들을 정의 한다 fulfilled는 성공, rejected는 실패 시 로직을 정의
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.authorityDtoSet = action.payload.authorityDtoSet;
      state.jwtToken = localStorage.getItem("Authorization");
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
