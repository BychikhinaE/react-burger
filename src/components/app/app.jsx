import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useDispatch } from "react-redux";
import { getItems } from "../../services/actions/menu";
import { getUser } from "../../services/actions/user.js";
import { ProtectedRoute } from "../protected-route/protected-route";
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
  useEffect(() => {
    dispatch(getItems());
    dispatch(getUser());
  }, []);

  return (
    <>
      <Router>
        <AppHeader />
        <main className={styles.main}>
          <Switch>
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
            <Route path="/order-list" children={<OrderListPage />} exact />
            <Route children={<NotFound404 />} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
