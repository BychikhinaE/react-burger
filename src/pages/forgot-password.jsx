import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import styles from "./page-form.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postForgotPasswordAction } from "../services/actions/password";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname, state } = useLocation();

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
    dispatch(postForgotPasswordAction(history, pathname));
  }

  const isAuth = useSelector((state) => state.user.isAuth);
  if (isAuth) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Восстановление пароля
          </h1>
          <EmailInput
            placeholder="Укажите E-mail"
            onChange={onChange}
            value={state && state.email ? state.email : ""}
            name="email"
          />
          <Button
            onClick={handleSubmit}
            type="primary"
            size="medium"
            htmlType="submit"
          >
            Восстановить
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
