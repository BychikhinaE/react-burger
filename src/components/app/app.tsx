import { useCallback, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { useDispatch } from "../../services/hooks/hooks";
import { getItems } from "../../services/actions/menu";
import { getUser } from "../../services/actions/user";
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
} from "../../pages/index";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderMoreInfo from "../order-more-info/order-more-info";
import { TLocation } from "../../services/types/data";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation<TLocation>();

  useEffect(() => {
    dispatch(getItems());
    dispatch(getUser());
  }, []);

  const onClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const background = location.state?.background;
  return (
    <>
      <AppHeader />
      <main>
        <Switch location={background || location}>
          <ProtectedRoute
            notForAuth
            path="/login"
            children={<LoginPage />}
            exact
          />
          <Route path="/ingredients/:id" children={<InfoFood />} exact />
          <ProtectedRoute
            notForAuth
            path="/register"
            children={<RegisterPage />}
            exact
          />
          <ProtectedRoute
            notForAuth
            path="/forgot-password"
            children={<ForgotPasswordPage />}
            exact
          />
          <ProtectedRoute
            notForAuth
            path="/reset-password"
            children={<ResetPasswordPage />}
            exact
          />
          <Route path="/feed/:id" children={<OrderMoreInfoPage />} exact />
          <ProtectedRoute
            path="/profile/orders/:id"
            children={<OrderMoreInfoPage />}
            exact
          />
          <Route path="/feed" children={<FeedPage />} exact />
          <ProtectedRoute
            path="/profile/orders"
            children={<ProfilePage />}
            exact
          />
          <ProtectedRoute path="/profile" children={<ProfilePage />} exact />
          <Route path="/" children={<ConstructorPage />} exact />
          <Route children={<NotFound404 />} />
        </Switch>
        {background && (
          <>
            <Route path="/ingredients/:id" exact>
              <Modal onClose={onClose}>
                <IngredientDetails />
              </Modal>
            </Route>

            <Route path="/feed/:id" exact>
              <Modal onClose={onClose}>
                <OrderMoreInfo />
              </Modal>
            </Route>

            <Route path="/profile/orders/:id" exact>
              <Modal onClose={onClose}>
                <OrderMoreInfo />
              </Modal>
            </Route>
          </>
        )}
      </main>
    </>
  );
}

export default App;
