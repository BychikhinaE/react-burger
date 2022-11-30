import { useDispatch, useSelector } from "react-redux";
import AllCurrentOrders from "../components/all-current-orders/all-current-orders";
import Statistics from "../components/statistics/statistics";
import styles from "./feed.module.css";
import React, { useEffect } from "react";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
import { getUser } from "../services/actions/user";

function FeedPage() {
  const dispatch = useDispatch();
  const wsPayload = useSelector((state) => state.ws.payload);

  //wsPayload содержит сообщение от вебсокета, когда он закрывает соединение
  console.log(wsPayload);
  useEffect(() => {
    if (wsPayload?.isTrusted || wsPayload === undefined) {
      dispatch(
        wsConnectionStart({
          token: `/all`,
        })
      );
    }
    dispatch(getUser());
    return () => {
      dispatch(wsConnectionClosed());
      console.log(wsPayload, "after close");
    };
  }, [wsPayload]);

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
