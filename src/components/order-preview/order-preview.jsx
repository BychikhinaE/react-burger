import styles from "./order-preview.module.css";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import {  useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatHumanDate } from "../../utils/utils";

function OrderPreview({ order, isStatus }) {
  const location = useLocation();
  const AllIngredients = useSelector((state) => state.menu.items);
  const { url } = useRouteMatch();

  const orderIngredients = AllIngredients.reduce((prevVal, item) => {
    order.ingredients.forEach((id) => {
      if (item._id === id) {
        prevVal.push({
          name: item.name,
          image: item.image,
          price: item.price,

          _id: item._id,
        });
      }
      return prevVal;
    });
    return prevVal;
  }, []);

  const total = orderIngredients.reduce((acc, item) => acc + item.price, 0);

  //Здесь меняем текст статуса и его цвет
  let status = "";
  let colorStatus = undefined;

  switch (order.status) {
    case "done":
      status = "Выполнен";
      colorStatus = styles.done;
      break;
    case "pending":
      status = "Готовится";
      colorStatus = styles.pending;
      break;
    case "created":
      status = "Создан";
      colorStatus = styles.created;
      break;
    default:
      status = "Отменен";
      colorStatus = styles.cancel;
      break;
  }

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
        {formatHumanDate(order)}
      </p>
      <h2 className={`${styles.header} text text_type_main-medium`}>
        {order.name}
      </h2>
      {isStatus && (
        <p
          className={`${styles.status} ${colorStatus} text text_type_main-default`}
        >
          {status}
        </p>
      )}
      <ul className={`${styles.images}`}>
        {orderIngredients.map(
          (item, index) =>
            index < 5 && (
              <li key={index} className={`${styles.imageBorder}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />
              </li>
            )
        )}

        {orderIngredients.length >= 5 &&
          orderIngredients.map(
            (item, index) =>
              index === 5 && (
                <li key={index} className={`${styles.imageBorder}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.image}
                  />
                  {orderIngredients.length > 5 && (
                    <p
                      className={`${styles.counter} text text_type_main-small`}
                    >
                      {`+${orderIngredients.length - 5}`}
                    </p>
                  )}
                </li>
              )
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
