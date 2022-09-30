import React, { useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Link } from "react-router-dom";

import styles from "./page-form.module.css";
import {
  Button,
  ShowIcon,
  HideIcon,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  setDataNewUser,

} from "../services/actions/user";

export function RegisterPage() {
  const dispatch = useDispatch();
  const userDataRequest = useSelector((state) => state.auth.userDataRequest);
const email = useSelector((state) => state.auth.email);
const password = useSelector((state) => state.auth.password);
const userName = useSelector((state) => state.auth.userName);
  // function submitData(e) {
  //   e.preventDefault();
  //   console.log(e.target)
  //   // dispatch(setDataNewUser(data));
  // }
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {

    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitUserData = useCallback(
    e => {
      e.preventDefault();
      console.log(form)
      // dispatch(setDataNewUser(data));
      // auth.signIn(form);
    },
    []
  );

  // if (auth.user) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: '/'
  //       }}
  //     />
  //   );
  //     }
  //Код инпута
  // const [isVisible, setVisible] = useState(false);

  // const [value, setValue] = React.useState('value')
  const inputRef = useRef(null);
// const onChange = () => {
//   console.log('1')
// }

  //     const EyeOff = props => <ShowIcon type="primary" onClick={props.onClick}/>
  // const Eye = props => <HideIcon type="primary" onClick={props.onClick}/>

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Регистрация
          </h1>
          <Input
            type="text"
            placeholder="Имя"
            onChange={onChange}
            value={form.name}
            name="name"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
          />
          <EmailInput
          onChange={onChange}
          value={form.email}
          name="email"
          />
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name="password"
          />

          <Button onClick={submitUserData} type="primary" size="medium" htmlType='submit'>
            Зарегистрироваться
          </Button>
        </form>
        <div
          className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}
        >
          <div className={styles.joinform}>
            <p className="text">Уже зарегистрированы?</p>
            <Link to="/login" className={`${styles.link} ml-1`}>Войти</Link>
            {/* <a className={`${styles.link} ml-1`} href="#">
              Войти
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
