import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-10 container pr-10 pl-10`}>
      <nav className={`${styles.nav} mt-4 mb-4`}>
        <div className={`${styles.item} pr-4 pt-4 pb-4`}>
          <BurgerIcon type="primary" />
          <h2 className="text text_type_main-default pl-2">Конструктор</h2>
        </div>
        <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4 ml-4`}>
          <ListIcon type="secondary" />
          <h2 className="text text_type_main-default text_color_inactive pl-2">
            Лента заказов
          </h2>
        </div>
      </nav>
      <Logo />
      <div className={`${styles.button} pl-5`}>
        <ProfileIcon type="secondary" />
        <h2 className="text text_type_main-default text_color_inactive pl-2">
          Личный кабинет
        </h2>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
