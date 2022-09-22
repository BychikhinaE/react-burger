import React, { useCallback } from 'react';
import styles from './profile.module.css';
import { useHistory } from "react-router-dom";
import {
  Button,
  ShowIcon,
  HideIcon,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {
   const history = useHistory();
  const onClick = useCallback(() => {
    history.replace({ pathname: "/list" });
  }, [history]);
  return (
    <section aria-label='profile-page' className={`${styles.grid} pl-10`}>
      <nav className={`${styles.nav} text text_type_main-medium `}>
        <a className={`${styles.linkActive} ${styles.link} text mt-4`} href="#">Профиль</a>
        <a className={`${styles.link} text text_color_inactive mt-4`} href="#">История заказов</a>
        <a className={`${styles.link} text text_color_inactive mt-4`} href="#">Выход</a>
      </nav>
      <p className={`${styles.info} text text_type_main-default text_color_inactive pt-2`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
      <div className={styles.inputName}>

                   <Input
            type={"text"}
            placeholder={"Имя"}
            // onChange={}
            icon={'EditIcon'}
            // value={email}
            name={"name"}
            error={false}
            // ref={inputRef}
            // onIconClick={onIconClick}
            errorText={"Ошибка"}
            // size={'medium'}
          />

      </div>
      <div className={styles.inputEmail}>
      <EmailInput
            // type={"text"}
            // placeholder={"E-mail"}
            // onChange={onChangeEmail}
            // value={valueE}
            name={"email"}
          />
      </div>
      <div className={styles.inputPassword}>
      <PasswordInput
            // onChange={onChangePassword}
            // value={valueP}
            name={"password"}
          />
      </div>
    </section>
  );
}
