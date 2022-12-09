import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css"

import { login } from "../features/slices/authSlice";
import { clearMessage } from "../slices/message";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  // 로그인 상태 state를 store에서 가져옴
  const { message } = useSelector((state) => state.message);
  // 메시지를 표시할 state를 store에서 가져옴
  const dispatch = useDispatch();
  // dispatch를 사용하기 위해 가져옴

  useEffect(() => {
    dispatch(clearMessage());
    // 사이드 렌더링으로 error 메세지를 비우고 변화할 때 마다 리 렌더링 시킨다.
  }, [dispatch]);

  const initialValues = {
    // 로그인을 위해 받을 아이디와 비밀번호 초기 값
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
        // 로그인이 성공하면 메인 페이지로 이동
        navigate("/cream");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    // 전역 변수로 저장된 로그인 상태가 ture라면 메인 페이지로 이동시킴
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