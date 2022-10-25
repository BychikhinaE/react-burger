import React, { useEffect, useRef, useMemo } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./all-current-orders.module.css";

import { useDispatch, useSelector } from "react-redux";
import OrderPreview  from '../order-preview/order-preview'

//ОСНОВНОЙ КОМПОНЕНТ, которй отрисует меню
function BurgerIngredients() {
  const dispatch = useDispatch();



  return (

      <section className={styles.gridArea}>
        <ul className={`${styles.scroll} custom-scroll`} id="scroll">
         <OrderPreview />

        </ul>
      </section>

  );
};

export default React.memo(BurgerIngredients);
