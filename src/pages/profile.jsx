import React, { useCallback } from "react";
import styles from "./profile.module.css";
import { useHistory, NavLink, Switch, Route } from "react-router-dom";
import { ProfileInfo } from "./profile-info";
import { ProfileОrderHistory } from "./profile-order-history";

export function ProfilePage() {
  return (
    <section aria-label="profile-page" className={`${styles.grid} pl-10`}>
      <nav className={`${styles.nav} text text_type_main-medium `}>
        <ul>
          <li>
            <NavLink
              exact
              to="/profile"
              className={`${styles.link} text mt-4`}
              activeStyle={styles.linkActive}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/profile/orders"
              className={`${styles.link} text text_color_inactive mt-4`}
              activeStyle={styles.linkActive}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={`${styles.link} text text_color_inactive mt-4`}
              activeStyle={styles.linkActive}
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
      <p
        className={`${styles.info} text text_type_main-default text_color_inactive pt-2`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
      <Switch>
        <Route path="/profile" exact={true}>
          <ProfileInfo />
        </Route>
        <Route path="/profile/orders" exact={true}>
          <ProfileОrderHistory />
        </Route>
      </Switch>
    </section>
  );
}
