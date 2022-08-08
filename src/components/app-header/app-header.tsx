import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${styles.header}`}>
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
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.button}>
          <ProfileIcon type="secondary" />
          <h2 className="text text_type_main-default text_color_inactive pl-2">
            Личный кабинет
          </h2>
        </div>
      </header>
    );
  }
}

export default AppHeader;
