import React, {useState} from 'react';
import styles from './Modal.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {updateCream} from "../slices/cream";

const Modal = ({modalClose, id}) => {
  console.log(id);
  const { user } = useSelector((state) => state.auth);
  const { jwtToken } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const initialValues = {
    id: "",
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
    const { menu, date ,temperature, state, username, token} = formValue;

    setSuccessful(false);

    dispatch(updateCream({ menu, date ,temperature, state, username, token }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  const onCloseModal = (e) => {
    if(e.target === e.currentTarget){
      modalClose()
    }

  }
  return (
    <div className={styles.modal__container} onClick={onCloseModal}>
      <div className={styles.modal}>
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
                      value=""
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
                      수정
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
        <button className={styles.modal__button} onClick={modalClose}> Modal Close</button>
      </div>
    </div>
  )
}

export default Modal
