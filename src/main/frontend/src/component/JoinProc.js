import styles from "./JoinProc.module.css";
import {Link} from "react-router-dom";

export default function JoinProc () {
    function SignIn() {
        console.log("로긴");
    }

    return (
        <div className={styles.container}>
            <div className={styles.signup}>Sign Up</div>
            <form className={styles.formContainer}>
                <input type="text" placeholder="ID">
                </input>
                <input type="password" placeholder="PW">
                </input>
                <input type="text" placeholder="NAME">
                </input>
                <input type="text" placeholder="PHONE">
                </input>
                <input type="email" placeholder="EMAIL">
                </input>
                <button className={styles.button} onClick={SignIn}>
                    Scoop
                </button>
            </form>
            <div className={styles.back} >
                <Link to="/">back</Link>
            </div>
        </div>
    )
}