import React, { useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "./page-form.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { addNewUser } from "../services/actions/user";

export function RegisterPage() {
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

  const submitUserData = (e) => {
    e.preventDefault();
    dispatch(addNewUser(history, pathname));
  };

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
            value={state && state.name ? state.name : ""}
            name="name"
            error={false}
            errorText="Ошибка"
          />
          <EmailInput
            onChange={onChange}
            value={state && state.email ? state.email : ""}
            name="email"
          />
          <PasswordInput
            onChange={onChange}
            value={state && state.password ? state.password : ""}
            name="password"
          />

          <Button
            onClick={submitUserData}
            type="primary"
            size="medium"
            htmlType="submit"
          >
            Зарегистрироваться
          </Button>
        </form>
        <div
          className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}
        >
          <div className={styles.joinform}>
            <p className="text">Уже зарегистрированы?</p>
            <Link to="/login" className={`${styles.link} ml-1`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
