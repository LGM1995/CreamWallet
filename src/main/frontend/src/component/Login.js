import styles from "./Login.module.css";
import {Link} from "react-router-dom";

export default function Login () {
    function SignIn() {
        console.log("로긴");
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>Cream Wallet</div>
            <div className={styles.imgContainer}>
                <img src="/img/Cream.png" alt='logo image' />
            </div>
            <form className={styles.formContainer}>
                <input type="text" className={styles} placeholder="ID">
                </input>
                <input type="password" placeholder="PW">
                </input>
                <button className={styles.button} onClick={SignIn}>
                    Login
                </button>
            </form>
            <div className={styles.linkContainer} >
                <Link to="/joinproc">Sign Up</Link>
            </div>
        </div>
    )
}