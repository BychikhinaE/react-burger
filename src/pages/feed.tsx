import { useDispatch } from "../services/hooks/hooks";
import AllCurrentOrders from "../components/all-current-orders/all-current-orders";
import Statistics from "../components/statistics/statistics";
import styles from "./feed.module.css";
import React, { useEffect } from "react";
import {
  wsConnectionStartAll,
  wsConnectionClosedAll,
} from "../services/actions/wsActions";

function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartAll());
    return () => {
      dispatch(wsConnectionClosedAll());
    };
  }, []);

  return (
    <section
      aria-label="feed-page"
      className={`${styles.grid} container pr-10 pl-10`}
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

export default FeedPage;
