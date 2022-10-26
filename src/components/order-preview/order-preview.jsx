import React, { useEffect, useRef, useMemo } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./all-current-orders.module.css";
import { Link, useLocation, Redirect, useRouteMatch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderPreview(order, isStatus) {
  const location = useLocation();
  const itemsMenu = useSelector(
    (state) => state.menu.items
  );
  const { url }  = useRouteMatch();

// const orderIdCount = order.ingredients.reduce((prevVal, item) => {
// if(!prevVal[item]){
//   prevVal[item] =1} else {prevVal[item]++}
//   return prevVal;
// }, []);

const orderIngredients = order.ingredients.filter((item)=>{
  return item === itemsMenu._id
})
const total = orderIngredients.reduce(
  (acc, item) => acc + item.price,
 0
);

  return (

      <Link className={styles.item}
       to={{ pathname: `${url}/${order._id}`, state: { background: location } }}>
      <p className={`${styles.number} text text_type_digits-default`}>
        {`#${order.number}`}
      </p>
      <p className={`${styles.time} text text_type_main-default`}>{order.timestamp}</p>
      <h2 className={`${styles.header} text text_type_main-medium`}>{order.name}</h2>
      {isStatus && <p
        className={`${styles.status} text text_type_main-default`}
      >
        {order.status}
      </p>}
      <ul className={`${styles.images}`}>
      {orderIngredients.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.name}className={styles.image}/>
              </li>
            ))}
      </ul>
      {/* {orderIngredients.length > 6 && (
            <p className={`${styles.counter} text text_type_main-small`}>
              {`+${orderIngredients.length - 6}`}
            </p>
          )} */}
      <p className={`${styles.total}`}>{total}</p>
      <CurrencyIcon type="primary" />
      </Link>

  );
};

export default OrderPreview;
