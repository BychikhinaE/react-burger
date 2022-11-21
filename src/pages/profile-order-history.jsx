import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OrderPreview from "../components/order-preview/order-preview";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
import styles from "./profile.module.css";
import { getCookie } from "../utils/utils";
import { Route } from "react-router-dom";
// Клик по заказу в «Истории заказов» переносит пользователя на экран /profile/orders/:id.
export default function ProfileОrderHistory() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const tok = getCookie("accessToken");
  //   console.log(tok)
  //   dispatch(wsConnectionStart({
  //     token: `?token=${tok}`,
  //   }));
  //   return () => {
  //     dispatch(wsConnectionClosed());
  //   };
  // }, []);
  // useEffect(() => {
  //   dispatch(
  //     wsConnectionStart({
  //       token: `/all`,
  //     })
  //   );
  //   return () => {
  //     dispatch(wsConnectionClosed());
  //   };
  // }, [dispatch]);
  const accessToken = getCookie("accessToken");
  useEffect(() => {
    // const accessToken = getCookie("accessToken");
    console.log(accessToken)
    dispatch(wsConnectionStart({
      token: `?token=${accessToken}`,
    }));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [accessToken, dispatch]);

  const orders = useSelector((state) => state.ws.orders);
  console.log(orders);
  if (!orders) {
    return;
  }

  return (
    <section className={styles.history}>
      <ul className={`${styles.scroll} custom-scroll text`}>
        {orders.map((item, index) => (
          <li key={index}>
            <OrderPreview order={item} isStatus={true} />
          </li>
        ))}
      </ul>
    </section>
  );
}
