import React, {useCallback} from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  const history = useHistory();
  const login = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  );

  return (
    <header className={`${styles.header} pt-10 container pr-10 pl-10`}>
      <nav className={`${styles.nav} mt-4 mb-4`}>
        <div className={`${styles.item} pr-4 pt-4 pb-4`}>
          <BurgerIcon type="primary" />
          <NavLink
            to={{ pathname: `/` }}
            className={`${styles.link} text text_type_main-default text_color_inactive pl-2`}
            activeClassName={styles.activeLink}
          >
            Конструктор
          </NavLink>
          {/* <h2 className="text text_type_main-default pl-2">Конструктор</h2> */}
        </div>
        <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4 ml-4`}>
          <ListIcon type="secondary" />
          <NavLink
            to={{ pathname: `/feed` }}
            className={`${styles.link} text text_type_main-default text_color_inactive pl-2`}
            activeClassName={styles.activeLink}
          >
            Лента заказов
          </NavLink>
        </div>
      </nav>
      <Logo />
      <div className={`${styles.button__container} pl-5`}>
        <ProfileIcon type="secondary" />

        <button
          className={`${styles.button} text text_type_main-default text_color_inactive pl-2`}
          onClick={login}
        >
          Личный кабинет
        </button>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
