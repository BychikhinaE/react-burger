import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export function ProtectedRoute({ children, notForAuth, ...rest }) {
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useLocation();

  return (
    <Route
      {...rest}
      exact
      render={() => isAuth && notForAuth ?
        (<Redirect to={location?.state?.from || "/"} />) :
        isAuth && !notForAuth ?
        (children) :
        !isAuth && notForAuth ?
        (children) :
         (<Redirect to={{ pathname: "/login", state: { from: location } }} />)}
    />
  );
}
