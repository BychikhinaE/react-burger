import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import styles from "./page-form.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postForgotPasswordAction } from "../services/actions/password";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [valueEmail, setValueEmail] = useState("");
  const history = useHistory();
  const forgotPasswordStatus = useSelector(
    (state) => state.password.forgotPasswordStatus
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postForgotPasswordAction({ email: valueEmail }));
  }

  useEffect(() => {
    if (forgotPasswordStatus) {
      history.replace({
        pathname: "/reset-password",
        state: { from: "forgot-password" },
      });
    }
  }, [history, forgotPasswordStatus]);

  const isAuth = useSelector((state) => state.user.isAuth);
  if (isAuth) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit} method="post">
          <h1 className={`text text_type_main-medium ${styles.heading}`}>
            Восстановление пароля
          </h1>
          <EmailInput
            placeholder="Укажите E-mail"
            onChange={(e) => setValueEmail(e.target.value)}
            value={valueEmail}
            name="email"
          />
          <Button type="primary" size="medium">
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
