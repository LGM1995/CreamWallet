import React, {useState} from 'react';
import styles from './Modal.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {updateCream} from "../features/slices/creamSlice";

const Modal = ({modalClose, id}) => {
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();


  const initialValues = {
    id: id,
    menu: "",
    date: "",
    temperature: "",
    state: "",
  };

  const validationSchema = Yup.object().shape({
    menu: Yup.string()
      .test(
        "len",
        "메뉴는 2글자 이상 8글자 이하여야 합니다.",
        (val) =>
          val && val.toString().length >= 2 && val.toString().length <=8
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
      .required("상태를 입력해 주세요!"),
  });

  const handleRegister = (formValue) => {
    const { id, menu, date ,temperature, state} = formValue;

    setSuccessful(false);

    dispatch(updateCream({ id, menu, date ,temperature, state }))
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
    <div className={styles.modal_container} onClick={onCloseModal}>
      <div className={styles.modal_content_container}>
        <div className={styles.modal_update_logo}>
          UPDATE
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form>
              {!successful && (
                <div>
                  <div className={styles.modal_form_group}>
                    <Field
                      name="menu"
                      type="text"
                      className={styles.modal_input}
                      placeholder="Menu"
                    />
                    <ErrorMessage
                      name="menu"
                      component="div"
                      className={styles.modal_error_msg}
                    />
                  </div>

                  <div className={styles.modal_form_group}>
                    <Field
                      name="date"
                      type="date"
                      className={styles.modal_input}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className={styles.modal_error_msg}
                    />
                  </div>

                    <div className={styles.modal_form_group}>
                      <Field
                        name="temperature"
                        type="text"
                        className={styles.modal_input}
                        placeholder="Temperature"
                      />
                      <ErrorMessage
                        name="temperature"
                        component="div"
                        className={styles.modal_error_msg}
                      />
                    </div>

                    <div className={styles.modal_form_group}>
                      <div className={styles.modal_state_group}>
                        <label htmlFor="state">state</label>
                        <label htmlFor="state">
                          <Field
                            name="state"
                            type="radio"
                            value="0"
                          />
                          0(수입)
                        </label>
                        <label htmlFor="state">
                          <Field
                            name="state"
                            type="radio"
                            value="1"
                          />
                          1(지출)
                        </label>
                      </div>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className={styles.modal_error_msg}
                      />
                    </div>

                  <div className={styles.modal_form_scoop_group}>
                    <button type="submit" className={styles.modal_update_button}>
                      UPDATE
                    </button>
                    <button onClick={modalClose} className={styles.modal_cancel_button}>
                      CANCEL
                    </button>
                    {message && (
                      <div className={styles.cream_error_msg}>
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
    </div>
  )
}

export default Modal
