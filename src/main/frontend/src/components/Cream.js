import React, {useEffect, useState} from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CreamService from "../service/cream.service";
import {clearMessage} from "../slices/message";
import {createCream, deleteCream, getCreamList} from "../slices/cream";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Modal from "./Modal";


const Cream = () => {
  const [successful, setSuccessful] = useState(false);
  const [ show, setShow ] = useState(false);
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

  function onShow() {
    setShow(true);
  }

  function offShow()
  {
    setShow(false);
  }
  const initialValues = {
    menu: "",
    date: "",
    temperature: "",
    state: "",
  };

  const validationSchema = Yup.object().shape({
    menu: Yup.string()
      .test(
        "len",
        "메뉴는 3글자 이상 8글자 이하여야 합니다.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <=6
      )
      .required("메뉴를 입력해 주세요!"),
    date: Yup.date()
      .typeError("날짜 형식으로 입력해주세요 (YYYY-MM-DD)")
      .required("날짜를 입력해 주세요!"),
    temperature: Yup.number()
      .test(
        "len",
        "온도(가격)는 0에서 1억 사이의 숫자여야 합니다.",
        (val) =>
          val && val >= 0 && val <= 100000000
      )
      .required("온도(가격)을 입력해 주세요!"),
    state: Yup.number()
      .test(
        "len",
        "상태는 HOT:지출(0), ICE:수입(1) 중 하나여야 합니다. ",
        (val) =>
          val && val == 0 || val == 1
      )
      .required("상태를 입력해 주세요!"),
  });

  const handleRegister = (formValue) => {
    const { menu, date ,temperature, state } = formValue;

    setSuccessful(false);

    dispatch(createCream({ menu, date ,temperature, state }))
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
    const [creamId , setCreamId] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const modalClose = (e) => {
      setModalOpen(!modalOpen);
      setCreamId(e.target.id);
    }

    const re = [...creams]
    return (
      re.sort((a,b) => new Date(a.date) - new Date(b.date)).map(item => (
      <div key={item.id}>
        <p>{item.menu} {time(item.date)} {item.state} {(item.temperature).toLocaleString('ko-KR')}</p>
        <button
          id={item.id}
          onClick={modalClose}>수정</button>
        { modalOpen && <Modal id={creamId}
                              modalClose={modalClose}></Modal>}
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
        <List></List>
      <button onClick={onShow}>생성</button>
      <button onClick={offShow}>취소</button>
      { show && <Create /> }
    </div>
  );
};


export default Cream;
