import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OrderPreview from "../components/order-preview/order-preview";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
import styles from "./profile.module.css";
// Клик по заказу в «Истории заказов» переносит пользователя на экран /profile/orders/:id.
export default function ProfileОrderHistory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);
  const orders = useSelector((store) => store.wsOrders.orders);
  if (!orders) {
    return;
  }

  return (
    <ul className={`${styles.scroll} custom-scroll text`}>
      {orders.map((item, index) => (
        <li key={index}>
          <OrderPreview order={item} isStatus={true} />
        </li>
      ))}
    </ul>
  );
}
