import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks/hooks";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import styles from "./page-form.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postResetPasswordAction } from "../services/actions/password";
import { SAVE_PASSWORD } from "../services/actions/password";
import { TLocation } from "../services/types/data";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory<TLocation>();
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const location = useLocation<TLocation>();
  const forgotPasswordStatus = useSelector(
    (state) => state.password.forgotPasswordStatus
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      postResetPasswordAction({
        password: newPassword,
        token: token,
      })
    );
    dispatch({
      type: SAVE_PASSWORD,
      password: newPassword,
    });
  }

  const updatePasswordStatus = useSelector(
    (state) => state.password.updatePasswordStatus
  );
  useEffect(() => {
    if (updatePasswordStatus) {
      history.replace({
        pathname: "/profile",
      });
    }
  }, [history, updatePasswordStatus]);

  if (!forgotPasswordStatus) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Восстановление пароля
          </h1>
          <PasswordInput
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            name="password"
            // placeholder="Введите новый пароль"
            // required
          />
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name="token"
            error={false}
          />
          <Button type="primary" size="medium">
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
