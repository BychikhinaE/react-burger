import React, { useEffect, useRef, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-preview.module.css";
import { Link, useLocation, Redirect, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderPreview({ order, isStatus }) {
  const location = useLocation();
  const AllIngredients = useSelector((state) => state.menu.items);
  const { url } = useRouteMatch();

  const orderIngredients = AllIngredients.reduce((prevVal, item) => {
    if (order.ingredients.find((ingredient) => ingredient === item._id)) {
      return prevVal.concat(item);
    }

    return prevVal;
  }, []);

  const total = orderIngredients.reduce((acc, item) => acc + item.price, 0);

  moment.locale("ru");
  const orderDateMoment = moment().format("HH:mm[ i-GMT]Z");
  const fromNow = () => {
    const dif = moment().diff(order.createdAt, "days");
    return dif === 0
      ? "Сегодня"
      : dif === 1
      ? "Вчера"
      : dif > 1
      ? moment(order.createdAt).fromNow()
      : null;
  };
  const date = `${fromNow()}, ${orderDateMoment}`;

  return (
    <Link
      className={styles.item}
      to={{ pathname: `${url}/${order._id}`, state: { background: location } }}
    >
      <p className={`${styles.number} text text_type_digits-default`}>
        {`#${order.number}`}
      </p>
      <p
        className={`${styles.time} text text_type_main-default text_color_inactive`}
      >
        {date}
      </p>
      <h2 className={`${styles.header} text text_type_main-medium`}>
        {order.name}
      </h2>
      {isStatus && (
        <p className={`${styles.status} text text_type_main-default`}>
          {order.status}
        </p>
      )}
      <ul className={`${styles.images}`}>
        {orderIngredients.map((item, index) => (
          index < 6 && (
          <li key={index} className={`${styles.imageBorder}`}>
            <img src={item.image} alt={item.name} className={styles.image} />
          </li>)
        ))}
     {orderIngredients.length > 6 && (
            <li className={`${styles.counter} text text_type_main-small`}>
              {`+${orderIngredients.length - 6}`}
            </li>
          )}
      </ul>

      <div className={`${styles.total}`}>
        <p className={`${styles.price}text text_type_digits-default pr-1`}>
          {total}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </Link>
  );
}

export default OrderPreview;
