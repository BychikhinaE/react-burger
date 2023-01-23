import React, { useCallback, useEffect } from "react";
import { useDispatch } from "../services/hooks/hooks";
import styles from "./profile.module.css";
import { NavLink, Switch, Route, useLocation } from "react-router-dom";
import ProfileInfo from "./profile-info";
import ProfileОrderHistory from "./profile-order-history";
import { signOut,  getUser } from "../services/actions/user";

export function ProfilePage() {
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);


  const location = useLocation();
  const background = location.state?.background;
  return (
    <section aria-label="profile-page" className={`${styles.grid} pl-10`}>
      <nav className={`${styles.nav} text mt-30`}>
        <NavLink
          exact
          to="/profile"
          className={`${styles.link} text text_type_main-medium text_color_inactive mt-4`}
          activeStyle={{ color: " white" }}
        >
          Профиль
        </NavLink>

        <NavLink
          exact
          to="/profile/orders"
          className={`${styles.link} text text_type_main-medium text_color_inactive mt-4`}
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
      <Switch>
        <Route path="/profile/orders" exact>
          <p
            className={`${styles.info} text text_type_main-default text_color_inactive pt-25`}
          >
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        </Route>
        <Route path="/profile" exact>
          <p
            className={`${styles.info} text text_type_main-default text_color_inactive pt-2`}
          >
            В этом разделе вы можете изменить&nbsp;свои персональные данные
          </p>
        </Route>
      </Switch>

      <Switch location={background || location}>
        <Route path="/profile/orders" exact>
          <ProfileОrderHistory />
        </Route>
        <Route path="/profile" exact>
          <ProfileInfo />
        </Route>
      </Switch>
    </section>
  );
}


