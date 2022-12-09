import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./Join.module.css"
import * as Yup from "yup";

import { register } from "../features/slices/authSlice";
import { clearMessage } from "../slices/message";
import {Link, useNavigate} from "react-router-dom";

const Join = () => {
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  // 로그인 상태 state를 store에서 가져옴
  const { message } = useSelector((state) => state.message);
  // 메시지를 표시할 state를 store에서 가져옴
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
    name: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "아이디는 3 에서 10자 사이입니다!",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 10
      )
      .required("아이디를 입력해 주세요!"),
    name: Yup.string()
      .test(
        "len",
        "이름은 2자 이상 10자 이하입니다!",
        (val) =>
          val && val.toString().length >= 2 && val.toString().length <= 10
      )
      .required("이름을 입력해 주세요!"),
    email: Yup.string()
      .email("이메일 형식이 아닙니다!")
      .required("이메일을 입력해 주세요!"),
    password: Yup.string()
      .test(
        "len",
        "비밀번호는 6자 이상 20자 이하입니다!",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 20
      )
      .required("비밀번호를 입력해 주세요!"),
  });

  const handleRegister = (formValue) => {
    const { username, password ,name, email} = formValue;

    setSuccessful(false);

    dispatch(register({ username, password, name, email }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigate("/login");
        window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className={styles.join_container}>
      <div className={styles.join_logo_font}>Sign Up</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form>
              {!successful && (
                <div>
                  <div className={styles.join_form_group}>
                    <Field
                      name="username"
                      type="text"
                      placeholder="ID"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={styles.join_error_msg}
                    />
                  </div>

                  <div className={styles.join_form_group}>
                    <Field
                      name="password"
                      type="password"
                      placeholder="PW"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={styles.join_error_msg}
                    />
                  </div>

                  <div className={styles.join_form_group}>
                    <Field
                      name="name"
                      type="text"
                      placeholder="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={styles.join_error_msg}
                    />
                  </div>

                  <div className={styles.join_form_group}>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.join_error_msg}
                    />
                  </div>

                  <div className={styles.join_form_group}>
                    <button type="submit">
                      Sign Up
                    </button>
                    {message && (
                      <div className={styles.join_error_msg}>
                        {message}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      <Link to="/login" className={styles.join_link_container}>Back</Link>
    </div>
  );
};

export default Join;