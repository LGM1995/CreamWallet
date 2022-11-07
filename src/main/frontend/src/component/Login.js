import styles from "./Login.module.css";
import {Link, Router, useHistory} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {createStore} from "redux";
import {Provider, useSelector, useDispatch} from "react-redux";
import store from '../store';
import {up} from '../slice/counterSlice';
import {asyncUpFetch} from '../slice/counterSlice'


function Counter() {
    const dispatch = useDispatch();
    const count = useSelector(state => {
      return state.counter.value;
    });
    const status = useSelector(state => {
      return state.counter.status;
    });
    return <div>
        <button onClick={() => {
          dispatch(up(2));
        }}>+</button>

      <button onClick={() => {
      dispatch(asyncUpFetch());
      }}>+ async fetch</button><br/>
      <div>{count} | {status}</div>
    </div>
}


export default function Login () {
    let history = useHistory();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const SignIn = async () => {
        let res = null;

        try {
            res = await axios.post('/api/authenticate', {
                username: user.username,
                password: user.password,
            });
        } catch (err) {
            res = null;
        }

        if (res !== undefined) {
            // const token = res.headers.authorization;
            const jwtToken = res.data.token;
            localStorage.setItem("Authorization", jwtToken);
            localStorage.setItem("username", user.username);
            // localStorage.setItem("username", username);
            history.push("/main");
        }

        return res;
    }
    /*
    function SignIn() {
        let history = useHistory();

        axios({
            url: '/api/authenticate',
            method: 'post',
            data: {
                username: user.username,
                password: user.password,
            }
        }).then((response) => {
            let jwtToken = response.headers.get("Authorization");
            localStorage.setItem("Authorization", jwtToken);
            // setAuthorizationToken(jwtToken);
            // history.push('/main');
            if (!jwtToken) {
                history.push("/main");
            }
        });
    }
     */

    return (
      <Provider store={store}>
        <div className={styles.container}>
            <div className={styles.logo}>Cream Wallet</div>
            <div className={styles.imgContainer}>
                <img src="/img/Cream.png" alt='logo image' />
            </div>
            <form className={styles.formContainer}>
                <input name="username" value={user.username} type="text" className={styles} placeholder="ID"
                onChange={handleChange} >
                </input>
                <input name="password" value={user.password} type="password" placeholder="PW"
                onChange={handleChange} >
                </input>
            </form>
            <button type="submit" className={styles.button} onClick={SignIn}>
                Login
            </button>
            <div className={styles.linkContainer} >
                <Link to="/joinproc">Sign Up</Link>
            </div>

              <div>
                <Counter></Counter>
              </div>
        </div>
      </Provider>
    )
}