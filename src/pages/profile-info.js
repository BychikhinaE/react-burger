import React from "react";
import { useDispatch } from "react-redux";
import {
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./profile.module.css";

export function ProfileInfo() {
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

  return (
    <>
      <div className={styles.inputName}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={onChange}
          icon="EditIcon"
          value={state && state.name ? state.name : ""}
          name="name"
        />
      </div>
      <div className={styles.inputEmail}>
        <EmailInput
          placeholder="E-mail"
          onChange={onChange}
          value={state && state.email ? state.email : ""}
          name="email"
        />
      </div>
      <div className={styles.inputPassword}>
        <PasswordInput
          onChange={onChange}
          value={state && state.password ? state.password : ""}
          name="password"
        />
      </div>
    </>
  );
}
