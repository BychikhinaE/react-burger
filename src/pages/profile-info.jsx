import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./profile.module.css";
import {updateUser} from '../services/actions/user'


function ProfileInfo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname, state } = useLocation();
  console.log(pathname, state)

  const { name, email } = useSelector(
    (state) => state.user.userData
  );

  const password = useSelector(
    (state) => state.password.password
  );

  const onChange = (e) => {
    history.replace({
      pathname: pathname,
      state: {
        ...state,
        [e.target.name]: e.target.value,
      },
    });

  };

  const cancel = () => {
    history.replace({
      pathname: pathname,
      state: undefined,
    });
  };

  const handleSubmit = ()=>{
    console.log('foo')
    dispatch(updateUser(history, pathname));
    cancel()
  }


  return (
    <>
      <div className={styles.inputName}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={onChange}
          icon="EditIcon"

          value={state && state.name ? state.name : name}
          name="name"
        />
      </div>
      <div className={styles.inputEmail}>
        <EmailInput
          placeholder="Логин"
          onChange={onChange}
          value={state && state.email ? state.email : email}
          name="email"
        />
      </div>
      <div className={styles.inputPassword}>
        <PasswordInput
        placeholder="Пароль"
          onChange={onChange}
          value={state && state.password ? state.password : password}
          name="password"
        />
      </div>

{history.location.state !== undefined && (
  <div className={styles.buttons}>
      <Button
              type="secondary"
              size="medium"
              onClick={cancel}
            >
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
