import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./app/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> 해당코드는 개발 모드에서 두번 렌더링 과정을 거치는 검증으로 개발이 끝나고 나면 지워준다.
    <Provider store={store}>  {/* 프로바이더를 App위로 감싸 App에게 store(저장소)를 사용할 수 있도록 전달한다. */}
      <App />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
