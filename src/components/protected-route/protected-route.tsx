import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "../../services/hooks/hooks";
import { useLocation } from "react-router-dom";
import { FC } from "react";
import { TLocation } from "../../services/types/data";

type TProtectedRouteProps = {
  notForAuth?: boolean;
} & RouteProps;

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  notForAuth,
  ...rest
}) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useLocation<TLocation>();

  return (
    <Route
      {...rest}
      exact
      render={() =>
        isAuth && notForAuth ? (
          <Redirect to={location?.state?.from || "/"} />
        ) : isAuth && !notForAuth ? (
          children
        ) : !isAuth && notForAuth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
