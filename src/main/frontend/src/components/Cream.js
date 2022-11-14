import React, {useEffect, useState} from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CreamService from "../service/cream.service";
import {clearMessage} from "../slices/message";
import {createCream, deleteCream, getCreamList} from "../slices/cream";
import * as Yup from "yup";
import {register} from "../slices/auth";
import {ErrorMessage, Field, Form, Formik} from "formik";


const Cream = () => {
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const { user_id } = useSelector((state) => state.auth);
  const { jwtToken } = useSelector((state) => state.auth);
  const { creams } = useSelector((state) => state.cream);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = (await (CreamService.getCreams( user, jwtToken))).data
      dispatch(getCreamList(res));
    })();
  }, [])

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const initialValues = {
    menu: "",
    date: "",
    temperature: "",
    state: "",
    username: user,
    token: jwtToken
  };

  const validationSchema = Yup.object().shape({
    menu: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 8 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <=6
      )
      .required("This field is required!"),
    date: Yup.date()
      .typeError("The value must be a date (YYYY-MM-DD)")
      .required("This field is required!"),
    temperature: Yup.number()
      .test(
        "len",
        "The username must be between 0 and 100000000 characters.",
        (val) =>
          val && val >= 0 && val <= 100000000
      )
      .required("This field is required!"),
    state: Yup.number()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val == 0 || val == 1
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { menu, date ,temperature, state, username, token} = formValue;

    setSuccessful(false);

    dispatch(createCream({ menu, date ,temperature, state, username, token }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  function time(t) {
    let date = new Date(t);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  function List() {
    const target = "";
    const re = [...creams]
    return (
      re.sort((a,b) => new Date(a.date) - new Date(b.date)).map(item => (
      <div key={item.id}>
        <p>{item.menu} {time(item.date)} {item.state} {(item.temperature).toLocaleString('ko-KR')}</p>
        <button >수정</button>
        <button onClick={() => dispatch(deleteCream({id:item.id}))}>삭제</button>
      </div>
    )))
  }

  function Create() {
    return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="menu">menu</label>
                    <Field
                      name="menu"
                      type="text"
                      className={
                        "form-control" +
                        (errors.menu && touched.menu
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="menu"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="date">date</label>
                    <Field
                      name="date"
                      type="date"
                      className={
                        "form-control" +
                        (errors.date && touched.date
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="invalid-feedback"
                    />

                    <div className="form-group">
                      <label htmlFor="temperature">temperature</label>
                      <Field
                        name="temperature"
                        type="text"
                        className={
                          "form-control" +
                          (errors.temperature && touched.temperature
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="temperature"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">state</label>
                      <Field
                        name="state"
                        type="text"
                        className={
                          "form-control" +
                          (errors.state && touched.state ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="invalid-feedback"
                      />
                      {/*<Field*/}
                      {/*  name="user_id"*/}
                      {/*  type="hidden"*/}
                      {/*  value={user_id}*/}
                      {/*/>*/}
                      {/*<Field*/}
                      {/*  name="token"*/}
                      {/*  type="hidden"*/}
                      {/*  value={jwtToken}*/}
                      {/*/>*/}
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                      생성
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
        <div>hello</div>
        <List></List>
      <Create></Create>
    </div>
  );
};


export default Cream;
