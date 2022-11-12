import React, {useEffect, useState} from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserService from "../service/user.service";
import axios from "axios";

const Cream = () => {
  const [wallet, setWallet] = useState([]);
  // const [year, setYear] = useState();
  // const [month, setMonth] = useState();
  // const [day, setDay] = useState();

  useEffect(() => {
    (async () => {
      const res = (await (UserService.getCreams(
        localStorage.getItem("user"),
        localStorage.getItem("Authorization")
      ))).data
      setWallet(res)
    })();
  }, [])

  function won(num) {
    return num.toLocaleString('ko-KR');
  }


  function time(t) {
    let tt = new Date(t);
    return tt.getFullYear() + "-" + (tt.getMonth() + 1) + "-" + tt.getDate();
  }


  function List() {
    return (wallet.map(cream => (
      <div key={cream.id}>
        <p>{cream.menu} {time(cream.date)} {cream.state} {won(cream.temperature)}</p>
        <button>수정</button>
        <button>삭제</button>
      </div>
    )))
  }

  const rr = wallet.sort((a,b) => new Date(a.date) - new Date(b.date))
console.log(rr)

  return (
    <div>
        <div>hello</div>
        <List></List>
    </div>
  );
};


export default Cream;
