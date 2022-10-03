import React, { useEffect } from "react";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions/menu";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ConstructorPage,
  NotFound404,
  InfoFood,
  OrderListPage,
} from "../../pages/index";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppHeader />
        <main className={styles.main}>
          <Switch>
            <Route path="/" children={<ConstructorPage />} exact={true} />
            <Route path="/login" children={<LoginPage />} exact={true} />
            <Route
              path="/ingredients/:id"
              children={<InfoFood />}
              exact={true}
            />
            <Route path="/register" children={<RegisterPage />} exact={true} />
            <Route
              path="/forgot-password"
              children={<ForgotPasswordPage />}
              exact={true}
            />
            <Route
              path="/reset-password"
              children={<ResetPasswordPage />}
              exact={true}
            />
            <Route path="/profile" children={<ProfilePage />} exact={true} />
            <Route path="/order-list" exact={true} />
            <Route children={<NotFound404 />} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
