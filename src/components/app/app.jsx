import React, { useEffect } from "react";
//DndProvider
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//Route
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  LoginPage,
  NotFound404,
  ForgotPasswordPage,
  RegisterPage,
  ResetPasswordPage,
} from "./pages";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Loader } from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions/menu";

function App() {
  const dispatch = useDispatch();
  const itemsRequest = useSelector((state) => state.menu.itemsRequest);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pb-10 container pr-10 pl-10`}>
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <h1
                className={`text text_type_main-large pt-10 pb-5 ${styles.gridTitle}`}
              >
                Соберите бургер
              </h1>
              <DndProvider backend={HTML5Backend}>
                {itemsRequest ? <Loader size="large" /> : <BurgerIngredients />}
                <BurgerConstructor />
              </DndProvider>
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            {/* <Route path={`/list/:country/:personId`} exact={true}>
          <код модального окна сюда вынести?/>
        </Route> */}
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </Route>
            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        </Router>
      </main>
    </>
  );
}

export default App;
