import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "./page-form.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postResetPasswordAction } from "../services/actions/password";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname, state } = useLocation();
console.log(pathname, state)
  const onChange = (e) => {
    history.replace({
      pathname: pathname,
      state: {
        ...state,
        [e.target.name]: e.target.value,
      },
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postResetPasswordAction(history, pathname));
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}
          // name="resetPasswordForm"
          // onSubmit={handleSubmit}
          // method="POST"
        >
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Восстановление пароля
          </h1>
          <PasswordInput
            onChange={onChange}
            value={state && state.password ? state.password : ""}
            name="password"
            placeholder="Введите новый пароль"
            required
          />
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={onChange}
            value={state && state.token ? state.token : ""}
            name="token"
            error={false}
          />
          <Button onClick={handleSubmit} type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <div
          className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}
        >
          <div className={styles.joinform}>
            <p className="text">Вспомнили пароль?</p>
            <Link to="/login" className={`${styles.link} ml-1`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
