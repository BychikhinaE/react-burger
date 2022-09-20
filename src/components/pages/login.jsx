import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { useHistory } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage() {
  const history = useHistory();
  const login = useCallback(() => {
    history.replace({ pathname: "/list" });
  }, [history]);
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Вход</h1>

        {/* <Link to='/list' className={styles.link}>
          Войти
        </Link> */}

        <Button
        onClick={login}
        type="primary"
        size="large"
        disabled={true}
       >
          Войти
        </Button>
      </form>
    </div>
  );
}
