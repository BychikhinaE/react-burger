import { useDispatch } from "../services/hooks/hooks";
import { useEffect } from "react";
import styles from "./page-info.module.css";
import OrderMoreInfo from "../components/order-more-info/order-more-info";
import {
  wsConnectionStartAll,
  wsConnectionStartUser,
  wsConnectionClosedAll,
  wsConnectionClosedUser,
} from "../services/actions/wsActions";
import { useRouteMatch } from "react-router-dom";

export function OrderMoreInfoPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    match.path === "/feed/:id"
      ? dispatch(wsConnectionStartAll())
      : dispatch(wsConnectionStartUser());

    return () => {
      match.path === "/feed/:id"
        ? dispatch(wsConnectionClosedAll())
        : dispatch(wsConnectionClosedUser());
    };
  }, [dispatch, match]);

  return (
    <section aria-label="OrderMoreInfoPage" className={`${styles.wrapper}  `}>
      <div className={`${styles.container} `}>
        <OrderMoreInfo />
      </div>
    </section>
  );
}
