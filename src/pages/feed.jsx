import { useDispatch, useSelector } from "react-redux";
import AllCurrentOrders from "../components/all-current-orders/all-current-orders";
import Statistics from "../components/statistics/statistics";
import styles from "./feed.module.css";
// import { Switch, Route, useHistory, useLocation } from "react-router-dom";
// import Modal from "../modal/modal.jsx";
// import OrderMoreInfo from "../components/order-more-info/order-more-info";
import { useEffect } from "react";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";

export function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

  return (
    <section
      aria-label="feed-page"
      className={`${styles.grid} pb-10 container pr-10 pl-10`}
    >
      <h1
        className={`text text_type_main-large pt-10 pb-5 ${styles.gridTitle}`}
      >
        Лента заказов
      </h1>
      <AllCurrentOrders />
      <Statistics />
    </section>
  );
}
