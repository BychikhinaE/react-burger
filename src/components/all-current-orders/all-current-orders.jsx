import React, { useEffect, useRef, useMemo } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./all-current-orders.module.css";

import { useDispatch, useSelector } from "react-redux";
import OrderPreview  from '../order-preview/order-preview'

//ОСНОВНОЙ КОМПОНЕНТ, которй отрисует меню
function AllCurrentOrders() {
  const orders = useSelector((state) => state.ws.orders);

  if (!orders) {
    return
  }

  return (
      <section className={styles.gridArea}>
        <ul className={`${styles.scroll} custom-scroll`} id="scroll">
        {orders.map((item) => (
          <li key={item._id}>
            <OrderPreview item={item} />
          </li>
        ))}
        </ul>
      </section>

  );
};

export default AllCurrentOrders;
