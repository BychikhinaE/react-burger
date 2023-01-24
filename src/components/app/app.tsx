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

  const onClose = useCallback<() => void>(() => {
    history.goBack();
  }, [history]);


  const background = location.state?.background;
  return (
    <>
      <AppHeader />
      <main>
        <Switch location={background || location}>
          <ProtectedRoute notForAuth path="/login" children={<LoginPage />} />
          <Route path="/ingredients/:id" children={<InfoFood />} />
          <ProtectedRoute
            notForAuth
            path="/register"
            children={<RegisterPage />}
          />
          <ProtectedRoute
            notForAuth
            path="/forgot-password"
            children={<ForgotPasswordPage />}
          />
          <ProtectedRoute
            notForAuth
            path="/reset-password"
            children={<ResetPasswordPage />}
          />
          <Route path="/feed/:id" children={<OrderMoreInfoPage />} />
          <ProtectedRoute
            path="/profile/orders/:id"
            children={<OrderMoreInfoPage />}
          />
          <Route path="/feed" children={<FeedPage />} />
          <ProtectedRoute path="/profile/orders" children={<ProfilePage />} />
          <ProtectedRoute path="/profile" children={<ProfilePage />} />
          <Route path="/" children={<ConstructorPage />} />
          <Route children={<NotFound404 />} />
        </Switch>
        {background && (
          <>
            <Route path="/ingredients/:id">
              <Modal onClose={onClose}>
                <IngredientDetails />
              </Modal>
            </Route>

            <Route path="/feed/:id">
              <Modal onClose={onClose}>
                <OrderMoreInfo />
              </Modal>
            </Route>

            <Route path="/profile/orders/:id">
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
