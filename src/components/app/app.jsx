import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useDispatch } from "react-redux";
import { getItems } from "../../services/actions/menu";
import { getUser } from "../../services/actions/user.js";
import { ProtectedRoute } from "../protected-route/protected-route";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ConstructorPage,
  NotFound404,
  InfoFood,
  FeedPage,
  OrderMoreInfoPage,
  ProfileОrderHistory
} from "../../pages/index";

import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderMoreInfo from "../order-more-info/order-more-info";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(getItems());
    dispatch(getUser());
  }, []);

  const onClose = () => {
    history.goBack();
  };
  const background = location.state && location.state.background;
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Switch location={background || location}>
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
          <ProtectedRoute path="/profile/orders" exact>
          <ProfileОrderHistory />
        </ProtectedRoute>
          <Route path="/feed" children={<FeedPage />} exact />

          <Route path="/feed/:id" children={<OrderMoreInfoPage />} exact />

          <Route children={<NotFound404 />} />
        </Switch>
        {background && (
          <>
            <Route path="/ingredients/:id">
              <Modal onClose={onClose} header="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            </Route>

            <Route path="/feed/:id">
              <Modal onClose={onClose}>
                <OrderMoreInfo />
              </Modal>
            </Route>

            <ProtectedRoute path="/profile/orders/:id">
              <Modal onClose={onClose}>
                <OrderMoreInfo />
              </Modal>
            </ProtectedRoute>
          </>
        )}
      </main>
    </>
  );
}

export default App;
