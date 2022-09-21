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

export function ResetPasswordPage() {
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
            Восстановление пароля
          </h1>
                   <Input
            type={isVisible ? "text" : "password"}
            placeholder={"Введите новый пароль"}
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
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={()=>{}}
            // icon={'CurrencyIcon'}
            value={valueE}
            name={"code"}
            error={false}
            errorText={"Ошибка"}
          />
          <Button onClick={() => {}} type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <div
          className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}
        >
          <div className={styles.joinform}>
            <p className="text">Вспомнили пароль?</p>
            <a className={`${styles.link} ml-1`} href="#">
              Войти
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
