import React, {useCallback, useEffect, useRef, useState} from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CreamService from "../service/cream.service";
import {clearMessage} from "../slices/message";
import {createCream, deleteCream, getCreamList} from "../slices/cream";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Modal from "./Modal";
import styles from "./Cream.module.css"
import {setCost} from "../slices/cost";
import {setYear, setYearList} from "../slices/yearList";
import DropDown from "./DropDown";
import {logout} from "../slices/auth";


const Cream = () => {
  const [successful, setSuccessful] = useState(false);
  const [ dropdown, setDropdown ] = useState(false);
  const [ show, setShow ] = useState(false);
  const { year,yearList } = useSelector((state) => state.yearList);
  const { message } = useSelector((state) => state.message);
  const { user, jwtToken, isLoggedIn } = useSelector((state) => state.auth);
  const { creams } = useSelector((state) => state.cream);
  const { cost } = useSelector((state) => state.cost);
  const dispatch = useDispatch();

  const re = [...creams]


  const logOut = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("Authorization")
    dispatch(logout);
    return window.location.replace("/login");
  }, [dispatch]);


  useEffect(() => {
    (async () => {
      const res = (await (CreamService.getCreams( user, jwtToken, year))).data
      dispatch(getCreamList(res));
    })();

    (async () => {
      const cost = (await (CreamService.getCost( user, jwtToken, year))).data
      dispatch(setCost(cost));
    })();

    (async () => {
      const yearList = (await (CreamService.getYearList( user, jwtToken))).data
      dispatch(setYearList(yearList));
    })();
  }, [year],[creams])

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);


  const ref = useRef(null);
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setDropdown(!dropdown)
      }
    };

    if (dropdown) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click",onClick);
    };
  }, [dropdown]);


  const removeHandler = () => {
    setDropdown(!dropdown);
  }

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
        "온도(가격)는 1억 이하입니다!.",
        (val) =>
          val && val >= 0 && val <= 100000000
      )
      .required("온도(가격)을 입력해 주세요!"),
    state: Yup.number()
      .required("상태를 입력해 주세요!"),
  });

  const handleRegister = (formValue) => {
    const { menu, date ,temperature, state } = formValue;

    setSuccessful(false);

    dispatch(createCream({ menu, date ,temperature, state }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  function time(t) {
    let date = new Date(t);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }

  function Header() {

    const selectYear = (e) => {
      dispatch(setYear(e.target.innerText));
    }


    return (
      <div className={styles.cream_header_container}>
        <div className={styles.cream_header_top_container}>
          <div className={styles.cream_header_top_logo}>{year} Temperature</div>
          <DropDown year={year} yearList={yearList && yearList} selectYear={selectYear}/>
        </div>
        <div className={(cost && cost.sum < 0) ? styles.cream_header_temperature0 : styles.cream_header_temperature1}>{cost && cost.sum.toLocaleString('ko-KR')}</div>
        <div className={styles.cream_header_cost_container}>
          <div className={styles.cream_header_ice_container}>
            <div className={styles.cream_header_ice_title}>ICE</div>
            <div className={styles.cream_header_ice_cost}>{cost && cost.ice.toLocaleString('ko-KR')}</div>
          </div>
          <div className={styles.cream_header_hot_container}>
            <div className={styles.cream_header_hot_title}>HOT</div>
            <div className={styles.cream_header_hot_cost}>{cost && cost.hot.toLocaleString('ko-KR')}</div>
          </div>
        </div>
      </div>
    )
  }

  function List() {
    const [creamId , setCreamId] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const modalClose = (e) => {
      setModalOpen(!modalOpen);
      setCreamId(e.target.id);
    }


    return (
      re.sort((a,b) => new Date(a.date) - new Date(b.date)).map(item => (
      <div key={item.id} className={styles.cream_card_container}>
        <div className={styles.cream_card_header}>
          <div className={styles.cream_card_header_date}>{time(item.date)}</div>
          <div className={styles.cream_card_header_button}>
            <span className={styles.span_button} type="button" id={item.id} onClick={modalClose}>수정 </span>
            { modalOpen && <Modal id={creamId}
                                  modalClose={modalClose}></Modal>}
            |
            <span className={styles.span_button} type="button" id={item.id} onClick={() => dispatch(deleteCream({id:item.id}))}> 삭제</span>
          </div>
        </div>
        <div className={styles.cream_card_body}>
          <div className={styles.cream_card_body_menu}>{item.menu}</div>
          <div className={(item.state == 0) ? styles.cream_card_body_temperature0 :
          styles.cream_card_body_temperature1}>{item.temperature.toLocaleString('ko-KR')}</div>
        </div>
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
                <div className={styles.cream_scoop_container}>
                  <div className={styles.cream_scoop_logo}>
                    ADD SCOOP
                  </div>
                  <div className={styles.cream_form_group}>
                    <Field
                      name="menu"
                      type="text"
                      className={styles.cream_input}
                      placeholder="Menu"
                    />
                    <ErrorMessage
                      name="menu"
                      component="div"
                      className={styles.cream_error_msg}
                    />
                  </div>

                  <div className={styles.cream_form_group}>
                    <Field
                      name="date"
                      type="date"
                      className={styles.cream_input}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className={styles.cream_error_msg}
                    />
                  </div>

                  <div className={styles.cream_form_group}>
                    <Field
                      name="temperature"
                      type="text"
                      className={styles.cream_input}
                      placeholder="Temperature"
                    />
                    <ErrorMessage
                      name="temperature"
                      component="div"
                      className={styles.cream_error_msg}
                    />
                  </div>

                  <div className={styles.cream_form_group}>
                    <div className={styles.cream_state_group}>
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
                      className={styles.cream_error_msg}
                    />
                  </div>

                  <div className={styles.cream_form_scoop_group}>
                    <button type="submit" className={styles.scoop_button}>
                      SCOOP
                    </button>
                    <button onClick={offShow} className={styles.cancel_button}>
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
    )
  }

  return (
    <div className={styles.cream_container}>
      <div className={styles.cream_content_container}>
        <Header></Header>
        <List></List>
      </div>
        { show || <button onClick={onShow} className={styles.cream_add_scoop_button}>ADD SCOOP</button>}
        { show && <Create /> }
      <div className={styles.cream_logout} onClick={logOut}>Logout</div>
    </div>
  );
};


export default Cream;
