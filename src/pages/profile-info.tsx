import React, { useState } from "react";
import { useDispatch, useSelector } from "../services/hooks/hooks";
import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { updateUser } from "../services/actions/user";
import { SAVE_PASSWORD } from "../services/actions/password";

function ProfileInfo() {
  const [valueName, setValueName] = useState<string>('');
  const [valuePassword, setValuePassword] = useState<string>('');
  const [valueEmail, setValueEmail] = useState<string>('');

  const dispatch = useDispatch();

  const { name, email } = useSelector((state) => state.user.userData);
  const password = useSelector((state) => state.password.password);

  const cancel = () => {
    setValueName(name);
    setValuePassword(password);
    setValueEmail(email);
  };

  const handleSubmit = () => {
    dispatch(
      updateUser({
        email: valueEmail || email,
        password: valuePassword || password,
        name: valueName || name,
      })
    );
    if (valuePassword) {
      dispatch({
        type: SAVE_PASSWORD,
        password: valuePassword,
      });
    }
    cancel();
  };

  return (
    <>
      <div className={`${styles.inputName} mt-30`}>
        <Input
          type="text"
          // placeholder="Имя"
          onChange={(e) => setValueName(e.target.value)}
          icon="EditIcon"
          value={valueName ? valueName : name}
          name="name"
        />
      </div>
      <div className={styles.inputEmail}>
        <EmailInput
          // placeholder="Логин"
          onChange={(e) => setValueEmail(e.target.value)}
          value={valueEmail ? valueEmail : email}
          name="email"
        />
      </div>
      <div className={styles.inputPassword}>
        <PasswordInput
          // placeholder="Пароль"
          onChange={(e) => setValuePassword(e.target.value)}
          value={valuePassword ? valuePassword : password}
          name="password"
        />
      </div>

      {(valueName !== undefined ||
        valueEmail !== undefined ||
        valuePassword !== undefined) && (
        <div className={styles.buttons}>
          <Button type="secondary" size="medium" onClick={cancel}>
            Отмена
          </Button>
          <Button type="primary" size="medium" onClick={handleSubmit}>
            Сохранить
          </Button>
        </div>
      )}
    </>
  );
}

export default React.memo(ProfileInfo);
