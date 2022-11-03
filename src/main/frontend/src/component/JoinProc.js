import styles from "./JoinProc.module.css";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function JoinProc () {
    function SignIn() {
    //     const [UserName, SetUserName] = useState("");
    //     const [Password, SetPassword] = useState("");
    //     const [Email, SetEmail] = useState("");
    //     const [Name, SetName] = useState("");
    //     const [Phone, SetPhone] = useState("");
    //
    //     const userNameHandler = (e) => {
    //         e.preventDefault();
    //         SetUserName(e.target.value);
    //     }
    //
    //     const passwordHandler = (e) => {
    //         e.preventDefault();
    //         SetPassword(e.target.value);
    //     }
    //
    //     const nameHandler = (e) => {
    //         e.preventDefault();
    //         SetName(e.target.value);
    //     }
    //
    //     const emailHandler = (e) => {
    //         e.preventDefault();
    //         SetEmail(e.target.value);
    //     }
    //
    //     const phoneHandler = (e) => {
    //         e.preventDefault();
    //         SetName(e.target.value);
    //     }
    //
    //     useEffect(() => {
    //         axios.post("http://localhost:8080/api/signup", {
    //             username: UserName,
    //             password: Password,
    //             email: Email,
    //             name: Name,
    //             phone: Phone
    //         }).then(function (response) {
    //             if (response.data.code == 0) {
    //                 set
    //             }
    //         })
    //     })
    }

    return (
        <div className={styles.container}>
            <div className={styles.signup}>Sign Up</div>
            <form className={styles.formContainer} >
                <input type="text" placeholder="ID" >
                </input>
                <input type="password" placeholder="PW">
                </input>
                <input type="text" placeholder="NAME">
                </input>
                <input type="text" placeholder="PHONE">
                </input>
                <input type="email" placeholder="EMAIL">
                </input>
                <button type="submit" className={styles.button} >
                    Scoop
                </button>
            </form>
            <div className={styles.back} >
                <Link to="/">back</Link>
            </div>
        </div>
    )
}