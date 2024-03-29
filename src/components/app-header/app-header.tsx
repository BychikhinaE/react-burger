import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { TLocation } from "../../services/types/data";

const AppHeader = () => {
  const { pathname } = useLocation<TLocation>();
  return (
    <header className={`${styles.header} pt-10 container pr-10 pl-10`}>
      <nav className={`${styles.nav} mt-4 mb-4`}>
        <div className={`${styles.item} pr-4 pt-4 pb-4`}>
          <BurgerIcon type={pathname.endsWith("/") ? "primary" : "secondary"} />
          <NavLink
            exact
            to={{ pathname: `/` }}
            className={`${styles.link} text text_type_main-default text_color_inactive pl-2`}
            activeClassName={styles.activeLink}
          >
            Конструктор
          </NavLink>
        </div>
        <div className={`${styles.item} pl-5 pr-5 pt-4 pb-4 ml-4`}>
          <ListIcon
            type={pathname.endsWith("/feed") ? "primary" : "secondary"}
          />
          <NavLink
            exact
            to={{ pathname: `/feed` }}
            className={`${styles.link} text text_type_main-default text_color_inactive pl-2`}
            activeClassName={styles.activeLink}
          >
            Лента заказов
          </NavLink>
        </div>
      </nav>
      <Link to={{ pathname: `/` }}>
        <Logo />
      </Link>
      <div className={`${styles.button__container} pl-5`}>
        <ProfileIcon
          type={pathname.includes("profile") ? "primary" : "secondary"}
        />
        <NavLink
          className={`${styles.link} text text_type_main-default text_color_inactive pl-2`}
          to={{ pathname: `/profile` }}
          activeClassName={styles.activeLink}
        >
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
