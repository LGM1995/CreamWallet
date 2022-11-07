import World from "./World";
import styles from "./Hello.module.css";
import {useState} from "react";
import UserName from "./UserName";
import {Link} from "react-router-dom";

export default function Hello() {
    function showName() {
        console.log("LEE");
    }
    function showAge(age) {
        console.log(age);
    }
    function showText(e) {
        console.log(e.target.value);
    }
    // let name = "KIM"; // 변하기 용이한 변수 선언시 let 사용
    const [name, setName] = useState("KIM");

    // function changeName() {
        // name = name === "KIM" ? "LEE" : "KIM";
        // console.log(name);
        // 위의 코드만으로는 let은 단순히 변수이기 때문에 console에서는 변하지만 UI는 업데이트 되지 않는다.
        // 1. setName(name === "KIM" ? "LEE" : "KIM");
    // }

  return (
      <> {/* 빈 태그는 div와 같다. */}
          <h1 style={{
                  color : '#f00',
                  borderRight : '2px soild #000',
                  marginBottom : '30px',
                  opacity : 0.5, // 숫자인 경우 '' 생략가능
              }}
          >Hello</h1>
          <World/> {/*컴포넌트 안에 컴포넌트 구성이 가능 */}
          <div className={styles.box}>Box</div>
          <button onClick={showName}>Show name</button>
          <button
          onClick={() => {
              showAge(10);
          }}>Show age</button> {/* 함수를 인라인에 넣는건 가독성이 좋지 않다.*/}
          <input type="text" onChange={showText}/> {/* onChange 를 사용하여 텍스트가 입력 될 때마다 console에 출력*/}

          <h2>{name}</h2>
          <UserName name={name}/> {/* 여기서 UserName의 name은 UserName 컴포넌트의 name이다.*/}
          {/*<button onClick={changeName}>Change</button> /!* 1번 방식*!/*/}
          <button onClick={() => {
              setName(name === "KIM" ? "LEE" : "KIM");
          }}>Change</button>

          <Link to="/welcome">welcome</Link>
      </>
  );
}
