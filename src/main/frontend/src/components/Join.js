import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./JoinProc.module.css"
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";
import {Link, useNavigate} from "react-router-dom";

const Join = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
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
        "아이디는 3 에서 10자 사이 입니다!",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 10
      )
      .required("아이디를 입력해 주세요!"),
    name: Yup.string()
      .test(
        "len",
        "이름은 2자 이상 10자 이하 입니다!",
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
        "비밀번호는 6자 이상 20자 이하여야 합니다!",
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

    </div>
  );
};

export default Join;