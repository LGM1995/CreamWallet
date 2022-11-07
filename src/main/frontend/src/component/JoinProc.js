import styles from "./JoinProc.module.css";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import redirect from "react-router-dom/es/Redirect";

export default function JoinProc () {
        const [newUser, setNewUser] = useState({
            username: "",
            password: "",
            email: "",
            name: "",
        });

        const handleChange = (e) => {
            setNewUser({
                ...newUser,
                [e.target.name]: e.target.value
            });
        };
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
    //         }).then(function (response) {
    //             if (response.data.code == 0) {
    //                 set
    //             }
    //         })
    //     })
        function SignUp() {
            axios({
                url: '/api/signup',
                method: 'post',
                data: {
                    username: newUser.username,
                    password: newUser.password,
                    name: newUser.name,
                    email: newUser.email,
                }
            }).then((response) => {
                return null;
            })
        }


    return (
        <div className={styles.container}>
            <div className={styles.signup}>Sign Up</div>
            <form className={styles.formContainer} >
                <input name="username" type="text" placeholder="ID" value={newUser.username} onChange={handleChange}>
                </input>
                <input name="password" type="password" placeholder="PW" value={newUser.password} onChange={handleChange}>
                </input>
                <input name="name" type="text" placeholder="NAME" value={newUser.name} onChange={handleChange}>
                </input>
                <input name="email" type="email" placeholder="EMAIL" value={newUser.email} onChange={handleChange}>
                </input>
                <button type="submit" className={styles.button} onClick={SignUp}>
                    Scoop
                </button>
            </form>
            <div className={styles.back} >
                <Link to="/">back</Link>
            </div>
        </div>
    )
}
