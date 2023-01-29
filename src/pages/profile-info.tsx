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
  type TUseStateProfile = {value: string, isChange: boolean}
  const [valueName, setValueName] = useState<TUseStateProfile>({value: '', isChange: false});
  const [valuePassword, setValuePassword] = useState<TUseStateProfile>({value: '', isChange: false});
  const [valueEmail, setValueEmail] = useState<TUseStateProfile>({value: '', isChange: false});

  const dispatch = useDispatch();

  const { name, email } = useSelector((state) => state.user.userData);
  const password = useSelector((state) => state.password.password);

  const cancel = () => {
    setValueName({value: name, isChange: false});
    setValuePassword({value: password, isChange: false});
    setValueEmail({value: email, isChange: false});
  };

  const handleSubmit = () => {
    dispatch(
      updateUser({
        email: valueEmail.isChange? valueEmail.value : email,
        password: valuePassword.isChange? valuePassword.value : password,
        name: valueName.isChange? valueName.value : name,
      })
    );
    if (valuePassword.isChange) {
      dispatch({
        type: SAVE_PASSWORD,
        password: valuePassword.value,
      });
    }
    cancel();
  };

  return (
    <>
      <div className={`${styles.inputName} mt-30`}>
        <Input
          type="text"
          onChange={(e) => setValueName({value: e.target.value, isChange: true})}
          icon="EditIcon"
          value={valueName.isChange ? valueName.value : name}
          name="name"
        />
      </div>
      <div className={styles.inputEmail}>
        <EmailInput
          onChange={(e) => setValueEmail({value: e.target.value, isChange: true})}
          value={valueEmail.isChange ? valueEmail.value : email}
          name="email"
        />
      </div>
      <div className={styles.inputPassword}>
        <PasswordInput
          onChange={(e) => setValuePassword({value: e.target.value, isChange: true})}
          value={valuePassword.isChange ? valuePassword.value : password}
          name="password"
        />
      </div>

      {(valueName.isChange|| valueEmail.isChange ||  valuePassword.isChange) && (
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
