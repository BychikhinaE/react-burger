import React, { useCallback, useState, useRef } from "react";
// import { Redirect, Link } from "react-router-dom";

import styles from "./page-form.module.css";
import {
  Button,
  ShowIcon,
  HideIcon,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function RegisterPage() {
  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  // let login = useCallback(
  //   e => {
  //     e.preventDefault();
  //     auth.signIn(form);
  //   },
  //   [auth, form]
  // );

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
  const [isVisible, setVisible] = useState(false);

  // const [value, setValue] = React.useState('value')
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [valueE, setValueEmail] = React.useState();
  const onChangeEmail = (e) => {
    setValue(e.target.value);
  };

  //     const EyeOff = props => <ShowIcon type="primary" onClick={props.onClick}/>
  // const Eye = props => <HideIcon type="primary" onClick={props.onClick}/>

  const [valueP, setValuePassword] = React.useState();
  const onChangePassword = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Регистрация
          </h1>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setValue(e.target.value)}
            value={form.email}
            name={"email"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
          />
          <EmailInput onChange={onChangeEmail} value={valueE} name={"email"} />
          <PasswordInput
            onChange={onChangePassword}
            value={valueP}
            name={"password"}
          />

          <Button onClick={() => {}} type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div
          className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}
        >
          <div className={styles.joinform}>
            <p className="text">Уже зарегистрированы?</p>
            <a className={`${styles.link} ml-1`} href="#">
              Войти
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
