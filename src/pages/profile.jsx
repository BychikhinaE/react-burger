import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styles from "./profile.module.css";
import {  NavLink, Switch, Route } from "react-router-dom";
import ProfileInfo from "./profile-info";
import { ProfileОrderHistory } from "./profile-order-history";
import { signOut } from "../services/actions/user";

export function ProfilePage() {
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <section aria-label="profile-page" className={`${styles.grid} pl-10`}>
      <nav className={`${styles.nav} text text_type_main-medium `}>
        <NavLink
          exact
          to="/profile"
          className={`${styles.link} text mt-4`}
          activeStyle={{ color: " white" }}
        >
          Профиль
        </NavLink>

        <NavLink
          exact
          to="/profile/orders"
          className={`${styles.link} text text_color_inactive mt-4`}
          activeStyle={{ color: " white" }}
        >
          История заказов
        </NavLink>

        <button
          className={`${styles.exit} text text_type_main-medium text_color_inactive mt-4`}
          onClick={logout}
        >
          Выход
        </button>
      </nav>
      <p
        className={`${styles.info} text text_type_main-default text_color_inactive pt-2`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
      <Switch>
        <Route path="/profile" exact>
          <ProfileInfo />
        </Route>
        <Route path="/profile/orders" exact>
          <ProfileОrderHistory />
        </Route>
      </Switch>
    </section>
  );
}
