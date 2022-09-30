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
            <Route path="/" exact={true}>
              <ConstructorPage />
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            {/* <Route path={`/:id`} children={<InfoFood />} exact={true} /> */}
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </Route>
            <Route path="/profile" exact={true}>
              <ProfilePage />
            </Route>
            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
