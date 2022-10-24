import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Redirect } from "react-router-dom";
import styles from "./page-form.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { addNewUser } from "../services/actions/user";
import { SAVE_PASSWORD } from "../services/actions/password";
import { useState } from "react";

export function RegisterPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const submitUserData = (e) => {
    e.preventDefault();
    dispatch(
      addNewUser({
        email: newEmail,
        password: newPassword,
        name: newName,
      })
    );
    dispatch({
      type: SAVE_PASSWORD,
      password: newPassword,
    });
  };

  const isAuth = useSelector((state) => state.user.isAuth);
  if (isAuth) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} method="post" onSubmit={submitUserData}>
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Регистрация
          </h1>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            name="name"
            error={false}
            errorText="Ошибка"
          />
          <EmailInput
            onChange={(e) => setNewEmail(e.target.value)}
            value={newEmail}
            name="email"
          />
          <PasswordInput
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            name="password"
          />

          <Button type="primary" size="medium">
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
