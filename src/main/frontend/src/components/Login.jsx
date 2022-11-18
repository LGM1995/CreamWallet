import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css"

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("아이디를 입력해 주세요!"),
    password: Yup.string().required("패스워드를 입력해 주세요!"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/cream");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/cream" />;
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.logo_font}>Cream<br/>Wallet</div>
      <img src="/img/Cream.png" className={styles.logo_img}/>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.form_group}>
              <Field
                name="username"
                type="text"
                placeholder="ID"
              />
              <ErrorMessage
                name="username"
                component="div"
                className={styles.error_msg}
              />
            </div>

            <div className={styles.form_group}>
              <Field
                name="password"
                type="password"
                placeholder="PW"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error_msg}
              />
            </div>

            <div className={styles.form_group}>
              <button
                type="submit"
                disabled={loading}
              >
                <span>Login</span>
              </button>

            {message && (
              <div className={styles.error_msg}>
                회원 정보를 다시 확인해 주세요!
              </div>
            )}
            </div>
          </Form>
        )}
      </Formik>

    <Link to="/join" className={styles.link_container}>Sgin up</Link>

    </div>
  );
};

export default Login;