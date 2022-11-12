import React, {useEffect, useState} from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CreamService from "../service/cream.service";
import axios from "axios";
import {clearMessage} from "../slices/message";
import {getC} from "../slices/cream";


const Cream = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { user_id } = useSelector((state) => state.auth);
  const { creams } = useSelector((state) => state.cream)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = (await (CreamService.getCreams(
        localStorage.getItem("user"),
        localStorage.getItem("Authorization")
      ))).data
      // setWallet(res)
      dispatch(getC(res))
    })();
  }, [])

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  function won(num) {
    return num.toLocaleString('ko-KR');
  }


  function time(t) {
    let tt = new Date(t);
    return tt.getFullYear() + "-" + (tt.getMonth() + 1) + "-" + tt.getDate();
  }


  function List() {
    const re = [...creams]
    return (re.sort((a,b) => new Date(a.date) - new Date(b.date)).map(item => (
      <div key={item.id}>
        <p>{item.menu} {time(item.date)} {item.state} {won(item.temperature)}</p>
        <button>수정</button>
        <button>삭제</button>
      </div>
    )))
  }

  function Create() {
    return (
      <div>
        <input type="text" />메뉴
        <input type="text" />날짜
        <input type="text" />가격
        <input type="text" />상태
        <button>생성</button>
        <button>취소</button>
      </div>
    )
  }

  return (
    <div>
        <div>hello</div>
        <List></List>
      <Create></Create>
    </div>
  );
};


export default Cream;
