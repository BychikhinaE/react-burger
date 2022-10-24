import { useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page-form.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { signIn } from "../services/actions/user";
import { SAVE_PASSWORD } from "../services/actions/password";

export function LoginPage() {
  const [valuePassword, setValuePassword] = useState("");
  const [valueEmail, setValueEmail] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const login = (e) => {
    e.preventDefault();
    dispatch(signIn({ email: valueEmail, password: valuePassword }));
    dispatch({
      type: SAVE_PASSWORD,
      password: valuePassword,
    });
  };

  const isAuth = useSelector((state) => state.user.isAuth);
  if (isAuth) {
    return <Redirect to={location?.state?.from || "/"} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={login} method="post">
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Вход
          </h1>
          <EmailInput
            placeholder="E-mail"
            onChange={(e) => setValueEmail(e.target.value)}
            value={valueEmail}
            name="email"
          />
          <PasswordInput
            onChange={(e) => setValuePassword(e.target.value)}
            value={valuePassword}
            name="password"
            placeholder="Пароль"
          />
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div
          className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}
        >
          <div className={styles.joinform}>
            <p className="text">Вы - новый пользователь?</p>
            <Link to="/register" className={`${styles.link} ml-1`}>
              Зарегистрироваться
            </Link>
          </div>
          <div className={`${styles.joinform} mt-4`}>
            <p className="text">Забыли пароль?</p>
            <Link to="/forgot-password" className={`${styles.link} ml-1`}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}