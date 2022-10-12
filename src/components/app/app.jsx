import React, { useEffect } from "react";

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions/menu";
import { getUser } from "../../services/actions/user.js";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { ProtectedRoute } from "../protected-route/protected-route";
import {
  GET_ITEM_FOR_VIEW,
  CLOSE_MODAL,
} from "../../services/actions/ingredient";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
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
  // const location = useLocation();
  // const history = useHistory();
  useEffect(() => {
    dispatch(getItems());
    dispatch(getUser());
    // history.replace({ state: {} });
  }, []);

  // const onClose = () => {
  //   history.goBack();
  //   dispatch({ type: CLOSE_MODAL })
  // };

  // let background = location.state && location.state.background;

  return (
    <>
      <Router>
        <AppHeader />
        <main className={styles.main}>
          <Switch
          // location={background || location}
          >
            <Route path="/" children={<ConstructorPage />} exact />
            <Route path="/login" children={<LoginPage />} exact />
            <Route path="/ingredients/:id" children={<InfoFood />} exact />
            <Route path="/register" children={<RegisterPage />} exact />
            <Route
              path="/forgot-password"
              children={<ForgotPasswordPage />}
              exact
            />
            <Route
              path="/reset-password"
              children={<ResetPasswordPage />}
              exact
            />
            <ProtectedRoute path="/profile" children={<ProfilePage />} exact />
            <Route path="/order-list" exact />
            <Route children={<NotFound404 />} />
          </Switch>
        </main>
         {/* Show the modal when a background page is set */}
        {/* {background && (
          <Route path="/ingredients/:id">
            <Modal onClose={onClose} header="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          </Route>
        )} */}
      </Router>
    </>
  );
}

export default App;
