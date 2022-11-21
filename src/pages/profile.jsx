import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./profile.module.css";
import {
  NavLink,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import ProfileInfo from "./profile-info";
import ProfileОrderHistory from "./profile-order-history";
import { signOut } from "../services/actions/user";
import { ProtectedRoute } from "../components/protected-route/protected-route";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
import OrderMoreInfo from "../components/order-more-info/order-more-info";
import { getCookie } from "../utils/utils";

export function ProfilePage() {
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(wsConnectionStart());
  //   return () => {
  //     dispatch(wsConnectionClosed());
  //   };
  // }, []);
  // useEffect(() => {
  //   const tok = getCookie("accessToken");
  //   console.log(tok +'проФАЙЛW')
  //   dispatch(wsConnectionStart({
  //     token: `?token=${tok}`,
  //   }));
  //   return () => {
  //     dispatch(wsConnectionClosed());
  //   };
  // }, []);
  // const accessToken = getCookie("accessToken");
  // useEffect(() => {
  //   // const accessToken = getCookie("accessToken");
  //   console.log(accessToken)
  //   dispatch(wsConnectionStart({
  //     token: `?token=${accessToken}`,
  //   }));
  //   return () => {
  //     dispatch(wsConnectionClosed());
  //   };
  // }, [accessToken, dispatch]);

  // useEffect(() => {
  //   const token = getCookie("accessToken");
  //   dispatch(
  //     wsConnectionStart({
  //       token: `?token=${token}`,
  //     })
  //   );
  //   return () => {
  //     dispatch(wsConnectionClosed());
  //   };
  // }, [dispatch]);
  //   useEffect(() => {
  //   dispatch(
  //     wsConnectionStart({
  //       token: `/all`,
  //     })
  //   );
  //   return () => {
  //     dispatch(wsConnectionClosed());
  //   };
  // }, [dispatch]);
  // const { url } = useRouteMatch();
  const match = useRouteMatch();
  const location = useLocation();
  const background =  location.state?.background;
  return (
    <section aria-label="profile-page" className={`${styles.grid} pl-10`}>
      <Router>
      <nav className={`${styles.nav} text `}>
        <NavLink
exact
          to={match.url}
          className={`${styles.link} text text_type_main-medium text_color_inactive mt-4`}
          activeStyle={{ color: " white" }}
        >
          Профиль
        </NavLink>

        <NavLink
exact
          to={`${match.url}/orders`}
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
      <p
        className={`${styles.info} text text_type_main-default text_color_inactive pt-2`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
      <Switch
      // location={background || location}
      >
              <Route path={`${match.path}/orders`} exact>
          <ProfileОrderHistory />
        </Route>
        <Route path={match.path} exact>
          <ProfileInfo />
        </Route>

      </Switch>
      </Router>
    </section>
  );
}
