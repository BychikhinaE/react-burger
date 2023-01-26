import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks/hooks";
import { useHistory, Redirect } from "react-router-dom";
import styles from "./page-form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postResetPasswordAction } from "../services/actions/password";
import { POST_RESET_PASSWORD_SUCCESS } from "../services/actions/password";
import { TLocation } from "../services/types/data";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory<TLocation>();
  const [newPassword, setNewPassword] = useState({
    value: "",
    isChange: false,
  });
  const [token, setToken] = useState("");
  const forgotPasswordStatus = useSelector(
    (state) => state.password.forgotPasswordStatus
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      postResetPasswordAction({
        password: newPassword.value,
        token: token,
      })
    );
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
    return <Redirect to={{ pathname: "/profile" }} />;
  }

  //Меняем forgotPasswordStatus на false при переходе с этой странице на "Войти"
  function rememberYourself() {
    history.replace({
      pathname: "/login",
    });
    dispatch({
      type: POST_RESET_PASSWORD_SUCCESS,
      data: false,
    });
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Восстановление пароля
          </h1>
          {/* Само свойство required  в импортируемый компонент Input и PasswordInput нельзя добавить, можно сделать кнопку Отправить неактивной*/}
          <Input
            type="password"
            placeholder="Введите новый пароль"
            onChange={(e) =>
              setNewPassword({
                value: e.target.value,
                isChange: newPassword.value.length > 3 ? true : false,
              })
            }
            value={newPassword.value}
            name="password"
            error={false}
          />
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name="token"
            error={false}
          />
          <Button type="primary" size="medium" disabled={!newPassword.isChange}>
            Сохранить
          </Button>
        </form>
        <div
          className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}
        >
          <div className={styles.joinform}>
            <p className="text">Вспомнили пароль?</p>
            <button
              className={`${styles.button} text text_type_main-default ml-1`}
              onClick={rememberYourself}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
