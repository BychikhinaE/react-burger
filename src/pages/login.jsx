import React, { useCallback, useState, useRef } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";

import styles from "./page-form.module.css";
import {
  Button,
  ShowIcon,
  HideIcon,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage() {
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

  const history = useHistory();
  const login = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Вход
          </h1>
          <EmailInput
            // type={"text"}
            // placeholder={"E-mail"}
            onChange={onChangeEmail}
            value={valueE}
            name={"email"}
          />
          {/* <Input
            type={"text"}
            placeholder={"E-mail"}
            onChange={(e) => setValue(e.target.value)}
            // icon={'CurrencyIcon'}
            value={form.email}
            name={"email"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            // size={'medium'}
          /> */}
          <PasswordInput
            onChange={onChangePassword}
            value={valueP}
            name={"password"}
          />
          {/* <Input
            type={isVisible ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={(e) => setValue(e.target.value)}
            icon={isVisible ? "HideIcon" : "ShowIcon"}
            // icon={isVisible ? EyeOff : Eye}
            value={form.password}
            name={"password"}
            error={false}
            ref={inputRef}
            onIconClick={() => setVisible(!isVisible)}
            errorText={"Ошибка"}
            // size={"medium"}
          /> */}

          {/* login */}
          <Button onClick={() => {}} type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div
          className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}
        >
          <div className={styles.joinform}>
            <p className="text">Вы - новый пользователь?</p>
            <Link to="/register" className={`${styles.link} ml-1`}>Зарегистрироваться</Link>
            {/* <a className={`${styles.link} ml-1`} href="#">
              Зарегистрироваться
            </a> */}
          </div>
          <div className={`${styles.joinform} mt-4`}>
            <p className="text">Забыли пароль?</p>
            <Link to="/forgot-password" className={`${styles.link} ml-1`}>Восстановить пароль</Link>
            {/* <a className={`${styles.link} ml-1`} href="#">
              Восстановить пароль
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
