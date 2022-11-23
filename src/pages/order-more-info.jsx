import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./page-info.module.css";
import OrderMoreInfo from "../components/order-more-info/order-more-info";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
import { getCookie } from "../utils/utils";
import { useRouteMatch} from "react-router-dom";
import { useParams } from "react-router-dom";

export function OrderMoreInfoPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    if (match.path === "/feed/:id") {
      dispatch(
        wsConnectionStart({
          token: `/all`,
        })
      );
    } else {
      const accessToken = getCookie("accessToken");
      dispatch(
        wsConnectionStart({
          token: `?token=${accessToken}`,
        })
      );
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, match]);

  const orders = useSelector((state) => state.ws.orders);
  const { id } = useParams();

  if (!orders) {
    return;
  }

  const order = orders.find((item) => item._id === id);
  if (!order) {
    return;
  }

  return (
    <section aria-label="OrderMoreInfoPage" className={`${styles.wrapper}  `}>
      <div className={`${styles.container} `}>
        <OrderMoreInfo />
      </div>
    </section>
  );
}
